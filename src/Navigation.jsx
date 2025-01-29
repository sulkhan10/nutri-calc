import { Link } from "react-router-dom";
import { ChartPieIcon, TableCellsIcon, UserIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const Navigation = () => {
  // State to store TDEE and BMI values
  const [tdee, setTdee] = useState(0);
  const [bmi, setBmi] = useState("");

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "tdee") {
        setTdee(Number(event.newValue).toFixed(0));
      }
      if (event.key === "bmi") {
        setBmi(Number(event.newValue).toFixed(1));
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="bg-[#4CAF50] w-screen h-16 px-4 absolute top-0 z-10 max-w-sm">
      <div className="py-4 flex justify-between items-center w-full">
        <Link to={"/"} className="text-xl font-bold text-gray-50 w-1/3">
          Nutri Calc
        </Link>
        <div className="flex space-x-2 text-sm">
          <div className="flex items-center space-x-1 justify-center">
            <span>
              <ChartPieIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
            </span>
            <span className="text-gray-50 text-xs">
              AKG {tdee} Kal
            </span>
          </div>
          <div className="flex items-center space-x-1 justify-center">
            <span>
              <UserIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
            </span>
            <span className="text-gray-50 text-xs">
              BMI {bmi}
            </span>
          </div>
          <Link className="flex items-center space-x-1 cursor-pointer" to={"/tdee"}>
            <span>
              <TableCellsIcon className="h-4 w-4" color="#1B5E20" aria-hidden="true" />
            </span>
            <span className="text-gray-50 text-xs">Data</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;