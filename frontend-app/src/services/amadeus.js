const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

let accessToken = null;
let tokenExpiry = null;

/**
 * Fetches an access token from Amadeus using Client Credentials flow.
 * Caches the token until it expires.
 */
const getAccessToken = async () => {
    // Return cached token if still valid
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken;
    }

    try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Auth Failed: ${errorData.error_description || response.statusText}`);
        }

        const data = await response.json();
        accessToken = data.access_token;
        // Set expiry time (expires_in is in seconds, usually 1799) - subtract 60s buffer
        tokenExpiry = new Date(new Date().getTime() + (data.expires_in - 60) * 1000);

        return accessToken;
    } catch (error) {
        console.error("Error getting Amadeus token:", error);
        throw error;
    }
};

/**
 * Searches for cities/airports by keyword.
 * Uses: /v1/reference-data/locations
 */
export const searchDestinations = async (keyword) => {
    if (!keyword) return [];

    try {
        const token = await getAccessToken();
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}&page[limit]=10`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Search Failed: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform API data to match our app's visual structure
        // The API returns basic info, so we might mock images/prices for now since the basic API doesn't have them
        return data.data.map(item => ({
            id: item.id,
            city: item.address.cityName,
            country: item.address.countryName,
            // The Amadeus API returns "REFERENCE DATA" (locations), not rich content like photos.
            // So we mock the image using Unsplash Source which redirects to a random photo of that city.
            // Note: source.unsplash.com is deprecated in some regions, so we use a reliable fallback or specific structure if possible.
            // Ideally, you would use the "Unsplash API" or "Google Places API" to get real photos.
            image: `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop`, // Generic Travel Fallback because dynamic Unsplash links are unreliable without an API key
            rating: (4 + Math.random()).toFixed(1), // Mock rating
            price: `$${Math.floor(Math.random() * 500) + 500}`, // Mock price
            label: item.subType === 'AIRPORT' ? 'Airport' : 'Recommended',
            description: `Explore ${item.name} (${item.iataCode}).`,
            attractions: ["City Center", "Local Market", "Historic Landmarks"] // Mock attractions
        }));

    } catch (error) {
        console.error("Error searching destinations:", error);
        return []; // Return empty on error to prevent crash
    }
};
