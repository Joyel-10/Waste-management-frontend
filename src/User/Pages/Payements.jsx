import React, { useState, useEffect } from "react";
import AppSidebar from "../Components/AppSideBar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar,faHourglass, faPlus, faCreditCard, faClipboard, faCalendar } from "@fortawesome/free-solid-svg-icons";


const Payments = () => {
    const [balance, setBalance] = useState(0);
    const [pendingPayments, setPendingPayments] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCard, setNewCard] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        const userId = userData?._id;

        if (!userId) {
            console.error("UserId missing in sessionStorage");
            return;
        }

        try {
            
            const summaryRes = await axios.get(
                `https://waste-management-2-xsa0.onrender.com/api/payment/summary/${userId}`
            );
            if (summaryRes.data.success) {
                setBalance(summaryRes.data.balance || 0);
                setPendingPayments(summaryRes.data.pendingAmount || 0);
            }

            // PAYMENT METHODS
            const methodRes = await axios.get(
                `https://waste-management-2-xsa0.onrender.com/api/payment/methods/${userId}`
            );
            if (methodRes.data.success) setPaymentMethods(methodRes.data.methods || []);

            // PAYMENT HISTORY
            const historyRes = await axios.get(
                `https://waste-management-2-xsa0.onrender.com/api/pickup/payment-history/${userId}`
            );
            if (historyRes.data.success) {
                const formatted = historyRes.data.payments.map((item) => ({
                    ...item,
                    date: item.date,
                    amount: item.price,
                    status: item.paymentStatus,
                }));
                setPaymentHistory(formatted);
            }
        } catch (err) {
            console.error("Error loading payment data:", err);
        }
    };

    const handleAddCard = async () => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        const userId = userData?._id;
        if (!userId) return;

        if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate || !newCard.cvv) {
             toast.error("All fields are required!");
            return;
        }

        try {
            const res = await axios.post("https://waste-management-2-xsa0.onrender.com/api/payment/add-method", {
                userId,
                ...newCard,
            });
            if (res.data.success) {
                setShowModal(false);
                setNewCard({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
                loadAllData();
            }
        } catch (err) {
            console.error("Add card error:", err);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            paid: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-2 border-emerald-300 shadow-sm",
            pending: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-2 border-amber-300 shadow-sm",
        };
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status] || styles.pending
                    }`}
            >
                {status === "paid" ? "✓" : "⏳"} {status?.toUpperCase() || "PENDING"}
            </span>
        );
    };

    const getCardIcon = (type) =>
        type === "Visa" ? (
            <div className="w-14 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                VISA
            </div>
        ) : (
            <div className="w-14 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <div className="flex gap-0.5">
                    <div className="w-4 h-4 rounded-full bg-red-500 opacity-90"></div>
                    <div className="w-4 h-4 rounded-full bg-orange-400 opacity-90 -ml-2"></div>
                </div>
            </div>
        );

    if (!paymentHistory) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 font-medium">Loading payment data...</p>
                </div>
                <AppSidebar />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Payments
                        </h1>
                        <p className="text-slate-600 text-base mt-1">
                            Manage your payment methods and view transaction history
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">
                                    Current Balance
                                </p>
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl"><FontAwesomeIcon icon={faSackDollar} /></span>
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-slate-900 mb-1">₹{balance}</p>
                            <p className="text-xs text-slate-500">Available to use</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">
                                    Pending Payments
                                </p>
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl"><FontAwesomeIcon icon={faHourglass} /></span>
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-slate-900 mb-1">₹{pendingPayments}</p>
                            <p className="text-xs text-slate-500">Due for payment</p>
                        </div>

                        <div
                            onClick={() => setShowModal(true)}
                            className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                                        Add Payment Method
                                    </p>
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <span className="text-2xl"><FontAwesomeIcon icon={faPlus} /></span>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">New Card</p>
                                <p className="text-xs text-blue-100">Click to add a payment method</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-10 mb-10 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl">
                                    <span className="text-2xl"><FontAwesomeIcon icon={faCreditCard}/></span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                    Saved Payment Methods
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                                + Add New
                            </button>
                        </div>

                        {paymentMethods.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl"><FontAwesomeIcon icon={faCreditCard}/></span>
                                </div>
                                <p className="text-slate-500 text-base font-medium">No saved payment methods yet</p>
                                <p className="text-slate-400 text-sm mt-1">Add a card to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method._id}
                                        className="flex items-center justify-between p-6 border-2 border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
                                    >
                                        <div className="flex items-center gap-5">
                                            {getCardIcon(method.type)}
                                            <div>
                                                <p className="font-bold text-slate-900 text-lg">
                                                    {method.type} •••• {method.cardNumber.slice(-4)}
                                                </p>
                                                <p className="text-sm text-slate-600 mt-1">Expires {method.expiryDate}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                                            Active
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Payment History */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl">
                                <span className="text-2xl"><FontAwesomeIcon icon={faClipboard} /></span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Payment History</h2>
                        </div>

                        {paymentHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">📜</span>
                                </div>
                                <p className="text-slate-500 text-base font-medium">No payment history found</p>
                                <p className="text-slate-400 text-sm mt-1">Your transactions will appear here</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-200">
                                            <th className="text-left py-5 px-6 text-slate-600 font-bold uppercase text-sm tracking-wide">
                                                Date
                                            </th>
                                            <th className="text-left py-5 px-6 text-slate-600 font-bold uppercase text-sm tracking-wide">
                                                Amount
                                            </th>
                                            <th className="text-center py-5 px-6 text-slate-600 font-bold uppercase text-sm tracking-wide">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentHistory.map((p, index) => (
                                            <tr
                                                key={p._id}
                                                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                                                    }`}
                                            >
                                                <td className="py-5 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg"><FontAwesomeIcon icon={faCalendar} /></span>
                                                        </div>
                                                        <span className="font-semibold text-slate-800">
                                                            {new Date(p.date).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-6">
                                                    <span className="text-xl font-bold text-slate-900">
                                                        ₹{p.amount}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-6 text-center">{getStatusBadge(p.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform animate-scaleIn">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Add Payment Method</h3>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all font-bold text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={newCard.cardNumber}
                                    onChange={(e) =>
                                        setNewCard({ ...newCard, cardNumber: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={newCard.cardHolder}
                                    onChange={(e) =>
                                        setNewCard({ ...newCard, cardHolder: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={newCard.expiryDate}
                                        onChange={(e) =>
                                            setNewCard({ ...newCard, expiryDate: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={newCard.cvv}
                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleAddCard}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}

           
            <AppSidebar />
        </>
    );
};

export default Payments;
