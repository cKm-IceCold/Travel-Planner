import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";
import Itinerary from "./pages/Itinerary";
import Checkout from "./pages/Checkout";
import BookingSuccess from "./pages/BookingSuccess";
import Blogs from "./pages/Blogs";
import AdminBlog from "./pages/AdminBlog";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Trips from "./pages/Trips";
import TripDashboard from "./pages/TripDashboard";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
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
    else if (path === "/community" && path.split("/").length === 2) title = "Community Feed | Travel Planner";
    else if (path.includes("/community/")) title = "Social Story | Travel Planner";
    else if (path === "/admin") title = "Admin Dashboard | Travel Planner";
    else if (path === "/login") title = "Login | Travel Planner";
    else if (path === "/signup") title = "Create Account | Travel Planner";
    else if (path === "/profile") title = "My Profile | Travel Planner";
    else if (path === "/trips") title = "My Trips | Travel Planner";
    else if (path.includes("/trips/")) title = "Trip Planning | Travel Planner";

    document.title = title;

    // Handle Scroll to Hash
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure component is mounted
    } else {
      window.scrollTo(0, 0); // Scroll to top on normal navigation
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <>
      <PageTitleUpdater />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
        <Route path="/trips/:id" element={<ProtectedRoute><TripDashboard /></ProtectedRoute>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/community" element={<Blogs />} />
        <Route path="/community/:id" element={<BlogDetails />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
