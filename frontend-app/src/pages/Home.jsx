import { useState } from "react";
import SearchBar from "../components/SearchBar";
import DestinationList from "../components/DestinationList";
import destinations from "../components/data/destinations";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((d) =>
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Travel Planner</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <DestinationList destinations={filteredDestinations} />
    </div>
  );
};

export default Home;
