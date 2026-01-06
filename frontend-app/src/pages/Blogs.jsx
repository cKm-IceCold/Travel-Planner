import React from 'react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const { blogs, likePost } = useBlog();
    const { currentUser } = useAuth();

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <p className="text-blue-600 font-bold uppercase tracking-widest mb-2">Community Feed</p>
                <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Shared Adventures</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-8">
                    Discover hidden gems and travel tips shared by our community of explorers.
                </p>

                {currentUser ? (
                    <Link
                        to="/admin"
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 inline-flex items-center gap-2"
                    >
                        <span>✎</span> Share Your Story
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-900 transition-all shadow-lg inline-flex items-center gap-2"
                    >
                        Join to Share Yours
                    </Link>
                )}
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

                            {/* Like Button Overlay */}
                            <button
                                onClick={() => likePost(blog.docId)}
                                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${blog.likedBy?.includes(currentUser?.uid)
                                    ? "bg-red-500 text-white"
                                    : "bg-white/90 text-slate-400 hover:text-red-500"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill={blog.likedBy?.includes(currentUser?.uid) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={blog.authorPhoto || `https://ui-avatars.com/api/?name=${blog.author}`}
                                    className="w-8 h-8 rounded-full border border-slate-100"
                                    alt={blog.author}
                                />
                                <div className="text-xs text-slate-400">
                                    <p className="font-bold text-slate-700">{blog.author}</p>
                                    <p>{blog.date}</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <Link to={`/community/${blog.id}`} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1">
                                    Read Story
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>

                                <div className="flex items-center gap-1 text-slate-400 font-medium text-sm">
                                    <span>{blog.likes || 0}</span>
                                    <span>Likes</span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
