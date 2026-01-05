import { Routes, Route } from "react-router-dom"; // Needed to define routes
import Home from "./pages/Home"; // Home page
import DestinationDetails from "./pages/DestinationDetails"; // Details page
import NavBar from "./components/NavBar"; // Import NavBar
import Itinerary from "./pages/Itinerary"; // Import Itinerary page
import Footer from "./components/Footer"; // Import Footer

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* "/" → Home page */}
        <Route path="/" element={<Home />} />
        {/* "/destinations/:id" → Destination Details page */}
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        {/* "/itinerary" → Itinerary Summary page */}
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
