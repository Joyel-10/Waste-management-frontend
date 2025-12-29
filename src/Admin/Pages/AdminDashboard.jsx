import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AdSideBar";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
       const token = sessionStorage.getItem("adminToken");


        const res = await fetch("https://waste-management-2-xsa0.onrender.com/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized or server error");

        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        setStats(data.stats);
        setActivities(data.recentActivities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card title="Total Users" value={stats.totalUsers} />
          <Card title="Active Complaints" value={stats.activeComplaints} />
          <Card title="Payments Today" value={`₹${stats.paymentsToday}`} />
          <Card title="Resolved Issues" value={stats.resolvedIssues} />
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={i} className="border-t">
                  <td>{a.date}</td>
                  <td>{a.user}</td>
                  <td>{a.action}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        a.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <AppSidebar />
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
