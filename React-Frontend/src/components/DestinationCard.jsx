


const DestinationCard = ({ city, country, attractions }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{city}</h2>
      <p className="text-gray-600">{country}</p>

      <ul className="mt-2 text-sm">
        {attractions.map((place, index) => (
          <li key={index}>• {place}</li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationCard;
