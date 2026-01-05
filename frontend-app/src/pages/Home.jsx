import { useState } from "react";
import SearchBar from "../components/SearchBar";
import DestinationList from "../components/DestinationList";
import destinations from "../components/data/destinations";
import Hero from "../components/Hero";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((d) =>
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 1. HERO - Sets the stage */}
      <Hero />

      {/* 
         2. FLOATING SEARCH BAR 
         - Uses negative margin to pull it UP onto the Hero.
         - 'max-w-3xl' makes it wider and more commanding.
         - 'backdrop-blur-md' gives it that premium glass feel.
      */}
      <div className="relative z-20 -mt-24 px-4 mb-20">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/40 flex items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Search Icon/Button for flair */}
          <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all shadow-lg ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="pb-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-slate-800 mb-2">Popular Destinations</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-4">Places that are trending right now.</p>
        </div>

        <DestinationList destinations={filteredDestinations} />
      </div>
    </>
  );
};

export default Home;
