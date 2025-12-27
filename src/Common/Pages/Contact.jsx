import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoIosSend } from 'react-icons/io';



function Contact() {



    return (
        <>
            <div className="w-full px-6 py-12 bg-emerald-100">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center mb-4">Contacts</h2>
                <p className="w-full text-center mx-auto text-gray-600 mb-10">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio ipsam molestiae, maxime obcaecati ea, excepturi tempora magnam ab consectetur, dicta eius impedit vero temporibus aliquam harum minus. Quibusdam assumenda deleniti, temporibus omnis eum non beatae minima nam? Molestias veniam quam quas itaque, fuga delectus alias at, voluptatum tempora aspernatur ea!
                </p>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-12">

                    {/* Address */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 shadow-sm">
                            <FaMapMarkerAlt className="text-black-100 text-xl" />
                        </div>
                        <p className="text-gray-700 font-medium">
                            Add New Hyde Park, NY 1040 <br /> 91234
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 shadow-sm">
                            <FaPhoneAlt className="text-black-100 text-xl" />
                        </div>
                        <p className="text-gray-700 font-medium">+91 7736975914</p>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 shadow-sm">
                            <FaEnvelope className="text-black-100 text-xl" />
                        </div>
                        <p className="text-gray-700 font-medium">ecosync@gmail.com</p>
                    </div>

                </div>

                {/* Form + Map */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <form className="bg-gray-200 shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">
                            Send me Message
                        </h3>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="email"
                            placeholder="Email Id"
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <textarea
                            placeholder="Message"
                            rows="4"
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition cursor-pointer"
                        >
                            Send <span><IoIosSend /></span>
                        </button>
                    </form>

                    {/* Google Map */}
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.049493889318!2d76.35892051478222!3d10.01586029283837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d03bdb2570f%3A0x2b6a087ab5a2a90!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1677419949373!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            className="h-[350px] w-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Contact