import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import DestinationList from "../components/DestinationList";
import destinations from "../components/data/destinations";
import Hero from "../components/Hero";
import About from "../components/About";
import { searchDestinations } from "../services/amadeus";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAllLocal, setShowAllLocal] = useState(false);

  // Debounced Search for API
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setIsSearching(true);
        const results = await searchDestinations(searchTerm);
        setApiResults(results);
        setIsSearching(false);
      } else {
        setApiResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Determine what to display
  let displayDestinations = [];
  let title = "Popular Destinations";
  let subtitle = "Places that are trending right now.";

  if (searchTerm.length >= 3) {
    // 1. API Search Mode
    displayDestinations = apiResults;
    title = `Search Results for "${searchTerm}"`;
    subtitle = "Explore these locations found by Amadeus.";
  } else {
    // 2. Local Discovery Mode
    displayDestinations = showAllLocal ? destinations : destinations.slice(0, 6);
  }

  return (
    <>
      <Hero />

      {/* SEARCH BAR */}
      <div className="relative z-20 -mt-24 px-4 mb-20">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/40 flex items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all shadow-lg ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="pb-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-slate-800 mb-2">{title}</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-4">{subtitle}</p>
        </div>

        {isSearching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-slate-500">Searching global database...</p>
          </div>
        ) : (
          <>
            <DestinationList destinations={displayDestinations} />

            {/* SEE MORE BUTTON (Only in Local Mode & if not already showing all) */}
            {!searchTerm && !showAllLocal && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllLocal(true)}
                  className="bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 px-8 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  See More Destinations ({destinations.length - 6} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <About />
    </>
  );
};

export default Home;
