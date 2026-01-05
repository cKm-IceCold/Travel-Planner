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

        const userDocRef = doc(db, "itineraries", currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setItinerary(docSnap.data().items || []);
            } else {
                // Initialize empty doc for new user
                setDoc(userDocRef, { items: [] });
                setItinerary([]);
            }
            setLoading(false);
        });

        return unsubscribe;
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
        addToItinerary,
        removeFromItinerary,
        isInItinerary,
        clearItinerary,
        loading
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};
