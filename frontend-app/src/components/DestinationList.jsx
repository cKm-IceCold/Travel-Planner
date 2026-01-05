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
    <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          id={destination.id}
          city={destination.city}
          country={destination.country}
          image={destination.image}
          price={destination.price}
          rating={destination.rating}
          label={destination.label}
        />

      ))}
    </div>
  );
};

export default DestinationList;

