
import React, { useEffect, useState } from "react";
import AppSidebar from "../Components/AdSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiShield,
  FiEdit2,
  FiSave,
  FiX,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "https://waste-management-2-xsa0.onrender.com";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    const fetchAdminProfile = async () => {
     
      const token = sessionStorage.getItem("adminToken");
      
      console.log(" Checking token:", token ? "Found " : "Not found ");

      if (!token) {
        console.log(" No token found, redirecting to login");
        setError("No authentication token found. Please login.");
        setLoading(false);
        setTimeout(() => navigate("/admin-login"), 2000);
        return;
      }

      try {
        console.log(" Fetching profile from API...");
        
        const res = await axios.get(`${API_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(" Profile loaded successfully");
        setAdmin(res.data.admin);
        setError(null);
      } catch (err) {
        console.error(" Error fetching admin profile:", err.response?.data || err.message);
        
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          sessionStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminData");
          setTimeout(() => navigate("/admin-login"), 2000);
        } else {
          setError(err.response?.data?.message || "Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("adminToken");
    
    try {
      const res = await axios.put(
        `${API_URL}/api/admin/profile`,
        { name: admin.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmin(res.data.admin);
      showToast("Profile updated successfully!", "success");
      setEditMode(false);
      
     
      const storedData = JSON.parse(sessionStorage.getItem("adminData") || "{}");
      sessionStorage.setItem("adminData", JSON.stringify({...storedData, name: res.data.admin.name}));
    } catch (err) {
      console.error("Update error:", err);
      showToast(err.response?.data?.message || "Failed to update profile", "error");
    }
  };

  const handleCancel = async () => {
    setEditMode(false);
    const token = sessionStorage.getItem("adminToken");
    
    try {
      const res = await axios.get(`${API_URL}/api/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(res.data.admin);
    } catch (err) {
      console.error("Error resetting profile:", err);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Error</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate("/admin-login")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-center text-red-500 text-xl font-semibold">Admin not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AppSidebar />

      <main className="flex-1 p-8">
    
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FiUser className="text-white" size={28} />
              </div>
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          
       
        </div>

      
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-center relative">
              <div className="absolute top-4 right-4">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition backdrop-blur-sm"
                  >
                    <FiEdit2 size={16} />
                    Edit Profile
                  </button>
                ) : null}
              </div>
              
              <div className="h-24 w-24 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl shadow-lg mb-4">
                {admin.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{admin.name}</h2>
              <p className="text-blue-100">{admin.email}</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <FiUser className="text-blue-500" />
                  Full Name
                </label>
                <input
                  name="name"
                  value={admin.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                    editMode
                      ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                      : "bg-gray-50 border-gray-200 cursor-not-allowed"
                  } focus:outline-none`}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <FiMail className="text-blue-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    value={admin.email || ""}
                    disabled
                    className="w-full px-4 py-3 border-2 rounded-xl bg-gray-50 border-gray-200 cursor-not-allowed text-gray-600"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md font-medium">
                    Cannot be changed
                  </span>
                </div>
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <FiShield className="text-blue-500" />
                  Role
                </label>
                <div className="flex items-center gap-3">
                  <input
                    value={admin.role || "admin"}
                    disabled
                    className="flex-1 px-4 py-3 border-2 rounded-xl bg-gray-50 border-gray-200 cursor-not-allowed text-gray-600 capitalize"
                  />
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-700 ring-1 ring-purple-200">
                    <FiShield className="mr-2" size={16} />
                    Administrator
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {editMode && (
                <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
                  >
                    <FiSave size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
                  >
                    <FiX size={20} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="bg-blue-50 px-8 py-4 border-t border-blue-100">
              <p className="text-sm text-blue-600">
                <FiAlertCircle className="inline mr-2" />
                Your email address is used for authentication and cannot be modified.
              </p>
            </div>
          </div>

          {/* Additional Info Card */}
          {/* <div className="mt-6 bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Account ID</p>
                <p className="text-sm text-gray-700 font-mono break-all">{admin._id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Account Type</p>
                <p className="text-sm text-gray-700 font-semibold capitalize">{admin.role} Account</p>
              </div>
            </div>
          </div> */}
        </div>

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
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminProfile;