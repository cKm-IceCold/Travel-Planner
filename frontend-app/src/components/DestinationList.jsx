import DestinationCard from "./DestinationCard";

const DestinationList = ({ destinations }) => {
  if (destinations.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No destinations found.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {destinations.map((destination) => (
       <DestinationCard
  key={destination.id}
  id={destination.id}
  city={destination.city}
  country={destination.country}
  attractions={destination.attractions}
/>

      ))}
    </div>
  );
};

export default DestinationList;

  