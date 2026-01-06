import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinations from "../components/data/destinations";
import { useItinerary } from "../context/ItineraryContext";
import { useTrips } from "../context/TripContext";
import { getHotelsByDestination } from "../components/data/hotels";
import HotelCard from "../components/HotelCard";

const DestinationDetails = () => {
  const { id } = useParams();
  const { addToItinerary, isInItinerary } = useItinerary();
  const { trips, updateTripItem } = useTrips();
  const [showTripSelect, setShowTripSelect] = useState(false);
  const [selectedHotelForTrip, setSelectedHotelForTrip] = useState(null);

  const localDestination = destinations.find(
    (d) => String(d.id) === String(id)
  );

  const destination = localDestination || {
    id: id,
    city: "Unknown City",
    country: "World",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    price: "$TBD",
    rating: "N/A",
    attractions: ["City Center", "Local Landmarks"],
    label: "API Result"
  };

  if (!destination) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-xl text-slate-500">Destination not found.</p>
      </div>
    );
  }

  const isAdded = isInItinerary(destination.id);

  const handleAddToTrip = async (tripId, item, type = 'itinerary') => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const currentList = trip[type] || [];
    const newList = [...currentList, { ...item, type }]; // add type metadata

    try {
      await updateTripItem(tripId, type, newList);
      setShowTripSelect(false);
      setSelectedHotelForTrip(null);
      alert(`Added to ${trip.title}!`);
    } catch (error) {
      alert("Failed to add to trip");
    }
  };

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
              Discover the unique charm of {destination.city}. This destination is known for its breathtaking landscapes,
              rich cultural heritage, and unforgettable experiences that cater to every type of traveler.
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

            <div className="space-y-3">
              <button
                onClick={() => addToItinerary(destination)}
                disabled={isAdded}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md transform active:scale-95 ${isAdded
                  ? "bg-green-100 text-green-700 cursor-default border border-green-200"
                  : "bg-slate-800 text-white hover:bg-slate-900"
                  }`}
              >
                {isAdded ? "✓ In Personal Wishlist" : "Save for Myself"}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowTripSelect(!showTripSelect)}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:bg-blue-700 hover:shadow-blue-200"
                >
                  Add to Group Trip
                </button>

                {showTripSelect && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select a Trip</p>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {trips.length === 0 ? (
                        <Link to="/trips" className="block p-4 text-sm text-blue-600 hover:bg-blue-50 font-bold text-center">
                          + Create your first trip
                        </Link>
                      ) : (
                        trips.map(trip => (
                          <button
                            key={trip.id}
                            onClick={() => handleAddToTrip(trip.id, destination)}
                            className="w-full text-left p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                          >
                            <p className="font-bold text-slate-800">{trip.title}</p>
                            <p className="text-xs text-slate-500">{trip.collaborators.length} collaborators</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              Free cancellation up to 24h before trip.
            </p>
          </div>
        </div>
      </div>

      {/* 3. WHERE TO STAY */}
      <div className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Where to Stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getHotelsByDestination(destination.id).map(hotel => (
              <div key={hotel.id} className="relative group">
                <HotelCard hotel={hotel} />
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => setSelectedHotelForTrip(hotel)}
                    className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg hover:bg-blue-700"
                  >
                    + Add to Group Trip
                  </button>
                </div>

                {selectedHotelForTrip?.id === hotel.id && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm rounded-2xl z-20 flex flex-col p-4 animate-in fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xs font-bold text-slate-400 uppercase">Add to Trip</p>
                      <button onClick={() => setSelectedHotelForTrip(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs">Close</button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                      {trips.length === 0 ? (
                        <Link to="/trips" className="block text-center text-blue-600 font-bold text-xs p-2">Create Trip First</Link>
                      ) : (
                        trips.map(trip => (
                          <button
                            key={trip.id}
                            onClick={() => handleAddToTrip(trip.id, hotel, 'hotels')}
                            className="w-full text-left p-3 hover:bg-blue-50 rounded-xl transition-colors border border-slate-100"
                          >
                            <p className="font-bold text-slate-800 text-sm truncate">{trip.title}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
