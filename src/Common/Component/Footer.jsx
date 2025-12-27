

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaArrowUp } from 'react-icons/fa';
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:rotate-12 group z-10"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-xl group-hover:animate-bounce" />
      </button>

      <div className="py-20 px-4 sm:px-6 md:px-20 relative">
        <div className="max-w-screen-xl mx-auto">

          {/* Top Section - Logo & Description */}
          <div className="text-center mb-16">
            <div className="inline-block relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <img
                src="/W.png"
                alt="EcoSync Logo"
                className="w-32 h-32 relative z-10 transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              EcoSync
            </h3> */}
            <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
              Leading the way in sustainable waste management solutions for a cleaner tomorrow.
              Join us in making the world a better place, one pickup at a time.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quick Links
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              </h2>
              <ul className="space-y-3">
                {['About Us', 'Services', 'Contact Us', 'Request Pickup'].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-purple-400 transition-all duration-300 inline-flex items-center gap-2 group/link"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover/link:opacity-100 transition-all duration-300"></span>
                      <span className="group-hover/link:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Hours */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Working Hours
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                    <p className="text-purple-300 font-semibold text-sm">Weekdays</p>
                  </div>
                  <p className="text-gray-200 text-sm">Mon - Fri: 8:00AM – 6:00PM</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-5 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <p className="text-pink-300 font-semibold text-sm">Weekend</p>
                  </div>
                  <p className="text-gray-200 text-sm">Sat - Sun: 8:00AM – 4:00PM</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Get In Touch
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></span>
              </h2>
              <div className="space-y-3 mb-6">
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group/contact p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
                >
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2.5 rounded-lg group-hover/contact:from-blue-500/30 group-hover/contact:to-purple-500/30 transition-all duration-300">
                    <FaLocationDot className="text-purple-400 text-lg" />
                  </div>
                  <span className="text-sm">Add New Hyde Park, NY 1040</span>
                </a>

                <a
                  href="mailto:ecosync@gmail.com"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group/contact p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
                >
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2.5 rounded-lg group-hover/contact:from-purple-500/30 group-hover/contact:to-pink-500/30 transition-all duration-300">
                    <IoIosMail className="text-pink-400 text-lg" />
                  </div>
                  <span className="text-sm">ecosync@gmail.com</span>
                </a>

                <a
                  href="tel:+917736975914"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group/contact p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
                >
                  <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-2.5 rounded-lg group-hover/contact:from-pink-500/30 group-hover/contact:to-purple-500/30 transition-all duration-300">
                    <FaPhoneAlt className="text-blue-400 text-lg" />
                  </div>
                  <span className="text-sm">+91 77369 75914</span>
                </a>
              </div>

              {/* Social Media - Centered */}
              <div className="flex justify-center md:justify-start space-x-3">
                {[
                  { Icon: FaFacebookF, label: 'Facebook', gradient: 'from-blue-600 to-blue-500' },
                  { Icon: FaTwitter, label: 'Twitter', gradient: 'from-sky-600 to-sky-500' },
                  { Icon: FaLinkedinIn, label: 'LinkedIn', gradient: 'from-blue-700 to-blue-600' },
                  { Icon: FaInstagram, label: 'Instagram', gradient: 'from-pink-600 via-purple-600 to-orange-500' }
                ].map(({ Icon, label, gradient }, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={label}
                    className={`bg-white/5 backdrop-blur-sm p-3.5 rounded-xl hover:bg-gradient-to-br hover:${gradient} text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10 hover:border-transparent hover:shadow-xl group/social`}
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-slate-700/50 bg-black/40 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center sm:text-left">
              © 2025 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">EcoSync</span>. All Rights Reserved by{' '}
              <span className="text-white font-semibold">Joyel Shaji</span>.
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </footer>
  );
}