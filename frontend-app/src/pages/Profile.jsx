import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useItinerary } from "../context/ItineraryContext";
import { useTrips } from "../context/TripContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { currentUser, updateProfileInfo } = useAuth();
    const { history, itinerary, loading: itineraryLoading } = useItinerary();
    const { trips, loading: tripsLoading } = useTrips();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(currentUser?.displayName || "");
    const [newPhoto, setNewPhoto] = useState(currentUser?.photoURL || "");
    const [updating, setUpdating] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateProfileInfo(newName, newPhoto);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
        setUpdating(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT: PROFILE CARD */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/20 sticky top-24">
                            <div className="relative group w-32 h-32 mx-auto mb-6">
                                <img
                                    src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=" + (currentUser?.displayName || "User")}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-blue-100 shadow-md transition-transform group-hover:scale-105"
                                />
                            </div>

                            {!isEditing ? (
                                <div className="text-center">
                                    <h1 className="text-2xl font-serif font-bold text-slate-800">{currentUser?.displayName || "Adventurer"}</h1>
                                    <p className="text-slate-500 text-sm mb-6">{currentUser?.email}</p>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-full bg-slate-100 border-none rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Photo URL</label>
                                        <input
                                            type="text"
                                            value={newPhoto}
                                            onChange={(e) => setNewPhoto(e.target.value)}
                                            className="w-full bg-slate-100 border-none rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="submit"
                                            disabled={updating}
                                            className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 transition-colors"
                                        >
                                            {updating ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">{history.length}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Trips Taken</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">12</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: COMMAND CENTER */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* 1. ACTIVE PLANNING HUB */}
                        <section>
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-slate-800 mb-1">Active Planning</h2>
                                    <p className="text-slate-500">Your current wishlists and group adventures.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Wishlist Card */}
                                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-lg">Personal</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">My Travel Wishlist</h3>
                                        <p className="text-sm text-slate-500 mb-4">{itinerary.length} items saved</p>
                                    </div>
                                    <Link
                                        to="/itinerary"
                                        className="w-full bg-slate-900 text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        Finalize Wishlist
                                    </Link>
                                </div>

                                {/* Shared Trips Summary Card */}
                                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                </svg>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-lg">Shared</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Collaborative Trips</h3>
                                        <p className="text-sm text-slate-500 mb-4">{trips.filter(t => t.status === 'planning').length} active plans</p>
                                    </div>
                                    <Link
                                        to="/trips"
                                        className="w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        Manage Group Trips
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* 2. TRAVEL HISTORY */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Recent Bookings</h2>

                            {itineraryLoading || tripsLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : history.length === 0 ? (
                                <div className="bg-white p-12 rounded-[2rem] text-center border border-slate-100 italic text-slate-400">
                                    No travel history yet. Your booked adventures will appear here!
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {history.map((trip, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex gap-4 items-center hover:shadow-md transition-shadow">
                                            <img
                                                src={trip.image}
                                                alt={trip.city}
                                                className="w-20 h-20 rounded-xl object-cover shrink-0"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-lg text-slate-800">{trip.city}</h3>
                                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase">Confirmed</span>
                                                </div>
                                                <p className="text-slate-400 text-xs mb-2">Booked on {new Date(trip.bookingDate).toLocaleDateString()}</p>
                                                <div className="flex gap-4">
                                                    <button className="text-xs font-bold text-blue-600 hover:underline">View Receipt</button>
                                                    <button className="text-xs font-bold text-slate-300 hover:text-slate-500">Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
