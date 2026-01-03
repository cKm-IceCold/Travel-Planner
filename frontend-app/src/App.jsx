import { Routes, Route } from "react-router-dom"; // Needed to define routes
import Home from "./pages/Home"; // Home page
import DestinationDetails from "./pages/DestinationDetails"; // Details page

function App() {
  return (
    <Routes>
      {/* "/" → Home page */}
      <Route path="/" element={<Home />} />
      {/* "/destinations/:id" → Destination Details page */}
      <Route path="/destinations/:id" element={<DestinationDetails />} />
    </Routes>
  );
}

export default App;
