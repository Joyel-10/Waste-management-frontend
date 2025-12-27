
import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AppSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PickupHistory() {
    const [pickupData, setPickupData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");

        if (!token || !userId) {
            navigate("/login");
            return;
        }

        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/pickup/history/${userId}`
                );

                setPickupData(response.data.pickups || []);
            } catch (error) {
                console.error(error);
                alert("Failed to load pickup history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    const handleCancel = async (pickup) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/pickup/cancel/${pickup.userId}`
            );

            alert("Pickup cancelled successfully!");
            window.location.reload();
        } catch (err) {
            alert("Failed to cancel pickup");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 font-medium">Loading your history...</p>
                </div>

                <AppSidebar />
            </div>
        );
    }

    return (
        <>
            {/* Main container */}
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20 px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
                <div className="w-full max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-400 to-teal-600 bg-clip-text text-transparent mb-2">
                            Pickup History
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Track all your waste collection requests
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 border border-emerald-100 relative overflow-hidden">

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

                        {pickupData.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xl text-gray-500 font-medium">
                                    No pickup history found.
                                </p>
                                <p className="text-gray-400 mt-2">
                                    Schedule your first pickup to get started!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pickupData.map((pickup, index) => (
                                    <div
                                        key={pickup._id}
                                        className="border-2 border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-white to-gray-50 hover:border-emerald-200"
                                    >
                                        {/* Left */}
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                {pickupData.length - index}
                                            </div>

                                            <div>
                                                <p className="text-xl font-bold text-gray-800 mb-1">
                                                    {pickup.wasteType}
                                                </p>
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span className="font-medium">
                                                        {pickup.date} at {pickup.time}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                                        pickup.status === "Completed"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : pickup.status === "Cancelled"
                                                            ? "bg-rose-100 text-rose-700"
                                                            : "bg-amber-100 text-amber-700"
                                                    }`}
                                                >
                                                    {pickup.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        {pickup.status === "Scheduled" && (
                                            <div className="flex gap-3 sm:flex-col lg:flex-row">
                                                <button
                                                    onClick={() =>
                                                        navigate("/schedule-pickup", {
                                                            state: { pickup },
                                                        })
                                                    }
                                                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                                                >
                                                    Reschedule
                                                </button>

                                                <button
                                                    onClick={() => handleCancel(pickup)}
                                                    className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

          
            <AppSidebar />
        </>
    );
}

export default PickupHistory;
