import React, { createContext, useState, useEffect, useContext } from "react";

// Create a theme context
export const ThemeContext = createContext();

// Create a theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    // You could also add a class to the document body for global CSS if needed
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Provide the theme context to all child components
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = () => useContext(ThemeContext);
