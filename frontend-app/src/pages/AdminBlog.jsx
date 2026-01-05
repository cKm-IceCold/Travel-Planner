import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';

const AdminBlog = () => {
    const { addBlog } = useBlog();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "Guides",
        image: "",
        excerpt: "",
        content: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use a default image if none provided
        const blogPayload = {
            ...formData,
            image: formData.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
        };

        addBlog(blogPayload);
        navigate('/blogs'); // go back to list
    };

    return (
        <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                <h1 className="text-3xl font-serif font-bold text-slate-800 mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg">✎</span>
                    Write New Story
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 font-serif text-lg"
                            placeholder="e.g. 10 Surprising Facts About Rome"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            >
                                <option>Guides</option>
                                <option>Tips</option>
                                <option>Culture</option>
                                <option>Adventure</option>
                                <option>Food</option>
                            </select>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Short Excerpt (Preview)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows="2"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            placeholder="A brief summary that appears on the card..."
                        ></textarea>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="8"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            placeholder="Start writing your story..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4">
                        <button type="button" onClick={() => navigate('/blogs')} className="text-slate-500 font-bold hover:text-slate-700">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all">
                            Publish Story
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminBlog;
