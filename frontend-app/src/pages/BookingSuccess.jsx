import { Link } from "react-router-dom";

const BookingSuccess = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg border border-slate-100 animate-fade-in-up">
                {/* Animated Checkmark */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4">Booking Confirmed!</h1>
                <p className="text-slate-500 text-lg mb-8">
                    Pack your bags! Your trip has been successfully scheduled. We've sent the details to your email.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default BookingSuccess;
