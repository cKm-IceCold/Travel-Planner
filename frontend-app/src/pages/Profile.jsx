import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useItinerary } from "../context/ItineraryContext";

const Profile = () => {
    const { currentUser, updateProfileInfo } = useAuth();
    const { history, loading } = useItinerary();
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

                    {/* RIGHT: TRAVEL HISTORY */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">My Travel History</h2>
                            <p className="text-slate-500">All your past adventures in one place.</p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : history.length === 0 ? (
                            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 italic text-slate-400">
                                No past trips yet. Time to book your next adventure!
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {history.map((trip, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex gap-6 items-center">
                                        <img
                                            src={trip.image}
                                            alt={trip.city}
                                            className="w-24 h-24 rounded-2xl object-cover shrink-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-xl text-slate-800">{trip.city}</h3>
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Booked</span>
                                            </div>
                                            <p className="text-slate-500 text-sm mb-3">Visited on {new Date(trip.bookingDate).toLocaleDateString()}</p>
                                            <div className="flex gap-4">
                                                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Write Review</button>
                                                <button className="text-sm font-bold text-slate-400 hover:text-slate-600">Download Receipt</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
