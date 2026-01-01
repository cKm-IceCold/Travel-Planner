import DestinationCard from "./DestinationCard";

const DestinationList = ({ destinations }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          city={destination.city}
          country={destination.country}
          attractions={destination.attractions}
        />
      ))}
    </div>
  );
};

export default DestinationList;

  