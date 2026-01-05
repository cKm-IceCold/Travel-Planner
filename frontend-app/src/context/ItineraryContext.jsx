import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the Context
const ItineraryContext = createContext();

// 2. Create a Custom Hook for easy access
export const useItinerary = () => useContext(ItineraryContext);

// 3. Create the Provider Component
export const ItineraryProvider = ({ children }) => {
    const [itinerary, setItinerary] = useState([]);

    // Load from LocalStorage on mount (optional but good for UX)
    useEffect(() => {
        const saved = localStorage.getItem("travel-itinerary");
        if (saved) {
            setItinerary(JSON.parse(saved));
        }
    }, []);

    // Save to LocalStorage whenever itinerary changes
    useEffect(() => {
        localStorage.setItem("travel-itinerary", JSON.stringify(itinerary));
    }, [itinerary]);

    // Add Item
    const addToItinerary = (destination) => {
        // Prevent duplicates
        if (!itinerary.find((item) => item.id === destination.id)) {
            // We can add a "default" selection like 1 person or 3 days here if we wanted complex logic
            setItinerary([...itinerary, { ...destination, dateAdded: new Date().toISOString() }]);
        }
    };

    // Remove Item
    const removeFromItinerary = (id) => {
        setItinerary(itinerary.filter((item) => item.id !== id));
    };

    // Check if item exists
    const isInItinerary = (id) => {
        return itinerary.some(item => item.id === id);
    }

    const value = {
        itinerary,
        addToItinerary,
        removeFromItinerary,
        isInItinerary
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};
