import React from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { Link, useNavigate } from 'react-router-dom';

const Itinerary = () => {
    const { itinerary, removeFromItinerary, clearItinerary } = useItinerary();
    const navigate = useNavigate();

    const handleBooking = () => {
        navigate('/checkout');
    }

    // Helper to calculate total (strips '$' and ',' to sum)
    const calculateTotal = () => {
        return itinerary.reduce((total, item) => {
            const price = Number(item.price.replace(/[^0-9.-]+/g, ""));
            return total + price;
        }, 0);
    };

    if (itinerary.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-slate-100 p-6 rounded-full mb-6">
                    <span className="text-4xl">🗺️</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Itinerary Empty</h2>
                <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added any destinations yet. Explore our curated list to start planning!</p>
                <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
                    Start Exploring
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Your Trip Itinerary</h1>
            <p className="text-slate-500 mb-12">Review your selected destinations and estimated costs.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LIST OF ITEMS */}
                <div className="lg:col-span-2 space-y-6">
                    {itinerary.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <img src={item.image} alt={item.city} className="w-full sm:w-32 h-32 object-cover rounded-xl" />

                            <div className="flex-1 flex flex-col justify-center">
                                <Link to={`/destinations/${item.id}`} className="block">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.country}</p>
                                            <h3 className="text-xl font-bold text-slate-800">{item.city}</h3>
                                        </div>
                                        <p className="text-lg font-bold text-slate-900">{item.price}</p>
                                    </div>
                                </Link>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">Added on {new Date(item.dateAdded).toLocaleDateString()}</span>
                                    <button
                                        onClick={() => removeFromItinerary(item.id)}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUMMARY CARD */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-24 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="text-xl font-bold mb-6 relative z-10">Estimate Summary</h3>

                        <div className="space-y-4 relative z-10 text-slate-300 text-sm">
                            <div className="flex justify-between">
                                <span>Selected Places</span>
                                <span>{itinerary.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Travel Insurance</span>
                                <span className="text-blue-400">Included</span>
                            </div>
                        </div>

                        <div className="h-px bg-slate-700 my-6 relative z-10"></div>

                        <div className="mb-8 relative z-10">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Estimated Total</p>
                            <span className="text-4xl font-bold">${calculateTotal().toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleBooking}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                        >
                            Finalize & Checkout
                        </button>
                        <p className="text-center text-[10px] text-slate-500 mt-4 leading-relaxed">
                            Secured by TravelGuard. No hidden fees. Taxes included.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Itinerary;
