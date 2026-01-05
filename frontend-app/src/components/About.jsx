import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Image Grid */}
                    <div className="relative">
                        {/* Main Image */}
                        <img
                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1887&auto=format&fit=crop"
                            alt="Traveler looking at map"
                            className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                        />
                        {/* Floating Badge Image */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-2 rounded-2xl shadow-xl hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop"
                                alt="Passport and tickets"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -z-10 top-10 -left-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl"></div>
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                            We Make Your <span className="text-blue-600">Travel Dreams</span> Come True
                        </h2>

                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2024, TravelPlanner was born from a simple idea: exploring the world should be effortless and inspiring. We believe that every journey tells a story, and we are here to help you write yours.
                            </p>
                            <p>
                                Whether you're seeking the tranquility of a secluded beach, the energy of a bustling metropolis, or the culture of a historic ancient city, our curated selection of destinations ensures quality and wonder at every turn.
                            </p>
                        </div>

                        {/* Stats / Trust Signals */}
                        <div className="grid grid-cols-3 gap-8 mt-12 border-t border-slate-100 pt-8">
                            <div>
                                <span className="block text-3xl font-bold text-slate-900">10k+</span>
                                <span className="text-sm text-slate-500">Happy Travelers</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-slate-900">500+</span>
                                <span className="text-sm text-slate-500">Destinations</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-slate-900">24/7</span>
                                <span className="text-sm text-slate-500">Support</span>
                            </div>
                        </div>

                        <button className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                            Read More
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
