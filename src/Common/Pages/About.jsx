


import React from 'react'
import { FaLeaf, FaRecycle, FaHandsHelping } from "react-icons/fa";

function About() {

    return (
        <>
            <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

                <div className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h2 className="text-green-600 text-lg sm:text-xl font-bold mb-3 tracking-wide uppercase">
                            Who We Are
                        </h2>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Building a Cleaner and <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Greener Tomorrow</span>
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            At <span className="font-bold text-green-700">EcoSync</span>, our mission
                            is to redefine waste management by promoting sustainability,
                            innovation, and community collaboration. Together, we turn waste into
                            opportunity.
                        </p>
                    </div>

                    {/* Mission / Vision / Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-7xl mx-auto">
                        {/* Mission */}
                        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all p-10 duration-500 text-center flex flex-col items-center relative overflow-hidden border border-green-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <FaLeaf className="text-green-700 text-5xl" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                                    Our Mission
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    To revolutionize waste disposal by using technology and education to
                                    create eco-friendly communities and reduce environmental impact.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all p-10 duration-500 text-center flex flex-col items-center relative overflow-hidden border border-green-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <FaRecycle className="text-green-700 text-5xl" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                                    Our Vision
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    A world where waste is no longer wasted — but recycled, reused, and
                                    repurposed for a cleaner planet and healthier future.
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-10 text-center flex flex-col items-center relative overflow-hidden border border-green-100 sm:col-span-2 lg:col-span-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="bg-gradient-to-br from-teal-100 to-green-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <FaHandsHelping className="text-green-700 text-5xl" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                                    Our Values
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    We value integrity, sustainability, and teamwork. Every action we
                                    take aims to build a responsible and cleaner environment for all.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <button className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 sm:px-12 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                            <span className="relative z-10">Learn More About Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About