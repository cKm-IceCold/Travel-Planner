import { useParams, Link } from "react-router-dom";
import destinations from "../components/data/destinations";

const DestinationDetails = () => {
  const { id } = useParams();

  const destination = destinations.find(
    (d) => d.id === Number(id)
  );

  if (!destination) {
    return <p className="p-6">Destination not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">
        {destination.city}
      </h1>
      <p className="text-gray-600">{destination.country}</p>

      <h2 className="mt-6 font-semibold">Top Attractions</h2>
      <ul className="list-disc ml-6">
        {destination.attractions.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationDetails;
