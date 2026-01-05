import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const { blogs } = useBlog();

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <p className="text-blue-600 font-bold uppercase tracking-widest mb-2">Travel Stories</p>
                <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Inspiration for Your Next Trip</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                    Discover hidden gems, expert guides, and travel tips from our community of explorers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog) => (
                    <article key={blog.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                        <div className="h-64 overflow-hidden relative">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide">
                                {blog.category}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.author}</span>
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                                {blog.excerpt}
                            </p>
                            <Link to={`/blogs/${blog.id}`} className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800">
                                Read Article
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Admin Link (Hidden/Discrete) */}
            <div className="mt-20 text-center border-t border-slate-200 pt-10">
                <p className="text-slate-400 text-sm mb-4">Are you an editor?</p>
                <Link to="/admin" className="text-slate-300 hover:text-blue-500 text-xs uppercase tracking-widest font-bold transition-colors">
                    Access Admin Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Blogs;
