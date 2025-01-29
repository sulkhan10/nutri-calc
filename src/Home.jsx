import React, { useEffect, useState } from "react";
import initSqlJs from "sql.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { XCircleIcon } from '@heroicons/react/24/solid'

const Home = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default items per page
  const [selectedFood, setSelectedFood] = useState(null); // Store selected food item
  const [weight, setWeight] = useState(""); // Store weight input
  const [calorieList, setCalorieList] = useState([]); // Store list of added items and their nutrients
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [tdee, setTdee] = useState(null);

  // Fetch TDEE from localStorage when the component loads
  useEffect(() => {
    const savedTdee = localStorage.getItem("tdee");
    const savedBmi = localStorage.getItem("bmi");
    if (!savedBmi || isNaN(savedBmi) || savedBmi < 0) {
      Swal.fire({
        title: "Please Input Your Data First",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Input Data",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Tdee");
        }
      });
    } else {
      if (savedTdee && !isNaN(savedTdee) && savedTdee > 0) {
        setTdee(savedTdee);
      }
    }
  }, []);

  useEffect(() => {
    const loadDatabase = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      const response = await fetch("/food_database.db"); // Adjust the path as needed
      const data = await response.arrayBuffer();
      const db = new SQL.Database(new Uint8Array(data));

      // Fetch total rows for pagination
      fetchTotalRows(db);
      fetchData(db);
      db.close();
    };

    loadDatabase();
  }, [currentPage, searchTerm, rowsPerPage]);

  const fetchTotalRows = (db) => {
    const countQuery = searchTerm
      ? `SELECT COUNT(*) as count FROM food WHERE nama_bahan LIKE '%${searchTerm}%'`
      : `SELECT COUNT(*) as count FROM food`;

    const totalResult = db.exec(countQuery);
    const totalRows = totalResult[0].values[0][0];
    setTotalPages(Math.ceil(totalRows / rowsPerPage));
  };

  const fetchData = (db) => {
    const offset = (currentPage - 1) * rowsPerPage;
    const query = searchTerm
      ? `SELECT * FROM food WHERE nama_bahan LIKE '%${searchTerm}%' LIMIT ${rowsPerPage} OFFSET ${offset}`
      : `SELECT * FROM food LIMIT ${rowsPerPage} OFFSET ${offset}`;

    const result = db.exec(query);
    if (result.length > 0) {
      const rows = result[0].values;
      setFoodData(rows);
    } else {
      setFoodData([]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setWeight(""); // Reset weight input
    setSelectedFood(null); // Reset selected food
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const addCaloriesToList = () => {
    if (selectedFood && weight) {
      const caloriesPer100g = selectedFood[3]; // Energi (Calories)
      const proteinPer100g = selectedFood[4]; // Protein
      const fatPer100g = selectedFood[5]; // Lemak (Fat)
      const carbsPer100g = selectedFood[6]; // Karbohidrat (Carbohydrates)

      // Calculate total for each nutrient based on the weight
      const totalCalories = (caloriesPer100g / 100) * weight;
      const totalProtein = (proteinPer100g / 100) * weight;
      const totalFat = (fatPer100g / 100) * weight;
      const totalCarbs = (carbsPer100g / 100) * weight;

      // Add to calorie list
      setCalorieList([
        ...calorieList,
        {
          food: selectedFood[2], // Nama Bahan (Food Name)
          weight,
          calories: totalCalories,
          protein: totalProtein,
          fat: totalFat,
          carbs: totalCarbs,
          editableWeight: weight, // Add editable weight
        },
      ]);
      closeModal(); // Close modal after adding
    }
  };

  const handleEditableWeightChange = (index, newWeight) => {
    if (!newWeight) return;
    const updatedList = calorieList.map((item, i) =>
      i === index
        ? {
            ...item,
            editableWeight: newWeight,
            calories: (item.calories / item.editableWeight) * newWeight, // Recalculate calories
            protein: (item.protein / item.editableWeight) * newWeight,
            fat: (item.fat / item.editableWeight) * newWeight,
            carbs: (item.carbs / item.editableWeight) * newWeight,
          }
        : item
    );
    setCalorieList(updatedList);
  };

  const deleteItemFromList = (index) => {
    const updatedList = calorieList.filter((_, i) => i !== index);
    setCalorieList(updatedList);
  };

  const totalCalories = calorieList.reduce(
    (sum, item) => sum + item.calories,
    0
  );
  const totalProtein = calorieList.reduce((sum, item) => sum + item.protein, 0);
  const totalFat = calorieList.reduce((sum, item) => sum + item.fat, 0);
  const totalCarbs = calorieList.reduce((sum, item) => sum + item.carbs, 0);

  return (
    <div className=" bg-[#E8F5E9] px-1 w-full min-h-screen pt-16 max-w-sm ">
      {/* <h1 className="text-xs font-semibold text-center w-full my-1 ">
        Food List
      </h1> */}



<div className="my-4 relative flex items-center">
  <input
    type="text"
    placeholder="Search food..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page on search
    }}
    className="p-2 border rounded-md w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] transition duration-200 pr-10" // Add padding to the right for the icon
  />
  {searchTerm && ( // Only show the icon if there is a search term
    <button
      onClick={() => {
        setSearchTerm("");
      }}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1B5E20] text-white p-0 rounded-full hover:bg-[#2E7D32] transition duration-200"
      aria-label="Clear search"
    >
      <XCircleIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  )}
</div>

      <table className=" w-full mb-6 bg-[#A5D6A7] text-xs px-2 ">
        <thead className="bg-[#A5D6A7] w-full ">
          <tr className="w-full">
            {/* <th className="px-4 py-2 text-left">Kode</th> */}
            <th className="px-1 py-2 w-1/6 text-center">Nama Bahan</th>
            <th className="px-1 py-2 w-1/6">Energi</th>
            <th className="px-1 py-2 w-1/6">Protein</th>
            <th className="px-1 py-2 w-1/6">Lemak</th>
            <th className="px-1 py-2 w-1/6">Karbohidrat</th>
            <th className="px-1 py-2 w-1/6"></th>
          </tr>
        </thead>
        <tbody className="bg-[#A5D6A7] w-full">
          {foodData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100 w-full">
              {/* <td className="px-1 py-2">{row[1]}</td> */}
              <td className="px-1 py-2 w-1/6 text-center">{row[2]}</td>
              <td className="px-1 py-2 w-1/6 text-center">{row[3]} Kal</td>
              <td className="px-1 py-2 w-1/6 text-center">{row[4]} g</td>
              <td className="px-1 py-2 w-1/6 text-center">{row[5]} g</td>
              <td className="px-1 py-2 w-1/6 text-center">{row[6]} g</td>

              <td className="px-1 py-2">
                <button
                  onClick={() => openModal(row)}
                  className="bg-[#1B5E20] text-white px-1 py-2 rounded hover:bg-[#2E7D32]"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Pagination */}
       <div className="mt-1 mb-4 flex justify-center space-x-1 m">
       {Array.from({ length: totalPages }, (_, i) => {
  const page = i + 1;

  // Logic to show only a few pages with "..." for large page numbers
  if (
    page === 1 || // Always show the first page
    page === totalPages || // Always show the last page
    (page >= currentPage - 1 && page <= currentPage + 1) // Show pages around the current page
  ) {
    return (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-2 aspect-square border text-xs border-[#2E7D32] rounded-md ${
          currentPage === page ? "bg-[#2E7D32] text-white" : "bg-gray-100"
        }`}
      >
        {page}
      </button>
    );
  } else if (
    (page === currentPage - 2 && currentPage > 3) || // Add "..." before the current page
    (page === currentPage + 2 && currentPage < totalPages - 2) // Add "..." after the current page
  ) {
    return (
      <span key={page} className="px-2 text-gray-500">
        ...
      </span>
    );
  }

  return null; // Hide other pages
})}
        <div className="flex items-center px-2 py-1 bg-[#F1F8E9] text-xs">
          <label className="mr-1">Per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when items per page changes
            }}
            className="p-1 border rounded-md"
          >
            {/* <option value={1}>1</option> */}
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Modal for weight input */}
      {modalOpen && (
        <div className="fixed inset-0   bg-opacity-80 flex justify-center items-center">
          <div className="absolute bg-black opacity-80 w-full h-full z-1"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm  z-2 ">
            <h2 className="text-md mb-4">Enter Weight for {selectedFood[2]}</h2>
            <input
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder="Enter weight in grams"
              className="p-2 border text-xs rounded-md mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={addCaloriesToList}
                className="bg-[#2E7D32] text-white text-md px-2 py-1 rounded hover:bg-green-600"
              >
                Add to List
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white text-md px-2 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display added items and their calories */}
      {calorieList.length > 0 && (
        <div className="mt-4 mb-8">
          <h3 className="text-md mb-2 mx-4 font-semibold">Added Items:</h3>
          <ul className="space-y-2">
            {calorieList.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm text-xs"
              >
                <div>
                  {item.food} 
                  <input
                    type="number"
                    required
                    min={1}
                    value={item.editableWeight}
                    onChange={(e) =>
                      handleEditableWeightChange(index, e.target.value)
                    }
                    className="w-16 mb-1 mx-2 px-2 border rounded"
                  />
                  grams
                  <div className="text-[10px]">Calories: {item.calories.toFixed(2)} Kal</div>
                  <div className="text-[10px]">Protein: {item.protein.toFixed(2)} g</div>
                  <div className="text-[10px]">Fat: {item.fat.toFixed(2)} g</div>
                  <div className="text-[10px]">Carbs:{" "}
                  {item.carbs.toFixed(2)} g</div>
                </div>
                <button
                  onClick={() => deleteItemFromList(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

      {/* Total Calories */}
<div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
  <h2 className="text-lg font-bold text-gray-800 mb-2">Nutrition Summary</h2>

  {/* Total Calories */}
  <div className="mt-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-gray-700">Total Calories:</span>
      <span className="text-xs font-semibold text-gray-900">{totalCalories.toFixed(2)} Kal</span>
    </div>
    {/* Progress Bar for Calories */}
    <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
      <div
        className={`h-2 rounded-full ${
          totalCalories > tdee ? "bg-red-500" : "bg-green-500"
        }`}
        style={{ width: `${Math.min((totalCalories / tdee) * 100, 100)}%` }}
      ></div>
    </div>
  </div>

  {/* Total Protein */}
  <div className="mt-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-gray-700">Total Protein:</span>
      <span className="text-xs font-semibold text-gray-900">{totalProtein.toFixed(2)} g</span>
    </div>
    {/* Progress Bar for Protein */}
    {/* <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
      <div
        className="h-2 rounded-full bg-blue-500"
        style={{ width: `${Math.min((totalProtein / 100) * 100, 100)}%` }}
      ></div>
    </div> */}
  </div>

  {/* Total Fat */}
  <div className="mt-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-gray-700">Total Fat:</span>
      <span className="text-xs font-semibold text-gray-900">{totalFat.toFixed(2)} g</span>
    </div>
    {/* Progress Bar for Fat */}
    {/* <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
      <div
        className="h-2 rounded-full bg-yellow-500"
        style={{ width: `${Math.min((totalFat / 100) * 100, 100)}%` }}
      ></div>
    </div> */}
  </div>

  {/* Total Carbs */}
  <div className="mt-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-gray-700">Total Carbs:</span>
      <span className="text-xs font-semibold text-gray-900">{totalCarbs.toFixed(2)} g</span>
    </div>
    {/* Progress Bar for Carbs */}
    {/* <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
      <div
        className="h-2 rounded-full bg-purple-500"
        style={{ width: `${Math.min((totalCarbs / 100) * 100, 100)}%` }}
      ></div>
    </div> */}
  </div>

  {/* TDEE and Percentage */}
  {tdee !== null && (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-700">TDEE:</span>
        <span className="text-xs font-semibold text-gray-900">{tdee} Kal</span>
      </div>
      <div className="mt-2 text-xs font-semibold text-gray-700">
        Percentage of TDEE:{" "}
        <span
          className={`${
            totalCalories > tdee ? "text-red-500" : "text-green-500"
          }`}
        >
          {((totalCalories / tdee) * 100).toFixed(2)}%
        </span>
      </div>
      <div
        className={`mt-1 text-xs ${
          totalCalories > tdee ? "text-red-500" : "text-green-500"
        }`}
      >
        {totalCalories > tdee
          ? "You have exceeded your daily calorie intake."
          : "You are within your daily calorie intake."}
      </div>
    </div>
  )}
</div>
        </div>
      )}

     
    </div>
  );
};

export default Home;
