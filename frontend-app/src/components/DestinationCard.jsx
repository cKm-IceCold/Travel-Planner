import { Link } from "react-router-dom";

const DestinationCard = ({ id, city, country, image, price, rating, label }) => {
  return (
    <Link to={`/destinations/${id}`} className="group relative block h-[400px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">

      {/* BACKGROUND IMAGE with ZOOM effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={city}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"; // Reliable fallback
          }}
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      </div>

      {/* TOP BADGE */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {label}
      </div>

      {/* BOTTOM CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">

        <p className="text-sm font-medium text-blue-300 mb-1 tracking-wide uppercase">{country}</p>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">{city}</h2>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <span>★</span>
              <span className="font-semibold text-white">{rating}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-300 mb-0.5">from</p>
            <p className="text-xl font-bold">{price}</p>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default DestinationCard;
