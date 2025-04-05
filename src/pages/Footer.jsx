import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-900 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="NutriWise Logo" className="h-24 rounded-2xl" />
            </Link>
            <p className="mt-4 text-gray-700">
              Your AI-powered diet companion, guiding you toward a healthier, balanced lifestyle with personalized meal planning and nutrition support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-green-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-700 hover:text-green-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h2 className="text-xl font-semibold">Stay Connected</h2>
            <p className="mt-4 text-gray-700">
              Follow us for healthy recipes, fitness tips, and exclusive wellness content.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-700 hover:text-green-600 text-lg">
                <i className="ri-facebook-circle-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-green-800 text-lg">
                <i className="ri-twitter-x-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-500 text-lg">
                <i className="ri-instagram-line text-2xl"></i>
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-500 text-lg">
                <i className="ri-linkedin-box-fill text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-700">
            “Eat smart. Live well. Let AI guide your nutrition.” 🥗🤖
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} NutriWise. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
