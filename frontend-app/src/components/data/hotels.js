const hotels = [
    // PARIS (ID: 1)
    {
        id: 101,
        destinationId: 1,
        name: "Hôtel Plaza Athénée",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        price: "$850",
        rating: 5.0,
        tags: ["Luxury", "Iconic", "Spa"],
    },
    {
        id: 102,
        destinationId: 1,
        name: "Le Meurice",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
        price: "$920",
        rating: 4.9,
        tags: ["Historic", "City View"],
    },
    {
        id: 103,
        destinationId: 1,
        name: "Maison Souquet",
        image: "https://images.unsplash.com/photo-1590073242678-cfea53332eb1?q=80&w=2070&auto=format&fit=crop",
        price: "$450",
        rating: 4.8,
        tags: ["Boutique", "Romantic"],
    },

    // NEW YORK (ID: 2)
    {
        id: 201,
        destinationId: 2,
        name: "The Plaza",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
        price: "$995",
        rating: 4.8,
        tags: ["Central Park", "Luxury"],
    },
    {
        id: 202,
        destinationId: 2,
        name: "1 Hotel Brooklyn Bridge",
        image: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?q=80&w=2148&auto=format&fit=crop",
        price: "$600",
        rating: 4.7,
        tags: ["Eco-Friendly", "Skyline View"],
    },

    // TOKYO (ID: 3)
    {
        id: 301,
        destinationId: 3,
        name: "Aman Tokyo",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        price: "$1,200",
        rating: 5.0,
        tags: ["Zen", "Skyline", "Spa"],
    },

    // BALI (ID: 4)
    {
        id: 401,
        destinationId: 4,
        name: "Hanging Gardens of Bali",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop",
        price: "$750",
        rating: 4.9,
        tags: ["Jungle", "Pool", "Honeymoon"],
    },

    // GENERIC FALLBACK (For IDs without specific hotels)
    {
        id: 9991,
        destinationId: 0,
        name: "Grand Luxury Resort",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
        price: "$450",
        rating: 4.7,
        tags: ["Resort", "Comfort"],
    },
    {
        id: 9992,
        destinationId: 0,
        name: "City Center Boutique",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
        price: "$320",
        rating: 4.5,
        tags: ["Modern", "Central"],
    },
    {
        id: 9993,
        destinationId: 0,
        name: "Seaside Villa",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
        price: "$550",
        rating: 4.8,
        tags: ["Beachfront", "Relaxing"],
    }
];

export const getHotelsByDestination = (destId) => {
    const specificHotels = hotels.filter(h => h.destinationId === parseInt(destId));
    // If we have specific hotels, return them
    if (specificHotels.length > 0) return specificHotels;

    // Otherwise, return generic ones but give them unique IDs to avoid key errors
    return hotels.filter(h => h.destinationId === 0).map((h, index) => ({
        ...h,
        id: `${destId}-generic-${index}`
    }));
};

export default hotels;
