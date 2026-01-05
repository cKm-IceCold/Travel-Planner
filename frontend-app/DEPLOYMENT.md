# Deployment Guide 🚀

To deploy your Travel Planner to a platform like **Vercel** or **Netlify**, follow these steps:

## 1. Environment Variables
Since your `.env` file is hidden from Git (for security!), you must manually add the keys to your deployment platform:

| Key | Description |
|-----|-------------|
| `VITE_AMADEUS_CLIENT_ID` | Your Amadeus API Key |
| `VITE_AMADEUS_CLIENT_SECRET` | Your Amadeus API Secret |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| ... and the rest from `.env.example` | |

## 2. Platform Setup (Vercel Example)
1. **Push your code** to GitHub.
2. **Import Project** in Vercel.
3. **Environment Variables**: Open the "Environment Variables" section during setup and paste your keys there.
4. **Deploy**: Vercel will build the React app and give you a live URL!

## 3. Firebase White-listing
Once deployed, you MUST add your new domain (e.g., `travel-planner.vercel.app`) to the **Authorized Domains** list in the Firebase Console (Authentication > Settings > Authorized Domains). This ensures Google Login works on your live site.
