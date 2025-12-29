import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AppSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || {});
    const [notifications, setNotifications] = useState([]);
    const [nextPickup, setNextPickup] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [wasteBreakdown, setWasteBreakdown] = useState([]);
    const [complaintsCount, setComplaintsCount] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");

        if (!token || !userId) {
            navigate("/login");
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(
                    `https://waste-management-2-xsa0.onrender.com/api/user/dashboard/${userId}`
                );

                if (res.data.user) setUser(res.data.user);
                if (res.data.notifications) setNotifications(res.data.notifications);
                if (res.data.nextPickup) setNextPickup(res.data.nextPickup);
                if (res.data.monthlyWasteData) setMonthlyData(res.data.monthlyWasteData);
                if (res.data.wasteBreakdown) setWasteBreakdown(res.data.wasteBreakdown);
                if (res.data.complaintsCount)
                    setComplaintsCount(res.data.complaintsCount);
            } catch (err) {
                console.error("Dashboard Fetch Failed:", err);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    return (
        <>
            {/* MAIN PAGE CONTENT */}
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-24 p-4 md:p-8">

               
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent mb-2">
                        Welcome back, {user?.username || "User"} 
                    </h1>
                    <p className="text-gray-600">
                        Here's what's happening with your waste management today
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {/* Next Pickup */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl rounded-2xl p-6 sm:col-span-2">
                        <p className="text-emerald-100 text-sm">Next Pickup</p>
                        <h2 className="text-3xl font-bold mt-2">
                            {nextPickup?.date || "No upcoming pickup"}
                        </h2>
                        <p className="text-emerald-100 font-medium mt-1 text-lg">
                            {nextPickup?.type || ""}
                        </p>
                    </div>

                    {/* This Month */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <p className="text-gray-500 text-sm">This Month</p>
                        <h2 className="text-3xl font-bold mt-2">
                            {monthlyData?.length || 0}
                            <span className="text-lg ml-1 text-gray-500">Pickups</span>
                        </h2>
                        <button className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-xl">
                            Pay Now
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="font-semibold mb-3">Notifications</h2>
                        <ul className="space-y-2 text-sm text-gray-700 max-h-24 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((n, i) => (
                                    <li key={i} className="p-2 bg-gray-50 rounded">
                                        {n.message}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 italic">No notifications</li>
                            )}
                        </ul>
                    </div>

                    {/* Complaints */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <p className="text-gray-500 text-sm">Complaints</p>
                        <h2 className="text-3xl font-bold mt-2">{complaintsCount}</h2>
                    </div>

                    {/* Upcoming Pickup */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <p className="text-gray-500 text-sm">Upcoming Pickup</p>
                        <h2 className="text-lg font-semibold mt-2">
                            {nextPickup ? nextPickup.date : "No upcoming pickup"}
                        </h2>
                        <p className="text-emerald-600 font-semibold text-sm">
                            {nextPickup?.time || ""} • {nextPickup?.type || ""}
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="font-semibold mb-4">Quick Actions</h2>
                        <div className="flex flex-col space-y-3">
                            <button
                                className="bg-gray-900 text-white py-3 rounded-xl"
                                onClick={() => navigate("/schedule-pickup")}
                            >
                                Schedule Pickup
                            </button>

                            <button
                                className="bg-gray-200 py-3 rounded-xl"
                                onClick={() => navigate("/complaints")}
                            >
                                Raise Complaint
                            </button>

                            <button
                                className="bg-gray-200 py-3 rounded-xl"
                                onClick={() => navigate("/profile")}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>

                    {/* Waste Breakdown */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1 sm:col-span-2">
                        <h2 className="font-semibold mb-4">Waste Breakdown</h2>

                        <div className="flex justify-center">
                            <PieChart
                                className="w-48 h-48"
                                data={
                                    wasteBreakdown.length > 0
                                        ? wasteBreakdown
                                        : [
                                              { title: "Organic", value: 0, color: "#10b981" },
                                              { title: "Plastic", value: 0, color: "#3b82f6" },
                                              { title: "Metal", value: 0, color: "#f59e0b" },
                                          ]
                                }
                                lineWidth={60}
                                animate
                            />
                        </div>
                    </div>

                    {/* Monthly Trend */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1 sm:col-span-2">
                        <h2 className="font-semibold mb-4">Monthly Waste Trend</h2>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="waste" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* FIXED BOTTOM NAV */}
            <AppSidebar />
        </>
    );
};

export default Dashboard;
