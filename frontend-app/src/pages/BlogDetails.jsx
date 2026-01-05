import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const BlogDetails = () => {
    const { id } = useParams();
    const { blogs } = useBlog();

    const blog = blogs.find(b => String(b.id) === String(id));

    if (!blog) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Story Not Found</h2>
                <Link to="/blogs" className="text-blue-600 hover:text-blue-800 underline">Return to Stories</Link>
            </div>
        );
    }

    return (
        <article className="pb-20">
            {/* HEADER IMAGE */}
            <div className="h-[50vh] w-full relative">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full text-white">
                        <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                            {blog.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm md:text-base font-medium text-white/90">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>By {blog.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT BODY */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link to="/blogs" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Stories
                </Link>

                <p className="text-xl text-slate-600 leading-relaxed mb-8 font-serif border-l-4 border-blue-600 pl-4 italic">
                    {blog.excerpt}
                </p>

                <div className="prose prose-lg prose-slate max-w-none text-slate-700">
                    {/* If content exists, render it. Otherwise fallback to placeholders */}
                    {blog.content ? (
                        blog.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4">{paragraph}</p>
                        ))
                    ) : (
                        <>
                            <p className="mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="mb-6">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why You Should Visit</h3>
                            <p className="mb-6">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
