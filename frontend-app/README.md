# Travel Planner Frontend

A premium React-based travel planning application designed to inspire wanderlust and help users organize their dream trips.

## 🚀 Features

### ✅ Premium UI/UX
- **Immersive Hero Section**: Full-screen, high-quality imagery with no dark filters. Uses a custom "Glassmorphism" search bar that floats elegantly over the content.
- **Modern Typography**: Utilizing `Playfair Display` for editorial headings and `Outfit` for clean, readable body text.
- **Interactive Cards**: Destination cards feature hover zoom effects, lift animations, and detailed pricing/rating information.

### 🗺️ Destination Discovery & Features
- **Hybrid Search Engine**: Instantly switch between curated local destinations and **Amadeus API** live results for global cities.
- **Smart "See More"**: Expand the list to view 20+ hidden gem locations.
- **Hotel Integration**: Each destination features a "Where to Stay" section with curated luxury hotels (e.g., The Plaza, Aman Tokyo).

### ✍️ Travel Stories (Blog System)
- **Public Blog**: A beautiful grid layout of travel articles.
- **Full Article View**: Dedicated page for reading immersive stories.
- **Admin Dashboard**: A built-in CMS allowing admins to write and publish new stories.
    *   *Powered by Context API & LocalStorage traversal logic (No backend required yet).*

### 🛒 E-Commerce Flow
- **Itinerary Management**: Add destinations to a persistent cart (Context API).
- **Secure Checkout**: A realistic checkout form with validation and order summary.
- **Booking Success**: Visual feedback and animation upon successful "payment".

### 📱 Responsive & Polish
- **Mobile Menu**: Fully functional hamburger menu with smooth animations.
- **Dynamic Titles**: Browser tab updates based on the current page.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **Icons**: Heroicons / SVG
- **Fonts**: Google Fonts (Outfit, Playfair Display)

## 📦 Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## 🔮 Upcoming Features (Phase 3)

- **Firebase Authentication**: User Login/Signup with Google.
- **Cloud Database**: Move Blogs and Itineraries to Firestore.
- **User Profiles**: Save trip history and preferences.

## 🎨 Design Philosophy

We move away from generic "Bootstrap-like" layouts to a custom, high-end feel.
- **Whitespace**: Generous usage to let content breathe.
- **Imagery**: Images are treated as the primary content, not just decoration.
- **Micro-interactions**: Subtle animations to make the app feel alive.
