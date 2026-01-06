

import React, { useState, useEffect, useRef } from "react";
import AppSidebar from "../Components/AppSideBar";
import axios from "axios";
import { toast } from 'react-toastify';

function Complaints() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);


  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.username,
        email: storedUser.email,
      });
    }
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser || !storedUser._id) {
      toast.error("User not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", storedUser._id);
    formData.append("userName", user.name);
    formData.append("email", user.email);
    formData.append("subject", subject);
    formData.append("message", message);
    if (image) formData.append("image", image);

    try {

      const response = await axios.post(
        "https://waste-management-2-xsa0.onrender.com/api/complaints/add",
        formData
      );

      toast.success("Complaint submitted successfully!");
      setSubject("");
      setMessage("");
      setImage(null);
      setPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(error.response?.data?.message || "Error submitting complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20">
      {/* Main content */}
      <main className="p-4 md:p-8 max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Submit a Complaint
          </h1>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 border border-indigo-100 relative overflow-hidden"
        >
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-6 mt-2">


            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 hover:border-indigo-300 bg-gray-50 focus:bg-white"
                required
              />
            </div>


            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your complaint here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 hover:border-indigo-300 resize-none bg-gray-50 focus:bg-white"
                required
              ></textarea>
            </div>


            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Attach Image (optional)
              </label>

              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative inline-block w-full">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-48 object-cover rounded-xl border-2 border-indigo-200 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Submit Complaint</span>
              </button>
            </div>
          </div>
        </form>
      </main>


      <AppSidebar />
    </div>
  );
}

export default Complaints;