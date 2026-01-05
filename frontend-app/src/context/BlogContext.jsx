import React, { createContext, useContext, useState, useEffect } from "react";
import { initialBlogs } from "../components/data/blogs";
import { db } from "../services/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Listen to Firestore updates
    useEffect(() => {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, orderBy("id", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const blogsData = snapshot.docs.map(doc => ({
                docId: doc.id, // Firestore document ID
                ...doc.data()
            }));

            // If Firestore is empty (first time setup), we could theoretically 
            // seed it here, but typically we'd do a manual migration or check.
            // For now, if empty, we show initialBlogs but don't save them back yet.
            if (blogsData.length === 0) {
                setBlogs(initialBlogs);
            } else {
                setBlogs(blogsData);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const addBlog = async (newBlog) => {
        try {
            const blogEntry = {
                id: Date.now(), // timestamp for sorting
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: currentUser?.displayName || currentUser?.email || "Anonymous",
                ...newBlog
            };

            await addDoc(collection(db, "blogs"), blogEntry);
        } catch (error) {
            console.error("Error adding blog to Firestore:", error);
            // Fallback for local UI update if desired
        }
    };

    const value = {
        blogs,
        addBlog,
        loading
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
