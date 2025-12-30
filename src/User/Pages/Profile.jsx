import React, { useState, useEffect, useRef } from "react";
import AppSidebar from "../Components/AppSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



function Profile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", profileImage: "", _id: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) navigate("/login");
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://waste-management-2-xsa0.onrender.com/api/profile/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  useEffect(() => {
    if (!selectedImage) return;
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedImage(e.target.files[0]);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    if (selectedImage) formData.append("profileImage", selectedImage);

    try {
      const res = await axios.put(`https://waste-management-2-xsa0.onrender.com/api/profile/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      setSelectedImage(null);
      setPreview(null);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
       toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pb-24">

      {/* Page Content */}
      <main className="p-6 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg space-y-8 border border-gray-100 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
            <p className="text-gray-500 text-sm">Manage your personal information</p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              <img
                src={
                  preview
                    ? preview
                    : user.profileImage
                      ? `https://waste-management-2-xsa0.onrender.com/Uploads/profiles/${user.profileImage}`
                      : "https://via.placeholder.com/120"
                }
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-blue-100 transition-transform duration-300 group-hover:scale-105"
               
              />

              {preview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 font-bold text-sm"
                >
                  ×
                </button>
              )}
            </div>

            <label className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full font-medium cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Inputs */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Update Profile
          </button>
        </form>
      </main>

      {/* Bottom Sidebar */}
      <AppSidebar />
    </div>
  );
}

export default Profile;
