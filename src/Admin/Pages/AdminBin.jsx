import React from "react";
import AppSidebar from "../Components/AdSideBar"; // Bottom navigation
import { FiSearch, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

function AdminBin() {
    const bins = [
        { id: 1, location: "Sector 21", type: "Plastic", status: "Full" },
        { id: 2, location: "Sector 12", type: "Organic", status: "Empty" },
        { id: 3, location: "Sector 5", type: "Metal", status: "Full" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Bin Management</h1>
                        <p className="text-sm text-gray-500 mt-1">View, edit, or remove bins</p>
                    </div>
                    <div className="w-full md:w-80">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search bins..."
                                className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Table (desktop only) */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bins.map((bin) => (
                                    <tr key={bin.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-700">{bin.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{bin.location}</td>
                                        <td className="px-6 py-4 text-gray-700">{bin.type}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    bin.status === "Full"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {bin.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100" title="View"><FiEye /></button>
                                                <button className="p-2 bg-yellow-50 text-yellow-600 rounded-md hover:bg-yellow-100" title="Edit"><FiEdit /></button>
                                                <button className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100" title="Delete"><FiTrash2 /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden mt-6 space-y-4">
                    {bins.map((bin) => (
                        <div key={bin.id} className="bg-white shadow rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{bin.location}</h3>
                                    <p className="text-xs text-gray-500 mt-1"><strong>Type:</strong> {bin.type}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${bin.status === "Full" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{bin.status}</span>
                            </div>
                            <div className="mt-3 flex justify-end gap-2">
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-md"><FiEye /></button>
                                <button className="p-2 bg-yellow-50 text-yellow-600 rounded-md"><FiEdit /></button>
                                <button className="p-2 bg-red-50 text-red-600 rounded-md"><FiTrash2 /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Sidebar / Navigation */}
            <AppSidebar />
        </div>
    );
}

export default AdminBin;
