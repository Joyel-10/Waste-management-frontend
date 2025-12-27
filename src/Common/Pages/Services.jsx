
import React from 'react'
import {
    FaHome,
    FaIndustry,
    FaBatteryFull,
    FaLeaf,
    FaFlask,
    FaRecycle,
} from "react-icons/fa";

function Services() {

    const services = [
        {
            id: 1,
            title: "Household Waste Management",
            icon: <FaHome className="text-green-600 text-5xl mb-4" />,
            description:
                "We provide door-to-door waste collection services ensuring proper segregation and recycling of household waste for a cleaner, greener environment.",
        },
        {
            id: 2,
            title: "Industrial Waste Disposal",
            icon: <FaIndustry className="text-green-600 text-5xl mb-4" />,
            description:
                "Safe and sustainable handling of industrial waste, minimizing pollution and maximizing recycling through advanced treatment facilities.",
        },
        {
            id: 3,
            title: "E-Waste Recycling",
            icon: <FaBatteryFull className="text-green-600 text-5xl mb-4" />,
            description:
                "We collect and recycle discarded electronics responsibly, recovering valuable materials while preventing harmful toxins from entering landfills.",
        },
        {
            id: 4,
            title: "Organic Waste & Composting",
            icon: <FaLeaf className="text-green-600 text-5xl mb-4" />,
            description:
                "Convert organic waste into nutrient-rich compost to promote sustainable gardening and soil health through eco-friendly composting methods.",
        },
        {
            id: 5,
            title: "Medical Waste Management",
            icon: <FaFlask className="text-green-600 text-5xl mb-4" />,
            description:
                "Safe and compliant disposal of biohazardous and clinical waste, following government safety standards and eco-conscious methods.",
        },
        {
            id: 6,
            title: "Recycling & Resource Recovery",
            icon: <FaRecycle className="text-green-600 text-5xl mb-4" />,
            description:
                "Our recycling programs focus on reusing materials and reducing landfill waste, contributing to a sustainable circular economy.",
        },
    ];
    return (
        <>
            <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-emerald-100">
                {/* Header */}
                <div className="text-center mb-12">
                    <h4 className="text-green-700 text-lg sm:text-xl font-semibold mb-2">
                        Our Services
                    </h4>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Types of Waste Management Services
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                        At <span className="font-semibold text-green-700">EcoSync</span>, we
                        are committed to delivering efficient, safe, and eco-friendly waste
                        management solutions across various sectors.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center flex flex-col items-center"
                        >
                            {service.icon}
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <button className="bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-all duration-300">
                        Learn More
                    </button>
                </div>
            </section>

        </>
    )
}

export default Services