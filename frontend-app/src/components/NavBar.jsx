import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { itinerary } = useItinerary();
  const { currentUser, logout } = useAuth();
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
        <Link to="/community" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          Community
        </Link>
        <Link to="/trips" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
          My Trips
          <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Groups</span>
        </Link>
        <Link to="/#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          About
        </Link>
      </div>

      {/* 3. Desktop Auth Buttons (Updated) */}
      <div className="hidden md:flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                <img
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || 'User'}`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-slate-700">{currentUser.displayName || 'User'}</span>
            </Link>
            <button
              onClick={logout}
              className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">Sign Up</Link>
          </>
        )}
      </div>

      {/* 4. Mobile Menu Button (Hamburger) (Updated) */}
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

      {/* 5. Mobile Menu Overlay (Updated) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link to="/" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>
            Explore
          </Link>
          <Link to="/community" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>
            Community
          </Link>
          <Link to="/trips" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
            My Trips
            <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold">Collaborative</span>
          </Link>
          <Link to="/#about" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          {currentUser && <Link to="/profile" className="text-lg font-semibold text-slate-800 py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>Profile</Link>}
          <div className="flex flex-col gap-3 mt-4">
            {currentUser ? (
              <>
                <p className="text-center text-slate-800 font-bold mb-2">Hi, {currentUser.displayName}</p>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-3 text-red-600 font-bold border border-red-100 bg-red-50 rounded-lg">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full py-3 text-center text-slate-600 font-semibold border border-slate-200 rounded-lg" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="w-full py-3 text-center bg-blue-600 text-white font-bold rounded-lg shadow-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  );
};

export default NavBar;