import { useState } from "react";
import { useItinerary } from "../context/ItineraryContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { itinerary, clearItinerary, moveToHistory } = useItinerary();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const [errors, setErrors] = useState({});

    // Calculate Total
    const total = itinerary.reduce((sum, item) => {
        const price = Number(item.price.replace(/[^0-9.-]+/g, ""));
        return sum + price;
    }, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = "First name is required";
        if (!formData.lastName) tempErrors.lastName = "Last name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
        if (!formData.cardNumber) tempErrors.cardNumber = "Card number is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsProcessing(true);
            // 1. Save to History
            await moveToHistory(itinerary);

            // 2. Simulate Payment Processing
            setTimeout(() => {
                clearItinerary();
                navigate("/booking-success");
            }, 2000);
        }
    };

    if (itinerary.length === 0) {
        navigate("/");
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Secure Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* 1. PAYMENT FORM */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                        <h2 className="text-xl font-bold mb-6">Contact Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-50 border ${errors.firstName ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-50 border ${errors.lastName ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-50 border ${errors.cardNumber ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors`}
                                    placeholder="0000 0000 0000 0000"
                                    maxLength="19"
                                />
                                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">CVC</label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={formData.cvc}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="123"
                                        maxLength="3"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full font-bold py-4 rounded-xl mt-8 transition-all shadow-lg ${isProcessing
                                ? "bg-slate-400 text-white cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30"
                                }`}
                        >
                            {isProcessing ? "Processing Payment..." : `Confirm Payment ($${total.toLocaleString()})`}
                        </button>
                    </form>
                </div>

                {/* 2. ORDER SUMMARY */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 sticky top-24">
                        <h3 className="font-bold text-lg mb-4 text-slate-800">Order Summary</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                            {itinerary.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} alt={item.city} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-bold text-sm text-slate-800">{item.city}</p>
                                        <p className="text-xs text-slate-500">{item.country}</p>
                                        <p className="text-sm text-blue-600 font-semibold">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                            <div className="flex justify-between items-end">
                                <span className="font-medium text-slate-600">Total Due</span>
                                <span className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
