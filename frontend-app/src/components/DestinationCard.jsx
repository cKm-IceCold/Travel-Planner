import { Link } from "react-router-dom";

const DestinationCard = ({ id, city, country, attractions = [] }) => {
  return (
    <Link to={`/destinations/${id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
        <h2 className="text-xl font-semibold">{city}</h2>
        <p className="text-gray-600">{country}</p>
      </div>
    </Link>
  );
};

export default DestinationCard;
