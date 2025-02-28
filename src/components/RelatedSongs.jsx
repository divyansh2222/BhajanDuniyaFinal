import { useNavigate } from "react-router-dom";

function RelatedSongs({ id, name, imageUrl }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to Bhajan:", id);
    navigate(`/bhajan/${id}`);
  };

  return (
    <div onClick={handleClick} className="w-60 bg-white shadow-md hover:shadow-lg overflow-hidden cursor-pointer">
      <img src={imageUrl} alt={name} className="w-full h-36 object-contain p-2 transition-transform transform hover:scale-105" />
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
}

export default RelatedSongs;
