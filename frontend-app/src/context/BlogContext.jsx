import React, { createContext, useContext, useState, useEffect } from "react";
import { initialBlogs } from "../components/data/blogs";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    // Load from LocalStorage or use specific defaults
    useEffect(() => {
        const saved = localStorage.getItem("travel-blogs");
        if (saved) {
            setBlogs(JSON.parse(saved));
        } else {
            setBlogs(initialBlogs);
        }
    }, []);

    // Save to LocalStorage whenever blogs change
    useEffect(() => {
        // Avoid overwriting with empty array on initial mount before load
        if (blogs.length > 0) {
            localStorage.setItem("travel-blogs", JSON.stringify(blogs));
        }
    }, [blogs]);

    const addBlog = (newBlog) => {
        // Create full blog object with dynamic fields
        const blogEntry = {
            id: Date.now(), // Unique ID
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            author: "Admin User", // Default for now
            ...newBlog
        };
        setBlogs([blogEntry, ...blogs]); // Prepend to list (newest first)
    };

    const value = {
        blogs,
        addBlog
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
