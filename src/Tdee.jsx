import React from "react";
import { useAtom } from "jotai";
import {
  genderAtom,
  ageAtom,
  weightAtom,
  heightAtom,
  activityLevelAtom,
  bmiAtom,
  tdeeAtom,
  errorAtom,
  nutritionAtom,
} from "./atoms"; // Import the atoms
import {
  ChartPieIcon,
  TableCellsIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Dock from "./components/Dock/Dock";


const Calculator = () => {
  // Use atoms to manage state
  const [gender, setGender] = useAtom(genderAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [weight, setWeight] = useAtom(weightAtom);
  const [height, setHeight] = useAtom(heightAtom);
  const [activityLevel, setActivityLevel] = useAtom(activityLevelAtom);
  const [bmi, setBmi] = useAtom(bmiAtom);
  const [tdee, setTdee] = useAtom(tdeeAtom);
  const [nutrition, setNutrition] = useAtom(nutritionAtom);
  const [error, setError] = useAtom(errorAtom);

  const calculateBmiAndTdee = () => {
     // Reset error message  
     setError("");  

     // Check if all fields are filled  
     if (!age || !weight || !height || !activityLevel) {  
         setError("Please fill out all fields!");  
         return;  
     }  
 
     // Calculate BMI  
     const heightInMeters = height / 100;  
     const bmiCalculated = (weight / (heightInMeters * heightInMeters)).toFixed(2);  
     setBmi(bmiCalculated);  
 
     // Calculate BMR (Basal Metabolic Rate)  
     let bmr;  
     if (gender === "male") {  
         bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;  
     } else {  
         bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;  
     }  
 
     // Calculate TDEE (Total Daily Energy Expenditure)  
     const totalCalories = bmr * activityLevel;  
     const totalCaloriesFixed = totalCalories.toFixed(2);  
     setTdee(totalCaloriesFixed);  
 
     // Calculate Nutrition based on TDEE and weight  
     const isStrengthTraining = false 
     const baseProteinPerKg = 0.8; // grams of protein per kg  
     const proteinMultiplier = isStrengthTraining ? 1.6 : 1; // Adjust for strength training  
     const dailyProteinNeeds = weight * baseProteinPerKg * proteinMultiplier;  
 
     // Define the remaining calories after protein  
     const proteinCalories = dailyProteinNeeds * 4; // 4 calories per gram of protein  
     const remainingCalories = totalCalories - proteinCalories;  
 
     // Define percentage ranges for fat and carbohydrates  
     const fatPercentage = 0.20;      // 20%  
     const carbPercentage = 1 - fatPercentage; // Remaining percentage  
 
     // Calculate calories from fat and carbohydrates  
     const fatCalories = remainingCalories * fatPercentage;  
     const carbCalories = remainingCalories * carbPercentage;  
 
     // Convert calories to grams  
     const proteinGrams = dailyProteinNeeds.toFixed(2);  
     const fatGrams = (fatCalories / 9).toFixed(2);         // 9 calories per gram of fat  
     const carbGrams = (carbCalories / 4).toFixed(2);       // 4 calories per gram of carbohydrates  
 
     // Set nutrition values (assuming you have setNutrition function)  
     setNutrition({  
         protein: proteinGrams,  
         fat: fatGrams,  
         carbohydrates: carbGrams,  
     });  
  };

  
  const resetCalculator = () => {
    // Reset all fields to default
    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivityLevel(1.2);
    setBmi(null);
    setTdee(null);
    setError("");
    setNutrition(null)
  };
 const items = [
    {
      icon: <HomeIcon size={18} className="h-6 w-6" color="#1B5E20" />,
      label: "Home",
      link: "/",
      onClick: () => alert("Home!"),
    },
    {
      icon: <UserIcon size={18} className="h-6 w-6" color="#1B5E20" />,
      label: "Data User",
      link: "/tdee",

    },
    {
      icon: <TableCellsIcon size={18} className="h-6 w-6" color="#1B5E20" />,
      label: "Nutrition Table",
      link: "/nutritiontable",

    },
    // {
    //   icon: <ChartPieIcon size={18} className="h-6 w-6" color="#1B5E20" />,
    //   label: "Settings",
    //   link: "/",

    // },
  ];
  return (
    <div
    className={`container bg-[#E8F5E9] min-h-screen mx-auto p-6 max-w-sm text-xs ${
      bmi ? "pt-16" : "pt-28"
    }`}
  >
      <h1 className="text-xl font-semibold text-center my-2 text-[#1B5E20]">BMI & TDEE Calculator</h1>

      {/* Gender Selector */}
      <div className="mb-4">
        <label className="block mb-2">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Age, Weight, and Height Inputs */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/3">
          <label className="block mb-2">Age (in years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="w-1/3">
          <label className="block mb-2">Weight (in kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="w-1/3">
          <label className="block mb-2">Height (in cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Activity Level Selector */}
      <div className="mb-4">
        <label className="block mb-2">Activity Level</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(Number(e.target.value))}
          className="p-2 border rounded-md w-full"
        >
          <option value={1.2}>Sedentary (little to no exercise)</option>
          <option value={1.375}>Lightly active (light exercise 1-3 days/week)</option>
          <option value={1.55}>Moderately active (moderate exercise 3-5 days/week)</option>
          <option value={1.725}>Very active (hard exercise 6-7 days/week)</option>
          <option value={1.9}>Super active (very hard exercise & physical job)</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Calculate Button */}
      <button
        onClick={calculateBmiAndTdee}
        className="bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-3 rounded-lg mt-4 shadow-md hover:shadow-lg hover:from-green-800 hover:to-green-600 transition-all duration-300"
      >
        Calculate BMI & TDEE
      </button>

      {/* BMI and TDEE Display */}
      {bmi !== null && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Your BMI</h2>
          <p
            className={`text-2xl font-semibold ${
              bmi < 18.5
                ? "text-blue-500"
                : bmi >= 18.5 && bmi <= 24.9
                ? "text-green-500"
                : bmi >= 25 && bmi <= 29.9
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {bmi}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {bmi < 18.5
              ? "Underweight"
              : bmi >= 18.5 && bmi <= 24.9
              ? "Normal weight"
              : bmi >= 25 && bmi <= 29.9
              ? "Overweight"
              : "Obesity"}
          </p>
        </div>
      )}

      {tdee !== null && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Your TDEE</h2>
          <p className="text-2xl font-semibold text-green-500">{tdee} kcal</p>
          <p className="text-sm text-gray-600 mt-1">
            This is the number of calories you need to maintain your current weight.
          </p>
        </div>
      )}

      {/* Reset Button */}
      {tdee !== null && (
        <button
          onClick={resetCalculator}
          className="bg-gradient-to-r from-gray-500 to-gray-400 text-white px-6 py-3 rounded-lg mt-4 shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300"
        >
          Reset
        </button>
      )}
       <Dock
              className="fixed"
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
    </div>
  );
};

export default Calculator;