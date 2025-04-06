import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 pt-20 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white m-4 py-16 px-6 text-center shadow-lg rounded-xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-sm">
          About <span className="text-yellow-200">Our AI Diet Planner</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Transform your health journey with{" "}
          <span className="font-semibold text-yellow-100">
            intelligent nutrition planning
          </span>
          . Get personalized meal plans, smart calorie tracking, and AI-driven
          insights — all tailored just for you.
        </p>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-green-100 italic">
          At <span className="font-bold text-white">NutriWise</span>, we believe
          nutrition should be smart and accessible. That’s why we’re your
          AI-powered diet partner—here to guide you toward healthier eating,
          personalized for your lifestyle.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto p-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Why Choose Our Diet Planner?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1*/}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform hover:shadow-lg hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold mb-2">BMI-Based Diet Plans</h3>
            <p className="text-gray-600">
              Your BMI is a key indicator of your health. NutriWise crafts
              optimal diets based on your BMI to help you lose, gain, or
              maintain weight safely.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold mb-2">
              Personalized Meal Plans
            </h3>
            <p className="text-gray-600">
              Get diet plans based on your body type, goals, allergies, and
              lifestyle.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform hover:shadow-lg hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold mb-2">
              Category-Based Nutrition
            </h3>
            <p className="text-gray-600">
              Choose from Vegetarian, Non-Vegetarian, Vegan, Keto, and more. Our
              AI designs balanced plans around your preferences.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold mb-2">
              AI Nutrition Insights
            </h3>
            <p className="text-gray-600">
              Our AI analyzes your food intake and gives smart feedback for
              optimal health improvement.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Our passionate team of nutritionists, AI engineers, and fitness
            enthusiasts are committed to helping you lead a healthier life. We
            believe in empowering individuals with the tools to eat smarter and
            live better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
