import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand Column */}
                <div className="md:col-span-1">
                    <Link to="/" className="text-2xl font-serif font-bold text-blue-500 flex items-center gap-2 mb-4">
                        Travel<span className="text-white">Planner</span>
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Crafting unforgettable journeys for the modern explorer. We help you find the best destinations and plan your trips with ease.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">Destinations</Link></li>
                        <li><Link to="/itinerary" className="hover:text-blue-400 transition-colors">My Itinerary</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Stay Updated</h4>
                    <p className="text-slate-400 text-sm mb-4">Subscribe to get the latest travel deals and inspiration.</p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
