import { useState } from "react";
import { useBhajan } from "../context/BhajanContext";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for open/close

function Sidebar({ setSelectedCategory }) {
  const { data } = useBhajan();
  const [isOpen, setIsOpen] = useState(false); // ✅ Sidebar toggle state

  if (!data) return null; // ✅ Prevents errors if data is undefined

  // Extract unique categories using a Set
  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  return (
    <>
      {/* 🔹 Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-26 left-4 bg-orange-600 text-white p-2 rounded-md shadow-md z-50"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* 🔹 Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar (Mobile & Desktop) */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-[300px] bg-gray-100 p-4 border-r shadow-md z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* 🔹 Close Button (Only for Mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-lg font-semibold text-orange-700">नवीनतम भजन</h2>
        <ul className="mt-2 space-y-2">
          <li
            className="border-b pb-1 text-blue-800 hover:text-orange-600 cursor-pointer font-bold"
            onClick={() => {
              setSelectedCategory(null);
              setIsOpen(false); // ✅ Close sidebar after selection
            }}
          >
            सभी भजन
          </li>
          {uniqueCategories.map((category, index) => (
            <li
              key={index}
              className="border-b pb-1 text-blue-800 hover:text-orange-600 cursor-pointer"
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false); // ✅ Close sidebar after selection
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
