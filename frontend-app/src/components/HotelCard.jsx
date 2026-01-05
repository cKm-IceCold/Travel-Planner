import React from 'react';

const HotelCard = ({ hotel }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 group cursor-pointer min-w-[280px]">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-800">
                    ★ {hotel.rating}
                </div>
            </div>

            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-800 mb-1 truncate">{hotel.name}</h3>

                <div className="flex justify-between items-end mt-4">
                    <div>
                        <p className="text-xs text-slate-400">Nightly rate</p>
                        <p className="font-bold text-slate-900">{hotel.price}</p>
                    </div>
                    <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-700 transition-colors">
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
