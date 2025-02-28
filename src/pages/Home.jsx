import { useState } from "react";
import { useBhajan } from "../context/BhajanContext";
import Sidebar from "../components/Sidebar"; // ✅ Import Sidebar

import Box from "../components/Box";
import Loader from "../components/Loader";
import AdSection1 from "../components/AdSection1";



function Home() {
  const { data, searchQuery } = useBhajan();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!data) return <Loader />; // ✅ Handles undefined data safely

  console.log("Data in Home:", data);

  // ✅ Apply Search Filtering
  let filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Apply Category Filtering
  if (selectedCategory) {
    filteredData = filteredData.filter((item) => item.category === selectedCategory);
  }

  // Pagination logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("Paginated Data:", paginatedData);

  return (
    <div className="bg-green-100 p-4 flex min-h-screen">
      {/* ✅ Sidebar for Category Selection */}
      <Sidebar setSelectedCategory={setSelectedCategory} /> {/* ✅ Passed as prop */}

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-orange-800 text-center mb-4">
          {selectedCategory ? `श्रेणी: ${selectedCategory}` : "सभी भजन"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4">
          <div className="flex flex-wrap gap-7 justify-center">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <Box 
                  key={index} 
                  id={item.id}  
                  name={item.name} 
                  imageUrl={item.image} 
                  category={item.category}  
                  likes={item.likes}
                /> 
              ))
            ) : (
              <p className="text-center text-gray-600">⚠ कोई भजन नहीं मिला</p>
            )}
          </div>

          {/* Ad Section (Desktop) */}
          <aside className="lg:block hidden">
            <AdSection />
          </aside>
        </div>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              ⬅️ Previous
            </button>

            <span className="font-semibold text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next ➡️
            </button>
          </div>
        )}

        {/* Ad Section (Mobile) */}
        <aside className="lg:hidden mt-6">
         <AdSection1/>
        </aside>
      </div>
    </div>
  );
}

export default Home;
