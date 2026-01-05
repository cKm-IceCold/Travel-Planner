import React from 'react';

const Hero = () => {
    return (
        <div className="relative w-full h-[85vh] overflow-hidden bg-slate-900">

            {/* 
        1. BACKGROUND IMAGE
        - bg-slate-900 ensures text is readable even if image fails to load.
        - 'object-top' ensures the sky/mountains are visible if cropped.
      */}
            <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                alt="Breathtaking Lake View"
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                    e.target.style.display = 'none'; // Hide broken image
                    // Could enable a secondary fallback image here if needed
                }}
            />

            {/* 
        2. GRADIENT FADE (Optional, subtle)
        Only at the very bottom to blend into the search section or page content,
        preserving the "clean" look at the top.
      */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>

            {/* 
        3. HERO TEXT
        Placed strategically to likely align with negative space in landscape photos.
        Center-center is usually safe.
        Using a text shadow instead of a box to keep it "clean".
      */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

                {/* Badge / Tagline */}
                <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wider mb-6 shadow-sm">
                    EXPLORE THE WORLD
                </span>

                {/* Main Title - Serif font for elegance */}
                <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mb-6 drop-shadow-lg tracking-tight">
                    Live Your Best Life
                </h1>

                {/* Subtitle */}
                <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl drop-shadow-md">
                    Curated itineraries for the modern explorer.
                </p>

            </div>
        </div>
    );
};

export default Hero;
