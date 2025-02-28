import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const BhajanContext = createContext();

// Provider Component
export const BhajanProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  useEffect(() => {
    fetch("https://backend-eight-ruddy-59.vercel.app/api/songs")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <BhajanContext.Provider value={{ data, searchQuery, setSearchQuery }}>
      {children}
    </BhajanContext.Provider>
  );
};

// Custom Hook to use Bhajan Context
export const useBhajan = () => {
  return useContext(BhajanContext);
};
