import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AdSideBar";
import axios from "axios";
import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiTrash2,
  FiMessageSquare,
  FiClock,
  FiAlertCircle,
  FiX,
  FiFilter
} from "react-icons/fi";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: "",
    adminRemarks: "",
  });


  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "https://waste-management-2-xsa0.onrender.com/api/complaints/all"
      );
      setComplaints(res.data.complaints);
      setFiltered(res.data.complaints);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    let result = complaints;

    if (filterStatus !== "all") {
      result = result.filter((c) => c.status === filterStatus);
    }

    if (search) {
      const text = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.userName?.toLowerCase().includes(text) ||
          c.email?.toLowerCase().includes(text) ||
          c.subject?.toLowerCase().includes(text) ||
          c.message?.toLowerCase().includes(text)
      );
    }

    setFiltered(result);
  }, [search, complaints, filterStatus]);


  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      await axios.delete(
        `https://waste-management-2-xsa0.onrender.com/api/complaints/delete/${id}`
      );
      setComplaints(complaints.filter((c) => c._id !== id));
      toast.success("Complaint deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };


  const handleUpdateComplaint = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://waste-management-2-xsa0.onrender.com/api/complaints/update/${selectedComplaint._id}`,
        updateData
      );

      setComplaints(
        complaints.map((c) =>
          c._id === selectedComplaint._id
            ? { ...c, ...updateData }
            : c
        )
      );

      setShowUpdateModal(false);
      setSelectedComplaint(null);
      toast.success("Complaint updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };


  const getStatusColor = (status) => {
    if (status === "pending") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (status === "in-review") return "bg-blue-50 text-blue-700 border-blue-200";
    if (status === "resolved") return "bg-green-50 text-green-700 border-green-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-50 text-red-700 border-red-200";
    if (priority === "medium") return "bg-orange-50 text-orange-700 border-orange-200";
    if (priority === "low") return "bg-green-50 text-green-700 border-green-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusIcon = (status) => {
    if (status === "pending") return <FiClock className="w-3 h-3" />;
    if (status === "in-review") return <FiAlertCircle className="w-3 h-3" />;
    if (status === "resolved") return <FiCheckCircle className="w-3 h-3" />;
    return null;
  };

  const getStats = () => {
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === "pending").length,
      inReview: complaints.filter(c => c.status === "in-review").length,
      resolved: complaints.filter(c => c.status === "resolved").length,
    };
  };

  const stats = getStats();



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading complaints...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/20">
              <FiMessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Complaints Management</h1>
              <p className="text-gray-600 text-sm mt-1">Manage and respond to user complaints</p>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FiMessageSquare className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inReview}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiAlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[180px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-review">In Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FiMessageSquare className="w-12 h-12 mb-3" />
                        <p className="text-lg font-medium">No complaints found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                            {c.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{c.userName}</p>
                            <p className="text-sm text-gray-500">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-800 font-medium">{c.subject}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${getPriorityColor(c.priority)}`}>
                          {c.priority?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusColor(c.status)}`}>
                          {getStatusIcon(c.status)}
                          {c.status?.replace("-", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedComplaint(c);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedComplaint(c);
                              setShowUpdateModal(true);
                              setUpdateData({
                                status: c.status,
                                adminRemarks: c.adminRemarks || "",
                              });
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Update Status"
                          >
                            <FiCheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteComplaint(c._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AppSidebar />

      {/* DETAIL MODAL */}
      {showDetailModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">Complaint Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">User Name</label>
                  <p className="mt-1 text-gray-800 font-medium">{selectedComplaint.userName}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email</label>
                  <p className="mt-1 text-gray-800 font-medium">{selectedComplaint.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Priority</label>
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusColor(selectedComplaint.status)}`}>
                      {getStatusIcon(selectedComplaint.status)}
                      {selectedComplaint.status?.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Subject</label>
                <p className="mt-2 text-gray-800 font-medium text-lg">{selectedComplaint.subject}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Message</label>
                <p className="mt-2 text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">{selectedComplaint.message}</p>
              </div>

              {/* 
              {selectedComplaint.adminRemarks && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Admin Remarks</label>
                  <p className="mt-2 text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg border border-green-200">{selectedComplaint.adminRemarks}</p>
                </div>
              )} */}

              {/* USER UPLOADED IMAGE */}
              {/* {selectedComplaint.image && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Uploaded Image
                  </label>

                  <div className="mt-3">
                    <img
                      src={`https://waste-management-2-xsa0.onrender.com${selectedComplaint.image}`}
                      alt="Complaint"
                      className="max-w-full h-auto rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition"
                      onClick={() =>
                        window.open(
                          `https://waste-management-2-xsa0.onrender.com${selectedComplaint.image}`,
                          "_blank"
                        )
                      }
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Click image to view full size
                    </p>
                  </div>
                </div>
              )} */}

              {selectedComplaint.image && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Uploaded Image
                  </label>

                  <img
                    src={`https://waste-management-2-xsa0.onrender.com${selectedComplaint.image}`}
                    alt="Complaint"
                    className="mt-3 max-h-64 rounded-lg border border-gray-200 object-contain"
                  />
                </div>
              )}


            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdateModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateComplaint}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Update Complaint</h2>
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Status
                </label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Admin Remarks
                </label>
                <textarea
                  placeholder="Add your remarks here..."
                  value={updateData.adminRemarks}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      adminRemarks: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminComplaints;