import React, { createContext, useContext, useState, useEffect } from "react";
import { initialBlogs } from "../components/data/blogs";
import { db } from "../services/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
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
                createdAt: new Date(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: currentUser?.displayName || currentUser?.email || "Anonymous",
                authorPhoto: currentUser?.photoURL || null,
                userId: currentUser?.uid,
                likes: 0,
                likedBy: [],
                ...newBlog
            };

            await addDoc(collection(db, "blogs"), blogEntry);
        } catch (error) {
            console.error("Error adding blog to Firestore:", error);
            // Fallback for local UI update if desired
        }
    };

    const likePost = async (blogId) => {
        if (!currentUser) return;
        const post = blogs.find(b => b.docId === blogId);
        if (!post) return;

        const likedBy = post.likedBy || [];
        const isLiked = likedBy.includes(currentUser.uid);

        const newLikedBy = isLiked
            ? likedBy.filter(uid => uid !== currentUser.uid)
            : [...likedBy, currentUser.uid];

        try {
            const postRef = doc(db, "blogs", blogId);
            await updateDoc(postRef, {
                likedBy: newLikedBy,
                likes: newLikedBy.length
            });
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const value = {
        blogs,
        addBlog,
        likePost,
        loading
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
