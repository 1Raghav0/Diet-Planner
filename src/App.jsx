import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import DietAssistant from "./components/DietAssistant";
import About from "./pages/About";
import Features  from "./pages/Features";
import Contact from "./pages/Contact";
import BMICalculator from "./pages/BMICalculator";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";


const App = () => {

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage  />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dietassistant" element={<DietAssistant />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
