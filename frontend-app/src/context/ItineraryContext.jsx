import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

// 1. Create the Context
const ItineraryContext = createContext();

// 2. Create a Custom Hook for easy access
export const useItinerary = () => useContext(ItineraryContext);

// 3. Create the Provider Component
export const ItineraryProvider = ({ children }) => {
    const [itinerary, setItinerary] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Sync with Firestore if logged in, else use LocalStorage
    useEffect(() => {
        if (!currentUser) {
            const saved = localStorage.getItem("travel-itinerary");
            if (saved) setItinerary(JSON.parse(saved));
            setLoading(false);
            return;
        }

        // 1. Sync Itinerary (Wishlist)
        const userDocRef = doc(db, "itineraries", currentUser.uid);
        const unsubscribeItinerary = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setItinerary(docSnap.data().items || []);
            } else {
                setDoc(userDocRef, { items: [] });
                setItinerary([]);
            }
        });

        // 2. Sync Travel History (Booked)
        const historyDocRef = doc(db, "history", currentUser.uid);
        const unsubscribeHistory = onSnapshot(historyDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setHistory(docSnap.data().items || []);
            } else {
                setDoc(historyDocRef, { items: [] });
                setHistory([]);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeItinerary();
            unsubscribeHistory();
        };
    }, [currentUser]);

    // Helper to update Firestore/Local
    const updateStorage = async (newItinerary) => {
        setItinerary(newItinerary);
        if (currentUser) {
            const userDocRef = doc(db, "itineraries", currentUser.uid);
            await setDoc(userDocRef, { items: newItinerary }, { merge: true });
        } else {
            localStorage.setItem("travel-itinerary", JSON.stringify(newItinerary));
        }
    };

    // Move items to History (called on successful checkout)
    const moveToHistory = async (items) => {
        if (!currentUser) return;
        const newHistory = [...history, ...items.map(item => ({ ...item, bookingDate: new Date().toISOString() }))];
        const historyDocRef = doc(db, "history", currentUser.uid);
        await setDoc(historyDocRef, { items: newHistory }, { merge: true });
    };

    // Add Item
    const addToItinerary = (destination) => {
        if (!itinerary.find((item) => item.id === destination.id)) {
            const newList = [...itinerary, { ...destination, dateAdded: new Date().toISOString() }];
            updateStorage(newList);
        }
    };

    // Remove Item
    const removeFromItinerary = (id) => {
        const newList = itinerary.filter((item) => item.id !== id);
        updateStorage(newList);
    };

    // Check if item exists
    const isInItinerary = (id) => {
        return itinerary.some(item => item.id === id);
    }

    // Clear All (for booking success)
    const clearItinerary = () => {
        updateStorage([]);
    };

    const value = {
        itinerary,
        history,
        addToItinerary,
        removeFromItinerary,
        isInItinerary,
        clearItinerary,
        moveToHistory,
        loading
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};
