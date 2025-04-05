import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const calculateBMI = () => {
    if (!weight || !height || !age || isNaN(weight) || isNaN(height) || isNaN(age)) {
      setResult("Please enter valid weight, height, and age.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(1);
    setBmi(roundedBmi);

    if (bmiValue < 18.5) setResult("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 25) setResult("Fit");
    else if (bmiValue >= 25 && bmiValue < 30) setResult("Overweight");
    else setResult("Obesity");
  };

  const handleDietPlan = () => {
    // Navigate to /diet-planner with category query
    navigate(`/dietassistant?category=${result.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">BMI Calculator</h1>

        <div className="space-y-4">
          {/* Gender */}
          <div>
            <label className="block font-semibold text-gray-700">Gender:</label>
            <select
              className="w-full p-2 rounded-lg border focus:outline-none bg-green-100"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold text-gray-700">Age:</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border focus:outline-none bg-green-100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              min={1}
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block font-semibold text-gray-700">Weight (kg):</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border focus:outline-none bg-green-100"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block font-semibold text-gray-700">Height (cm):</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border focus:outline-none bg-green-100"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
            />
          </div>

          {/* Calculate Button */}
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={calculateBMI}
          >
            Calculate
          </button>

          {/* Result */}
          {bmi && (
            <div className="text-center mt-6">
              <p className="text-xl font-bold text-gray-800">Your BMI: {bmi}</p>
              <p
                className={`text-lg mt-1 font-semibold ${
                  result === "Fit"
                    ? "text-green-700"
                    : result === "Underweight"
                    ? "text-yellow-600"
                    : result === "Overweight"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                Status: {result}
              </p>

              {(result === "Underweight" || result === "Overweight" || result === "Obesity") && (
                <button
                  onClick={handleDietPlan}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Plan Your Diet
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
