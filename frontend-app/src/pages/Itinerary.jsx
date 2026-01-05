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
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Trip Summary</h3>

                        <div className="flex justify-between mb-4 text-slate-300">
                            <span>Destinations</span>
                            <span>{itinerary.length}</span>
                        </div>
                        <div className="h-px bg-slate-700 my-4"></div>

                        <div className="flex justify-between items-end mb-8">
                            <span className="font-medium">Estimated Total</span>
                            <span className="text-3xl font-bold">${calculateTotal().toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleBooking}
                            className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors shadow-lg"
                        >
                            Proceed to Checkout
                        </button>
                        <p className="text-center text-xs text-slate-500 mt-4">Taxes and fees calculated at next step.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Itinerary;
