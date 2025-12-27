
import React, { useState, useEffect } from "react";
import axios from "axios";
import AppSidebar from "../Components/AdSideBar";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiUsers,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("Active");


  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    fetchUsers();
 
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/admin/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
      setLoading(false);
      setError("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load users");
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status || "Active");
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `${API_URL}/api/admin/update-user/${selectedUser._id}`,
        {
          name: editName,
          email: editEmail,
          role: editRole,
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowEditModal(false);
      fetchUsers();
      showToast("User updated successfully!", "success");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to update user",
        "error"
      );
    }
  };

  const deleteUserFromDB = async () => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/delete-user/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowDeleteModal(false);
      fetchUsers();
      showToast("User deleted successfully!", "success");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete user",
        "error"
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase()) ||
      user.role?.toLowerCase().includes(query.toLowerCase());
    
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus = filterStatus === "All" || (user.status || "Active") === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => (u.status || "Active") === "Active").length,
    inactive: users.filter(u => u.status === "Inactive").length,
    admins: users.filter(u => u.role === "Admin").length,
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AppSidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <FiUsers className="text-white" size={28} />
            </div>
            Manage Users
          </h1>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500 hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500 hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">Inactive</p>
            <p className="text-3xl font-bold text-red-600 mt-1">{stats.inactive}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500 hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">Admins</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">{stats.admins}</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

           
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-2 font-medium shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <FiAlertCircle className="text-red-500" size={24} />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <FiUsers className="mx-auto mb-3 text-gray-300" size={48} />
                        <p className="font-medium">No users found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "Admin"
                                ? "bg-purple-100 text-purple-700 ring-1 ring-purple-200"
                                : "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              (user.status || "Active") === "Active"
                                ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                                : "bg-red-100 text-red-700 ring-1 ring-red-200"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                              (user.status || "Active") === "Active" ? "bg-green-500" : "bg-red-500"
                            }`}></span>
                            {user.status || "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleView(user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all hover:scale-110"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all hover:scale-110"
                              title="Edit User"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                              title="Delete User"
                            >
                              <FiTrash2 size={18} />
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
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed top-6 right-6 p-4 rounded-xl shadow-2xl ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            } text-white flex items-center gap-3 z-50 animate-slide-in min-w-[300px]`}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FiCheckCircle size={20} />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FiAlertCircle size={20} />
                </div>
              )}
            </div>
            <span className="font-medium">{toast.message}</span>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiEye />
                  User Details
                </h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {selectedUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                    <p className="text-gray-500">@{selectedUser.username}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium mb-1">Email Address</p>
                    <p className="font-medium text-gray-800">{selectedUser.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">Role</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
                          selectedUser.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">Status</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
                          (selectedUser.status || "Active") === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedUser.status || "Active"}
                      </span>
                    </div>
                  </div>
                  {selectedUser.bio && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">Bio</p>
                      <p className="text-sm text-gray-700">{selectedUser.bio}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold transition text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiEdit />
                  Edit User
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition cursor-pointer"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold transition text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUser}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiTrash2 />
                  Delete User
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-100">
                  <p className="text-red-800 font-medium mb-2"> Warning: This action cannot be undone</p>
                  <p className="text-red-600 text-sm">
                    All data associated with this user will be permanently deleted.
                  </p>
                </div>
                <p className="text-gray-700 text-center">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-gray-900">{selectedUser.name}</span>?
                </p>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold transition text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUserFromDB}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminManageUsers;