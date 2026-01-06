import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    doc,
    updateDoc,
    arrayUnion,
    getDocs
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const TripContext = createContext();

export const useTrips = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Listen to all trips where user is a collaborator
    useEffect(() => {
        if (!currentUser) {
            setTrips([]);
            setLoading(false);
            return;
        }

        const tripsRef = collection(db, "trips");
        const q = query(tripsRef, where("collaborators", "array-contains", currentUser.email));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tripsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTrips(tripsData);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const createTrip = async (tripData) => {
        if (!currentUser) return;
        try {
            const newTrip = {
                title: tripData.title,
                destination: tripData.destination || "",
                startDate: tripData.startDate || "",
                endDate: tripData.endDate || "",
                ownerId: currentUser.uid,
                ownerEmail: currentUser.email,
                collaborators: [currentUser.email],
                itinerary: [],
                hotels: [],
                checklist: [],
                createdAt: new Date(),
                status: "planning"
            };
            const docRef = await addDoc(collection(db, "trips"), newTrip);
            return docRef.id;
        } catch (error) {
            console.error("Error creating trip:", error);
            throw error;
        }
    };

    const inviteCollaborator = async (tripId, email) => {
        try {
            const tripRef = doc(db, "trips", tripId);
            await updateDoc(tripRef, {
                collaborators: arrayUnion(email)
            });
        } catch (error) {
            console.error("Error inviting collaborator:", error);
            throw error;
        }
    };

    const updateTripItem = async (tripId, field, data) => {
        try {
            const tripRef = doc(db, "trips", tripId);
            await updateDoc(tripRef, {
                [field]: data
            });
        } catch (error) {
            console.error("Error updating trip:", error);
            throw error;
        }
    };

    const addTask = async (tripId, taskText) => {
        try {
            const tripRef = doc(db, "trips", tripId);
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
                assignedTo: null,
                createdAt: new Date()
            };
            await updateDoc(tripRef, {
                checklist: arrayUnion(newTask)
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTask = async (tripId, taskId) => {
        const trip = trips.find(t => t.id === tripId);
        if (!trip) return;

        const updatedChecklist = trip.checklist.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        await updateTripItem(tripId, 'checklist', updatedChecklist);
    };

    const voteHotel = async (tripId, hotelId, voteType) => {
        if (!currentUser) return;
        const trip = trips.find(t => t.id === tripId);
        if (!trip) return;

        const updatedHotels = (trip.hotels || []).map(h => {
            if (h.id === hotelId) {
                const votes = h.votes || {};
                const userVote = votes[currentUser.uid];

                if (userVote === voteType) {
                    delete votes[currentUser.uid]; // Remove vote if clicked again
                } else {
                    votes[currentUser.uid] = voteType;
                }
                return { ...h, votes };
            }
            return h;
        });

        await updateTripItem(tripId, 'hotels', updatedHotels);
    };

    const addChatMessage = async (tripId, messageText) => {
        if (!currentUser) return;
        try {
            const tripRef = doc(db, "trips", tripId);
            const newMessage = {
                id: Date.now(),
                senderId: currentUser.uid,
                senderName: currentUser.displayName || currentUser.email,
                text: messageText,
                createdAt: new Date()
            };
            await updateDoc(tripRef, {
                messages: arrayUnion(newMessage)
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const value = {
        trips,
        createTrip,
        inviteCollaborator,
        updateTripItem,
        addTask,
        toggleTask,
        voteHotel,
        addChatMessage,
        loading
    };

    return (
        <TripContext.Provider value={value}>
            {children}
        </TripContext.Provider>
    );
};
