import React, { useState } from 'react';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Trips = () => {
    const { trips, createTrip, loading } = useTrips();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTripData, setNewTripData] = useState({ title: "", destination: "" });
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const tripId = await createTrip(newTripData);
            setIsModalOpen(false);
            setNewTripData({ title: "", destination: "" });
            navigate(`/trips/${tripId}`);
        } catch (error) {
            alert("Error creating trip");
        } finally {
            setIsCreating(false);
        }
    };

    if (loading) return <div className="pt-32 text-center">Loading your adventures...</div>;

    return (
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">My Journeys</p>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900">Your Collaborative Trips</h1>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <span className="text-xl">+</span> Start New Trip
                </button>
            </div>

            {trips.length === 0 ? (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl py-20 text-center">
                    <p className="text-xl text-slate-500 mb-6 font-serif">You haven't planned any group trips yet.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 font-bold hover:underline"
                    >
                        Create your first adventure now →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.map(trip => (
                        <Link
                            key={trip.id}
                            to={`/trips/${trip.id}`}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                                    {trip.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{trip.title}</h3>
                            <p className="text-slate-500 mb-6">{trip.destination || "Destination TBD"}</p>

                            <div className="flex items-center -space-x-2">
                                {trip.collaborators.map((email, idx) => (
                                    <img
                                        key={idx}
                                        src={`https://ui-avatars.com/api/?name=${email}&background=random`}
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                        title={email}
                                        alt="collaborator"
                                    />
                                ))}
                                <span className="text-xs text-slate-400 ml-4 font-medium">
                                    {trip.collaborators.length} member{trip.collaborators.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* CREATE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <form
                        onSubmit={handleCreate}
                        className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95"
                    >
                        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Create New Adventure</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Trip Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="e.g. Summer in Greece 🇬🇷"
                                    value={newTripData.title}
                                    onChange={(e) => setNewTripData({ ...newTripData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Main Destination</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Where are you going?"
                                    value={newTripData.destination}
                                    onChange={(e) => setNewTripData({ ...newTripData, destination: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 font-bold text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
                            >
                                {isCreating ? "Creating..." : "Launch Trip"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Trips;
