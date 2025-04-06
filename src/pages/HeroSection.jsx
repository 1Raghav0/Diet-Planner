import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const HeroSection = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleStartPlanning = () => {
    if (user) {
      navigate("/dashboard"); // Redirect to main dashboard
    } else {
      navigate("/login");
    }
  };

  const handleExploreFeatures = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/dietassistant");
    }
  };

  return (
    <div className="bg-green-50 p-20 min-h-screen flex items-center justify-center">
      <section className="py-20">
        <div className="container mx-auto text-center p-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Achieve Your Health Goals with Smart Diet Planning
          </h1>
          <p className="mt-2 text-green-600 text-xl font-semibold">
            NutriWise – Your AI-Powered Diet Partner
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Get personalized meal plans, track your nutrition, and stay on top of your fitness journey with our AI-powered diet planner.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleStartPlanning}
              className="w-full md:w-auto bg-green-600 text-white py-3 px-6 rounded-md text-lg font-medium cursor-pointer hover:bg-green-700"
            >
              <span className="md:hidden">Start</span>
              <span className="hidden md:inline">Start Your Plan</span>
            </button>
            <button
              onClick={handleExploreFeatures}
              className="w-full md:w-auto bg-white text-green-600 py-3 px-6 rounded-md cursor-pointer text-lg font-medium hover:bg-green-50 border border-green-600"
            >
              <span className="md:hidden">Explore</span>
              <span className="hidden   md:inline">Explore Features</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
