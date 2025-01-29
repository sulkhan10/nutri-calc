import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [bmi, setBmi] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [error, setError] = useState(""); // Error message state

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedGender = localStorage.getItem("gender");
    const savedAge = localStorage.getItem("age");
    const savedWeight = localStorage.getItem("weight");
    const savedHeight = localStorage.getItem("height");
    const savedActivityLevel = localStorage.getItem("activityLevel");
    const savedBmi = localStorage.getItem("bmi");
    const savedTdee = localStorage.getItem("tdee");

    if (savedGender) setGender(savedGender);
    if (savedAge) setAge(savedAge);
    if (savedWeight) setWeight(savedWeight);
    if (savedHeight) setHeight(savedHeight);
    if (savedActivityLevel) setActivityLevel(Number(savedActivityLevel));
    if (savedBmi) setBmi(savedBmi);
    if (savedTdee) setTdee(savedTdee);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gender", gender);
    localStorage.setItem("age", age);
    localStorage.setItem("weight", weight);
    localStorage.setItem("height", height);
    localStorage.setItem("activityLevel", activityLevel);
    if (bmi !== null) localStorage.setItem("bmi", bmi);
    if (tdee !== null) localStorage.setItem("tdee", tdee);
  }, [gender, age, weight, height, activityLevel, bmi, tdee]);

  const calculateBmiAndTdee = () => {
    // Reset error message
    setError("");

    // Check if all fields are filled
    if (!age || !weight || !height || !activityLevel) {
      setError("Please fill out all fields!"); // Set error message
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

    // Save calculated values to localStorage
    localStorage.setItem("bmi", bmiCalculated);
    localStorage.setItem("tdee", totalCaloriesFixed);
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

    // Clear localStorage
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("weight");
    localStorage.removeItem("height");
    localStorage.removeItem("activityLevel");
    localStorage.removeItem("bmi");
    localStorage.removeItem("tdee");
  };

  return (
    <div className="container bg-[#E8F5E9] min-h-screen mx-auto p-6 max-w-sm text-xs">
      <h1 className="text-3xl font-semibold text-center mb-6">BMI & TDEE Calculator</h1>
      
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

      {/* Reset Button */}
    </div>
  );
};

export default Calculator;
