import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useEffect } from "react";
import AdSection2 from "../components/AdSection2";
import AdSection3 from "../components/AdSection3";
import { useBhajan } from "../context/BhajanContext";
import RelatedSongs from "../components/RelatedSongs";
import YoutubeVideo from "../components/YoutubeVideo";
import Loader from "../components/Loader";
import { FiArrowLeft } from "react-icons/fi"; // Back icon

function Bhajan() {
  const { id } = useParams(); // Get ID from URL
  const { data } = useBhajan();
  const navigate = useNavigate(); // ✅ Hook for navigation

  // Find the matching song based on ID
  const song = data.find((item) => item.id === id);

  useEffect(() => {
    console.log("Bhajan ID:", id);
  }, [id]);

  if (!song) {
    return <Loader />;
  }

  const { name, lyrics, singer, category, youtubeLink } = song;

  // Function to download lyrics with new line formatting
  const downloadLyrics = () => {
    if (!lyrics) {
      alert("Lyrics not available for download.");
      return;
    }

    // Replace commas with new lines
    const formattedLyrics = lyrics.split(",").map((line) => line.trim()).join("\n");

    const blob = new Blob([formattedLyrics], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 bg-green-100 min-h-screen overflow-x-hidden">
      {/* 🔹 Back to Home Button */}
      <button
        onClick={() => navigate("/")} // ✅ Navigates to home
        className="flex items-center gap-2 text-blue-600 hover:text-orange-600 font-semibold mb-4"
      >
        <FiArrowLeft size={20} />
        <span>होम पर वापस जाएं</span>
      </button>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-amber-800 mt-2 text-center font-bold">{name}</h1>
      <p className="text-sm sm:text-md text-center text-gray-700">{category}</p>

      {/* Ad Section */}
      <div className="my-4">
        <AdSection2 />
      </div>

      {/* Lyrics Section */}
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-900">Lyrics</h2>
        {lyrics ? lyrics.split(",").map((line, index) => (
          <p key={index} className="text-gray-800">{line.trim()}<br /></p>
        )) : "Lyrics not available"}
      </div>

      {/* Singer & Category */}
      <div className="text-center mt-5">
        <p className="font-semibold text-gray-800"> स्वर : {singer}</p>
        <p className="mb-5 text-gray-700"> श्रेणी : {category}</p>
      </div>

      {/* Second Ad Section */}
      <div className="my-4">
        <AdSection3 />
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={downloadLyrics}
          className="my-5 px-5 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-md"
        >
          डाउनलोड करें
        </button>
      </div>

      {/* YouTube Video Section */}
      {youtubeLink && (
        <div className="my-8 max-w-3xl mx-auto">
          <YoutubeVideo url={youtubeLink} name={name} />
        </div>
      )}

      {/* Related Bhajans */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900">🔗 मिलते-जुलते भजन...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
          {data
            .filter((item) => item.id !== song.id) // Filter by ID instead of name
            .slice(0, 6)
            .map((item, index) => (
              <RelatedSongs key={index} id={item.id} name={item.name} imageUrl={item.image} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Bhajan;
