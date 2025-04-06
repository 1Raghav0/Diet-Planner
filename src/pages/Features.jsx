import React from "react";

const features = [

  {
    icon: "ri-leaf-line",
    title: "Category-Based Nutrition",
    description:
      "Choose from Vegetarian, Non-Vegetarian, Vegan, and Keto diets. We craft smart nutrition around your lifestyle.",
  },
  {
    icon: "ri-restaurant-line",
    title: "Smart Meal Planning",
    description:
      "AI generates personalized meal plans based on your goals, preferences, and dietary restrictions.",
  },
  {
    icon: "ri-scales-3-line",
    title: "BMI-Based Meal Recommendations",
    description:
      "Enter your BMI and let our AI suggest meals that help you lose, gain, or maintain weight effectively.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Health & Nutrition Tracking",
    description:
      "Keep tabs on your daily nutrient intake, calories, and macros for balanced health.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 AI Diet Coach",
    description:
      "Your personal AI coach answers questions, recommends snacks, and keeps you on track anytime.",
  },
];

const Features = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Key Features of <span className="text-green-600">NutriWise</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover how our AI-driven diet planner helps you build healthier habits and reach your wellness goals effortlessly.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center cursor-pointer transition-transform transform hover:scale-105 duration-300 hover:shadow-xl"
            >
              <i className={`${feature.icon} text-5xl text-green-600 mb-4`}></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
