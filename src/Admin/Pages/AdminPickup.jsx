import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AdSideBar";
import axios from "axios";
import { FiSearch, FiEdit, FiTrash2, FiEye, FiX, FiCalendar, FiClock, FiPackage, FiDollarSign, FiUser, FiMail, FiAlertTriangle } from "react-icons/fi";

const BASE = "https://waste-management-2-xsa0.onrender.com/api/pickup";


function AdminPickup() {
  const [pickups, setPickups] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);


  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;


  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);


  const fetchPickups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/all`);

      if (res.data && res.data.success && Array.isArray(res.data.pickups)) {
        const sorted = res.data.pickups.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPickups(sorted);
      } else {
        setPickups([]);
      }
    } catch (error) {
      console.error("Error fetching pickups:", error);
      setPickups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);


  useEffect(() => {
    let arr = [...pickups];
    const lower = search.toLowerCase();

    if (statusFilter !== "All") {
      arr = arr.filter((p) => p.status === statusFilter);
    }

    if (search.trim() !== "") {
      arr = arr.filter((p) => {
        const uname =
          p.user?.name ||
          p.userId?.name ||
          p.userId?.username ||
          "unknown";

        return (
          uname.toLowerCase().includes(lower) ||
          p.wasteType?.toLowerCase().includes(lower) ||
          p.paymentMethod?.toLowerCase().includes(lower) ||
          p.status?.toLowerCase().includes(lower)
        );
      });
    }

    setFiltered(arr);
    setPage(1);
  }, [search, statusFilter, pickups]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  const openView = async (id) => {
    try {
      const res = await axios.get(`${BASE}/${id}`);
      const pickup = res.data.pickup || res.data;
      setViewing(pickup);
    } catch (err) {
      console.error("View error:", err);
      alert("Failed to load pickup details.");
    }
  };

  const closeView = () => setViewing(null);


  const openEdit = async (id) => {
    try {
      const res = await axios.get(`${BASE}/${id}`);
      const p = res.data.pickup || res.data;

      setEditing({
        _id: p._id,
        date: p.date || "",
        time: p.time || "",
        wasteType: p.wasteType || "",
        price: p.price || 0,
        paymentMethod: p.paymentMethod || "Cash on Pickup",
        paymentDetails: p.paymentDetails || {},
      });
    } catch (err) {
      console.error("Edit fetch error:", err);
      alert("Failed to load pickup for editing.");
    }
  };

  const closeEdit = () => setEditing(null);

  const saveEdit = async () => {
    try {
      const id = editing._id;
      const payload = {
        date: editing.date,
        time: editing.time,
        wasteType: editing.wasteType,
        price: editing.price,
        paymentMethod: editing.paymentMethod,
        paymentDetails: editing.paymentDetails,
      };

      const res = await axios.put(`${BASE}/${id}`, payload);

      if (res.data.success) {
        toast.success("Pickup updated successfully.");
        closeEdit();
        fetchPickups();
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      console.error("Save edit error:", err);
      toast.error("Failed to update pickup.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`${BASE}/${id}`, { status: newStatus });

      if (res.data.success) {
        fetchPickups();
        toast.success("Status updated successfully.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status.");
    }
  };

  const openDeleteModal = (pickup) => {
    setDeleting(pickup);
  };

  const closeDeleteModal = () => {
    setDeleting(null);
  };

  // const deletePickup = async () => {
  //   try {
  //     // const res = await axios.delete(`${BASE}/${deleting._id}`);
  //     await axios.delete(`${BASE}/admin/${deleting._id}`);

  //     if (res.data.success) {
  //       toast.success("Pickup deleted successfully.");
  //       closeDeleteModal();
  //       fetchPickups();
  //     }
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //     toast.error("Failed to delete pickup.");
  //   }
  // };

  const deletePickup = async () => {
    const id = deleting?._id;
    console.log("🗑️ DELETE CLICKED - ID:", id);

    if (!id) {
      console.log("❌ No ID found");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");
      console.log("🔑 Token found:", token ? "YES" : "NO");

      if (!token) {
        toast.error("Admin login required");
        closeDeleteModal();
        return;
      }

      // Show loading state
      toast.info("Deleting pickup...");

      // Close modal immediately for better UX
      closeDeleteModal();

      console.log("📡 Making DELETE request to:", `${BASE}/admin/${id}`);

      // Make the API call
      const response = await axios.delete(
        `${BASE}/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ DELETE Response:", response.data);

      // Only update state after successful deletion
      if (response.data.success) {
        toast.success("Pickup deleted successfully");
        console.log("✅ Removing from state...");

        // Update state immediately for instant UI feedback
        setPickups(prev => {
          const newPickups = prev.filter(p => p._id !== id);
          console.log("📊 Pickups before:", prev.length, "After:", newPickups.length);
          return newPickups;
        });
      } else {
        console.log("❌ Response success = false");
        toast.error("Failed to delete pickup");
      }

    } catch (err) {
      console.error("❌ DELETE ERROR Full:", err);
      console.error("❌ DELETE ERROR Response:", err.response);
      console.error("❌ DELETE ERROR Status:", err.response?.status);
      console.error("❌ DELETE ERROR Data:", err.response?.data);

      // More specific error messages
      if (err.response?.status === 404) {
        toast.error("Pickup not found or already deleted");
        console.log("🔄 Removing from state anyway (404)");
        // Still remove from local state if it's a 404
        setPickups(prev => prev.filter(p => p._id !== id));
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(err.response?.data?.message || "Failed to delete pickup");
      }
    }
  };



  const badge = (s) => {
    if (s === "Scheduled") return "bg-blue-100 text-blue-700 border border-blue-200";
    if (s === "Cancelled") return "bg-red-100 text-red-700 border border-red-200";
    return "bg-green-100 text-green-700 border border-green-200";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Pickup Management
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Manage all user pickup requests
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{pickups.length}</div>
                <div className="text-xs text-gray-500 mt-1">Total</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">
                  {pickups.filter(p => p.status === "Scheduled").length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Scheduled</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="text-2xl font-bold text-green-600">
                  {pickups.filter(p => p.status === "Completed").length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search by user, waste type, payment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium text-gray-700 min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading pickups...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-gray-400 text-5xl mb-4">📦</div>
                        <p className="text-gray-600 font-medium">No pickups found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {(p.user?.name || p.userId?.name || p.userId?.username || "U")[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {p.user?.name || p.userId?.name || p.userId?.username || "Unknown"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {p.user?.email || p.userId?.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <FiCalendar className="text-gray-400" />
                              {p.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FiClock className="text-gray-400" />
                              {p.time}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                            <FiPackage className="text-gray-500" />
                            {p.wasteType}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-gray-900">₹{p.price}</span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${badge(p.status)}`}>
                            {p.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openView(p._id)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                              title="View Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => openEdit(p._id)}
                              className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => openDeleteModal(p)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>

                            {p.status !== "Completed" && (
                              <button
                                onClick={() => updateStatus(p._id, "Completed")}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-bold"
                                title="Mark Complete"
                              >
                                ✓
                              </button>
                            )}

                            {p.status !== "Cancelled" && (
                              <button
                                onClick={() => updateStatus(p._id, "Cancelled")}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-bold"
                                title="Cancel"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {pageItems.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium text-gray-900">{(page - 1) * PAGE_SIZE + 1}</span> to{" "}
                  <span className="font-medium text-gray-900">{Math.min(page * PAGE_SIZE, filtered.length)}</span> of{" "}
                  <span className="font-medium text-gray-900">{filtered.length}</span> results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </button>

                  <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200">
                    {page} / {totalPages}
                  </div>

                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODAL - COMPACT */}
        {viewing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-t-xl flex items-center justify-between">
                <h2 className="text-lg font-bold">Pickup Details</h2>
                <button
                  onClick={closeView}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">User</div>
                    <div className="font-semibold text-sm text-gray-900">
                      {viewing.user?.name || viewing.userId?.name || viewing.userId?.username}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="text-sm text-gray-900 truncate">
                      {viewing.user?.email || viewing.userId?.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-blue-600 mb-1">
                      <FiCalendar className="w-3 h-3" />
                      <span className="text-xs font-semibold">Date</span>
                    </div>
                    <div className="font-bold text-sm text-gray-900">{viewing.date}</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-purple-600 mb-1">
                      <FiClock className="w-3 h-3" />
                      <span className="text-xs font-semibold">Time</span>
                    </div>
                    <div className="font-bold text-sm text-gray-900">{viewing.time}</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-green-600 mb-1">
                    <FiPackage className="w-3 h-3" />
                    <span className="text-xs font-semibold">Waste Type</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">{viewing.wasteType}</div>
                </div>

                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-amber-600 mb-1">
                    <FiDollarSign className="w-3 h-3" />
                    <span className="text-xs font-semibold">Price</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">₹{viewing.price}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-2">Payment Details</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-semibold text-gray-900">{viewing.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${viewing.paymentStatus === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                        {viewing.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-gray-50 rounded-b-xl">
                <button
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  onClick={closeView}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Pickup</h2>
                <button
                  onClick={closeEdit}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={editing.time}
                    onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Waste Type</label>
                  <input
                    type="text"
                    value={editing.wasteType}
                    onChange={(e) => setEditing({ ...editing, wasteType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Plastic, Organic, E-waste"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
                <button
                  onClick={closeEdit}
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-500/30"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleting && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAlertTriangle className="w-6 h-6 text-red-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Pickup?
                </h2>

                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this pickup request? This action cannot be undone.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User:</span>
                      <span className="font-semibold text-gray-900">
                        {deleting.user?.name || deleting.userId?.name || deleting.userId?.username}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-900">{deleting.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waste Type:</span>
                      <span className="font-semibold text-gray-900">{deleting.wasteType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-gray-900">₹{deleting.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deletePickup}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30"
                  >
                    Delete Pickup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <AppSidebar />
    </div>
  );
}

export default AdminPickup;