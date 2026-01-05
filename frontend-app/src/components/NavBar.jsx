import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';

const NavBar = () => {
  const { itinerary } = useItinerary();
  const itemCount = itinerary.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">

      {/* 1. Brand: LOGO */}
      <Link to="/" className="text-2xl font-serif font-bold text-blue-600 cursor-pointer flex items-center gap-2">
        Travel<span className="text-slate-800">Planner</span>
      </Link>

      {/* 2. Desktop Nav Links */}
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

      {/* 3. Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="text-sm font-semibold text-slate-600 hover:text-blue-600">
          Login
        </button>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95">
          Sign Up
        </button>
      </div>

      {/* 4. Mobile Menu Button (Hamburger) */}
      <button
        className="md:hidden text-slate-600 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* 5. Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link to="/" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>
            Explore
          </Link>
          <Link to="/itinerary" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
            Itinerary
            {itemCount > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{itemCount} items</span>}
          </Link>
          <a href="#about" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full py-3 text-slate-600 font-semibold border border-slate-200 rounded-lg">Login</button>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg">Sign Up</button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default NavBar;