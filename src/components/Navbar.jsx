import "remixicon/fonts/remixicon.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useAuth } from "../context/UseAuth";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();

        const updatedUser = {
          name: auth.currentUser.displayName || "User",
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
        };
        setUser(updatedUser);
        login(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        logout();
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [isLoggedIn, login, logout]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="text-white bg-gradient-to-r from-emerald-600 to-lime-500 p-4 shadow-md border-b border-green-200">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/">
          <img src="./logo.jpg" alt="Logo" className="h-14 mb-2 rounded-lg shadow-md" />
        </Link>

        {/* Center Links */}
        <div className="flex space-x-6 font-medium text-lg">
          <Link to="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link to="/features" className="hover:text-yellow-200 transition">Features</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="hover:text-yellow-200 transition">Dashboard</Link>
          )}
          <Link to="/bmi" className="hover:text-yellow-200 transition">BMI Calculator</Link>
          <Link to="/contact" className="hover:text-yellow-200 transition">Contact</Link>
        </div>

        {/* User Info / Auth */}
        <div>
          {isLoggedIn ? (
            <>
              <span
                onClick={() => setIsProfileVisible(true)}
                className="bg-amber-500 mr-4 px-4 py-2 text-white font-semibold rounded-lg cursor-pointer hover:bg-amber-600 transition"
              >
                <i className="ri-user-line mr-2"></i>{user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold shadow"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between">
        <div>
          <Link to="/">
            <img src="./logo.jpg" alt="Logo" className="h-14 rounded-lg" />
          </Link>
        </div>

        <button onClick={() => setIsSidebarOpen(true)} className="text-white focus:outline-none">
          <i className="ri-menu-3-fill text-3xl cursor-pointer hover:text-yellow-200 transition"></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className={`fixed inset-0 top-0 left-0 h-full w-64 pt-6 shadow-lg backdrop-blur-lg bg-opacity-30  border-opacity-20 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-700 hover:text-black">
            <i className="ri-close-large-line text-xl cursor-pointer"></i>
          </button>
        </div>

        <div className="flex flex-col items-start space-y-6 p-6 text-gray-700">
          <Link to="/" className="text-lg" onClick={() => setIsSidebarOpen(false)}>Home</Link>
          <Link to="/features" className="text-lg" onClick={() => setIsSidebarOpen(false)}>Features</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-lg" onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
          )}
          {/* <Link to="/bmi" className="hover:text-yellow-200 transition">BMI Calculator</Link> */}
          <Link to="/bmi" className="text-lg" onClick={() => setIsSidebarOpen(false)}>BMI Calculator</Link>
          <Link to="/contact" className="text-lg" onClick={() => setIsSidebarOpen(false)}>Contact</Link>

          <div>
            {isLoggedIn ? (
              <>
                <span
                  onClick={() => { setIsProfileVisible(true); setIsSidebarOpen(false); }}
                  className="bg-amber-500 px-4 py-2 mr-4 text-white font-semibold rounded-lg cursor-pointer hover:bg-amber-600"
                >
                  <i className="ri-user-line mr-2"></i>{user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 mt-6 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold shadow" onClick={() => setIsSidebarOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileVisible && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h2 className="text-2xl font-bold text-center text-white mb-4">User Profile</h2>

            {user ? (
              <div className="text-white">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </div>

                <div className="space-y-3 bg-gray-700 p-4 rounded-lg text-sm sm:text-base">
                  <p>
                    <span className="text-gray-400">Name:</span>
                    <span className="ml-2 font-medium">{user.name}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Email:</span>
                    <span className="ml-2 font-medium">{user.email}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            <button onClick={() => setIsProfileVisible(false)} className="absolute top-4 right-6 text-gray-400 hover:text-white">
              <i className="ri-close-large-line cursor-pointer"></i>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;







