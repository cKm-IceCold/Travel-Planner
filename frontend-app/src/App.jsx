import { Routes, Route } from "react-router-dom"; // Needed to define routes
import Home from "./pages/Home"; // Home page
import DestinationDetails from "./pages/DestinationDetails"; // Details page
import NavBar from "./components/NavBar"; // Import NavBar
import Itinerary from "./pages/Itinerary"; // Import Itinerary page
import Footer from "./components/Footer"; // Import Footer

function App() {
  return (
    <>
      <PageTitleUpdater />
      <NavBar />
      <Routes>
        {/* "/" → Home page */}
        <Route path="/" element={<Home />} />
        {/* "/destinations/:id" → Destination Details page */}
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        {/* "/itinerary" → Itinerary Summary page */}
        <Route path="/itinerary" element={<Itinerary />} />
        {/* "/checkout" → Checkout page */}
        <Route path="/checkout" element={<Checkout />} />
        {/* "/booking-success" → Success page */}
        <Route path="/booking-success" element={<BookingSuccess />} />
        {/* "/blogs" → Blog List */}
        <Route path="/blogs" element={<Blogs />} />
        {/* "/blogs/:id" → Blog Details */}
        <Route path="/blogs/:id" element={<BlogDetails />} />
        {/* "/admin" → Admin Dashboard (Protected) */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        } />
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

// Helper to update Title based on Route (Simple implementation)
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BookingSuccess from "./pages/BookingSuccess";
import Checkout from "./pages/Checkout";
import Blogs from "./pages/Blogs";
import AdminBlog from "./pages/AdminBlog";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Travel Planner | Explore the World";

    if (path === "/") title = "Home | Travel Planner";
    else if (path.includes("/destinations/")) title = "Destination Details | Travel Planner";
    else if (path === "/itinerary") title = "My Trip | Travel Planner";
    else if (path === "/checkout") title = "Secure Checkout | Travel Planner";
    else if (path === "/booking-success") title = "Booking Confirmed! | Travel Planner";
    else if (path === "/blogs" && path.split("/").length === 2) title = "Travel Stories | Travel Planner";
    else if (path.includes("/blogs/")) title = "Story | Travel Planner";
    else if (path === "/admin") title = "Admin Dashboard | Travel Planner";
    else if (path === "/login") title = "Login | Travel Planner";
    else if (path === "/signup") title = "Create Account | Travel Planner";

    document.title = title;
  }, [location]);

  return null;
};

export default App;
