import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // Apply dark mode styles globally
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Multi-Timer App</h1>
        <nav className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/history")}
            className="hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            History
          </button>
        </nav>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
