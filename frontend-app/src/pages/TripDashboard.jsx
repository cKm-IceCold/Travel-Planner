import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

const TripDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { trips, updateTripItem, inviteCollaborator, addTask, toggleTask, voteHotel, addChatMessage, deleteTrip } = useTrips();
    const { currentUser } = useAuth();
    const [inviteEmail, setInviteEmail] = useState("");

    const trip = trips.find(t => t.id === id);

    if (!trip) return <div className="pt-32 text-center text-slate-500">Trip not found or you don't have access.</div>;

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            await inviteCollaborator(id, inviteEmail);
            setInviteEmail("");
            alert("Invite sent!");
        } catch (error) {
            alert("Error sending invite");
        }
    };

    return (
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100 mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="w-full lg:w-auto">
                        <div className="flex justify-between items-center mb-4">
                            <Link to="/trips" className="text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline">
                                ← Back to all trips
                            </Link>
                            <button
                                onClick={async () => {
                                    if (window.confirm("Are you sure you want to delete this trip?")) {
                                        await deleteTrip(id);
                                        navigate("/trips");
                                    }
                                }}
                                className="text-red-500 font-bold text-xs sm:text-sm flex items-center gap-1 hover:text-red-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete Trip
                            </button>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mb-2 leading-tight">{trip.title}</h1>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            {trip.status === 'planning' ? 'Planning in progress' : trip.status}
                        </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
                        <div className="flex items-center -space-x-2">
                            {trip.collaborators.map((email, idx) => (
                                <img
                                    key={idx}
                                    src={`https://ui-avatars.com/api/?name=${email}&background=random`}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm"
                                    title={email}
                                    alt="collaborator"
                                />
                            ))}
                        </div>
                        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Friend's email"
                                className="w-full sm:w-48 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                required
                            />
                            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors whitespace-nowrap">
                                Invite Friend
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Itinerary & Hotels */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                            📍 Trip Itinerary
                        </h2>
                        {trip.itinerary.length === 0 ? (
                            <p className="text-slate-400 italic py-10 text-center">Your itinerary is empty. Start adding places!</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {trip.itinerary.map((dest, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group/item">
                                        <img src={dest.image} className="w-full h-32 object-cover rounded-xl mb-3" alt={dest.city} />
                                        <h4 className="font-bold text-slate-800">{dest.city}</h4>
                                        <p className="text-xs text-slate-500">{dest.country}</p>
                                        <button
                                            onClick={() => {
                                                const updated = trip.itinerary.filter((_, i) => i !== idx);
                                                updateTripItem(id, 'itinerary', updated);
                                            }}
                                            className="absolute top-6 right-6 p-1.5 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/" className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-bold hover:border-blue-400 hover:text-blue-600 transition-all">
                            + Explore & Add Destinations
                        </Link>
                    </section>

                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                            🏨 Where We're Staying
                        </h2>
                        {trip.hotels?.length === 0 ? (
                            <p className="text-slate-400 italic py-10 text-center">No hotels suggested yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {trip.hotels?.map((hotel, idx) => {
                                    const upvotes = Object.values(hotel.votes || {}).filter(v => v === 'up').length;
                                    const downvotes = Object.values(hotel.votes || {}).filter(v => v === 'down').length;
                                    const myVote = hotel.votes?.[currentUser?.uid];

                                    return (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative">
                                            <img src={hotel.image} className="w-full h-32 object-cover rounded-xl mb-3" alt={hotel.name} />
                                            <h4 className="font-bold text-slate-800 truncate">{hotel.name}</h4>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => voteHotel(id, hotel.id, 'up')}
                                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${myVote === 'up' ? "bg-green-500 text-white" : "bg-white text-slate-500 border border-slate-200"
                                                            }`}
                                                    >
                                                        👍 {upvotes}
                                                    </button>
                                                    <button
                                                        onClick={() => voteHotel(id, hotel.id, 'down')}
                                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${myVote === 'down' ? "bg-red-500 text-white" : "bg-white text-slate-500 border border-slate-200"
                                                            }`}
                                                    >
                                                        👎 {downvotes}
                                                    </button>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${hotel.status === 'booked' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                                    }`}>
                                                    {hotel.status || 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Booking Finalization */}
                    {trip.status === 'planning' && (
                        <section className="bg-blue-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Ready to lock it in? ✈️</h3>
                                    <p className="text-blue-100 text-sm">Finalize your group's planning and proceed to checkout.</p>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-2 text-right">
                                    <p className="text-xs uppercase font-bold tracking-widest text-blue-200">Group Total</p>
                                    <p className="text-3xl font-bold">
                                        ${[...trip.itinerary, ...trip.hotels].reduce((sum, item) => {
                                            const price = Number(item.price?.replace(/[^0-9.-]+/g, "") || 0);
                                            return sum + price;
                                        }, 0).toLocaleString()}
                                    </p>
                                    <Link
                                        to={`/checkout?tripId=${id}`}
                                        className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg mt-2"
                                    >
                                        Finalize & Book
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}

                    {trip.status === 'booked' && (
                        <section className="bg-green-600 p-8 rounded-3xl shadow-xl text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold">This trip is Booked! 🎉</h3>
                                    <p className="text-green-100">Everything is confirmed. Get ready for an amazing journey!</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar: Checklist & Chat */}
                <div className="space-y-10">
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                            ✅ Group Checklist
                        </h3>

                        {/* Task Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const input = e.target.task;
                                if (input.value.trim()) {
                                    addTask(id, input.value);
                                    input.value = "";
                                }
                            }}
                            className="flex gap-2 mb-6"
                        >
                            <input
                                name="task"
                                type="text"
                                placeholder="Add a task (e.g. Book Flights)"
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
                                Add
                            </button>
                        </form>

                        <div className="space-y-3">
                            {trip.checklist?.length === 0 ? (
                                <p className="text-slate-400 text-sm italic py-4 text-center">No tasks yet.</p>
                            ) : (
                                trip.checklist?.sort((a, b) => a.completed - b.completed).map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(id, task.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${task.completed
                                            ? "bg-slate-50 border-transparent opacity-60"
                                            : "bg-white border-slate-100 hover:border-blue-200"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${task.completed ? "bg-blue-600 border-blue-600" : "border-slate-300"
                                            }`}>
                                            {task.completed && (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium ${task.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                                            {task.text}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    <section className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
                        <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                            💬 Group Chat
                        </h3>

                        <div className="h-80 flex flex-col border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {trip.messages?.length === 0 ? (
                                    <p className="text-white/20 text-xs italic text-center mt-10">Start the conversation!</p>
                                ) : (
                                    trip.messages?.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={`flex flex-col ${msg.senderId === currentUser.uid ? 'items-end' : 'items-start'}`}
                                        >
                                            <span className="text-[10px] text-white/40 mb-1 px-1">{msg.senderName}</span>
                                            <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${msg.senderId === currentUser.uid
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white/10 text-white rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Chat Input */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const input = e.target.msg;
                                    if (input.value.trim()) {
                                        addChatMessage(id, input.value);
                                        input.value = "";
                                    }
                                }}
                                className="p-3 bg-white/5 border-t border-white/10 flex gap-2"
                            >
                                <input
                                    name="msg"
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-white/20"
                                    autoComplete="off"
                                />
                                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TripDashboard;
