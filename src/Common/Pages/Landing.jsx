


import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRecycle, faTruck } from "@fortawesome/free-solid-svg-icons";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function CustomCarousel() {
  const images = ["/T-1.jpg", "/T-2.png", "/T-3.png", "/T-4.png"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const byPrefixAndName = {
    fass: {
      recycle: faRecycle,
      truck: faTruck,
      users: faUsers,
    },
  };

  const testimonials = [
    {
      name: "Bradly Cooper",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "The waste collection service is reliable and always on time. It has made managing our household waste so much easier. I appreciate the eco-friendly approach!",
    },
    {
      name: "Scarlet David",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Very user-friendly platform! Scheduling pickups takes less than a minute, and I always get notified when the truck is nearby. Highly recommended!",
    },
    {
      name: "Johnny Dolph",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      text: "The app is smooth, responsive, and makes scheduling pickups effortless. EcoSync really makes waste management simple.",
    },
  ];

  return (
    <>
      {/* .... About Section .... */}
      <section
        data-aos="fade-left"
        data-aos-delay="500"
        className="relative container-fluid px-4 sm:px-6 py-16 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 items-center text-center md:text-left relative z-10">
          {/* Left Side - Text */}
          <div>
            <h4 className="text-green-600 text-lg sm:text-xl mb-3 font-bold tracking-wide uppercase">
              About Us
            </h4>
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6 text-gray-900 leading-tight">
              Experience in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">waste disposal</span> management services
            </h1>
            <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
              At <span className="font-bold text-green-700">EcoSync</span>,
              we believe that waste management is more than just collection and
              disposal—it's about creating a sustainable cycle that protects our
              environment, conserves resources, and improves community
              well-being.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
              We provide a wide range of services including household waste
              collection, e-waste recycling, hazardous waste management, and
              industrial disposal solutions.
            </p>

            <div className="mb-8 mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <span className="text-2xl sm:text-3xl text-gray-800 font-extrabold">
                Why EcoSync?
              </span>
              <ul className="mt-5 space-y-3 text-base sm:text-lg">
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                    <FaCheckCircle className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-medium text-gray-700">Eco-Friendly Practices</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                    <FaCheckCircle className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-medium text-gray-700">Smart Waste Solutions</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                    <FaCheckCircle className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-medium text-gray-700">Community Awareness</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                    <FaCheckCircle className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-medium text-gray-700">Trusted Service</span>
                </li>
              </ul>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="flex justify-center md:justify-start"
            >
              <button className="group relative bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base sm:text-lg overflow-hidden">
                <span className="relative z-10">Request Pickup</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right side Image */}
          <div className="flex justify-center items-center px-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="/Trash-1.jpg"
                alt="EcoSync Waste Management"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover max-w-sm sm:max-w-md transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* .... CountUp Section .... */}
      <section>
        <div className="container-fluid bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white px-4 sm:px-6 py-14 sm:py-16 text-center gap-10 sm:gap-14 relative z-10">
            <div className="flex flex-col items-center gap-y-3 group">
              <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fass["users"]}
                  className="text-5xl sm:text-6xl"
                />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mt-2">
                <CountUp start={0} end={50} duration={4.5} enableScrollSpy />k
              </h2>
              <p className="text-base sm:text-xl font-medium">Happy & Satisfied Users</p>
            </div>

            <div className="flex flex-col items-center gap-y-3 group">
              <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fass["recycle"]}
                  className="text-5xl sm:text-6xl"
                />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mt-2">
                <CountUp start={0} end={100} duration={4.5} enableScrollSpy />+
              </h2>
              <p className="text-base sm:text-xl font-medium">Total Industries Served</p>
            </div>

            <div className="flex flex-col items-center gap-y-3 group">
              <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fass["truck"]}
                  className="text-5xl sm:text-6xl"
                />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mt-2">
                <CountUp start={0} end={700} duration={4.5} enableScrollSpy />k
              </h2>
              <p className="text-base sm:text-xl font-medium">Waste Picked & Disposed</p>
            </div>
          </div>
        </div>
      </section>

      {/* .... Service Section .... */}
      <section className="container-fluid w-full min-h-full relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/50 to-emerald-50"></div>
        <div className="relative z-10">
          <h5 className="text-center text-green-600 py-4 px-3 text-xl sm:text-2xl my-5 font-bold tracking-wide uppercase">
            Service Industry
          </h5>
          <div className="text-center text-gray-900 py-2 px-5 text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">waste disposal</span> services
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-6 py-12 gap-8 sm:gap-10 place-items-center mt-8 max-w-7xl mx-auto">
            {/* Card 1 */}
            <Card
              sx={{ maxWidth: 345 }}
              className="group rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-white w-full max-w-xs sm:max-w-sm border border-green-100 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <CardMedia
                  component="img"
                  alt="Household Waste"
                  height="200"
                  image="https://tse1.mm.bing.net/th/id/OIP.SGySarKkOkKMjmQh87Jy7wHaES?rs=1&pid=ImgDetMain&o=7&rm=3"
                  className="rounded-t-3xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <CardContent className="p-6">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300"
                >
                  Household Waste Collection
                </Typography>
                <ul className="mt-4 space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Door-to-door garbage collection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Eco-friendly disposal and recycling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Scheduled pickups</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Smart bins for efficient collection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card
              sx={{ maxWidth: 345 }}
              className="group rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-white w-full max-w-xs sm:max-w-sm border border-green-100 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <CardMedia
                  component="img"
                  alt="Recycling Services"
                  height="200"
                  image="https://tse4.mm.bing.net/th/id/OIP.udUFJxd-pK3ENbQcOktY6AHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
                  className="rounded-t-3xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <CardContent className="p-6">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300"
                >
                  Recycling Services
                </Typography>
                <ul className="mt-4 space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Collection of recyclables</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Sorting & processing for reuse</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Reduction of landfill impact</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Scheduled pickups</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card
              sx={{ maxWidth: 345 }}
              className="group rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-white w-full max-w-xs sm:max-w-sm border border-green-100 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <CardMedia
                  component="img"
                  alt="Organic Waste"
                  height="200"
                  image="https://s3-eu-west-1.amazonaws.com/makesense.rocks/uploads/sites/13/20181104102420/organic_waste_composting_compost.jpg"
                  className="rounded-t-3xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <CardContent className="p-6">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300"
                >
                  Organic Waste & Composting
                </Typography>
                <ul className="mt-4 space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Kitchen & garden waste collection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Composting for nutrient-rich soil</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Supports sustainable gardening</span>
                  </li>
                  {/* <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span>Eco-friendly approach</span>
                  </li> */}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-fluid w-full min-h-full relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-green-50 to-white"></div>
        <div className="relative z-10">
          <h5 className="text-center text-green-600 py-4 px-3 text-xl sm:text-2xl my-5 font-bold tracking-wide uppercase">
            Testimonials
          </h5>
          <div className="text-center text-gray-900 py-4 px-5 text-3xl sm:text-4xl md:text-6xl font-extrabold">
            <h1>What our clients say</h1>
            <h1>about <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">EcoSync</span></h1>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-6 py-12 sm:py-16">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="group bg-white shadow-lg hover:shadow-2xl rounded-3xl p-8 text-center relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border border-green-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6 text-yellow-400 text-2xl">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed italic">"{t.text}"</p>
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-50"></div>
                        <img
                          src={t.image}
                          alt={t.name}
                          className="relative w-20 h-20 rounded-full border-4 border-white shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="mt-4 font-bold text-lg sm:text-xl text-gray-900">
                        {t.name}
                      </h3>
                      <div className="mt-2 h-1 w-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <div className="relative py-20 sm:py-24 px-4 text-center bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
            Subscribe to our newsletter
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and eco-friendly practices
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 w-full sm:w-96 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:ring-4 focus:ring-white/30 border-2 border-white/20 text-gray-900 placeholder-gray-500 shadow-xl text-base sm:text-lg"
            />
            <button className="group relative bg-white text-green-700 px-8 py-4 rounded-full sm:rounded-l-none sm:rounded-r-full font-bold hover:bg-gray-100 w-full sm:w-auto shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg overflow-hidden">
              <span className="relative z-10">Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomCarousel;