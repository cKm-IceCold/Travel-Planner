import React from 'react';
import { Link } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';

const NavBar = () => {
  const { itinerary } = useItinerary();
  const itemCount = itinerary.length;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">

      {/* 1. Brand: LOGO */}
      <Link to="/" className="text-2xl font-serif font-bold text-blue-600 cursor-pointer flex items-center gap-2">
        Travel<span className="text-slate-800">Planner</span>
      </Link>

      {/* 2.  Nav Links:  */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          Explore
        </Link>
        <Link to="/itinerary" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
          Itinerary
          {itemCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
        <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          About
        </a>
      </div>

      {/* 3. Auth: Styled buttons to stand out */}
      <div className="flex items-center gap-4">
        <button className="text-sm font-semibold text-slate-600 hover:text-blue-600">
          Login
        </button>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95">
          Sign Up
        </button>
      </div>

    </nav>
  );
};

export default NavBar;