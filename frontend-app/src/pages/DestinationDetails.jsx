import { useParams, Link } from "react-router-dom";
import destinations from "../components/data/destinations";
import { useItinerary } from "../context/ItineraryContext";

const DestinationDetails = () => {
  const { id } = useParams();
  const { addToItinerary, isInItinerary } = useItinerary();

  const destination = destinations.find(
    (d) => d.id === Number(id)
  );

  if (!destination) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-xl text-slate-500">Destination not found.</p>
      </div>
    );
  }

  const isAdded = isInItinerary(destination.id);

  return (
    <div>
      {/* 1. HERO HEADER */}
      <div className="relative h-[60vh] w-full">
        <img
          src={destination.image}
          alt={destination.city}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-sm font-bold tracking-[0.2em] uppercase mb-4 block text-blue-200">{destination.country}</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4">{destination.city}</h1>
            <div className="flex gap-2 justify-center">
              {destination.label && (
                <span className="px-4 py-1 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-sm">{destination.label}</span>
              )}
              <span className="px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-300 font-bold border border-yellow-400/50">★ {destination.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DETAILS CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Left Column: Description & Attractions */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Explore
            </Link>
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">About {destination.city}</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Experience the magic of {destination.city}. Known for its stunning architecture and vibrant culture,
              this destination offers an unforgettable journey for every traveler.
              {/* Mock description since we didn't add one to data yet */}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Top Attractions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.attractions.map((a, i) => (
                <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-slate-700 font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking/Action Card */}
        <div className="relative">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Starting from</p>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-bold text-slate-900">{destination.price}</span>
              <span className="text-slate-400 mb-1">/ person</span>
            </div>

            <button
              onClick={() => addToItinerary(destination)}
              disabled={isAdded}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform active:scale-95 ${isAdded
                  ? "bg-green-100 text-green-700 cursor-default border border-green-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200"
                }`}
            >
              {isAdded ? "✓ Added to Itinerary" : "Add to Itinerary"}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              Free cancellation up to 24h before trip.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DestinationDetails;
