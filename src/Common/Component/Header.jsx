
// import React, { useEffect, useState } from "react";
// import { FaRegClock, FaBars, FaPowerOff, FaTimes } from "react-icons/fa";
// import { MdOutlineMailOutline, MdPhone } from "react-icons/md";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import { SplitButton } from "primereact/splitbutton";

// function Header() {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const listNavbar = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Contact Us", path: "/contact" }
//   ];

//   const loginItems = [
//     {
//       label: "User",
//       icon: "pi pi-user",
//       command: () => navigate("/login")
//     },
//     {
//       label: "Admin",
//       icon: "pi pi-cog",
//       command: () => navigate("/admin-login")
//     }
//   ];

//   // Scroll effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Detect login from sessionStorage
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = sessionStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);

//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     sessionStorage.clear();
//     setIsLoggedIn(false);
//     navigate("/");
//     window.dispatchEvent(new Event("storage"));
//   };

//   return (
//     <>
//       {/* Top Info Bar with gradient and enhanced styling */}
//       <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-700">
//         <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 text-sm">

//           <div className="flex items-center gap-2 group cursor-pointer">
//             <FaRegClock className="text-green-400 group-hover:text-green-300 transition-colors duration-300" />
//             <span className="text-gray-300">
//               Open Hours:
//               <span className="font-semibold text-white ml-1">
//                 Mon–Sat 8:00–6:00
//               </span>
//             </span>
//           </div>

//           <div className="flex items-center gap-2 group cursor-pointer">
//             <MdOutlineMailOutline className="text-green-400 group-hover:text-green-300 transition-colors duration-300" />
//             <span className="text-gray-300">
//               Email:
//               <span className="font-semibold text-white ml-1">
//                 ecosync@gmail.com
//               </span>
//             </span>
//           </div>

//           <div className="flex items-center gap-2 group cursor-pointer">
//             <HiOutlineLocationMarker className="text-green-400 group-hover:text-green-300 transition-colors duration-300" />
//             <span className="text-gray-300">
//               Address:
//               <span className="font-semibold text-white ml-1">
//                 478 Preston Rd. Maine 1480
//               </span>
//             </span>
//           </div>

//           <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
//             <MdPhone className="text-white animate-pulse" />
//             <span>+91 7736975914</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Header with sticky behavior and color transition */}
//       <header
//         className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
//             ? 'bg-white shadow-xl'
//             : 'bg-gradient-to-r from-green-700 via-green-600 to-green-700 shadow-md'
//           }`}
//       >
//         <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">

//           {/* Logo with hover animation */}
//           <Link to="/" className="flex items-center group">
//             <div className="relative">
//               <img
//                 src="W.png"
//                 alt="Logo"
//                 className="w-[100px] h-[50px] transform group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
//             </div>
//           </Link>

//           {/* Desktop Nav with enhanced hover effects */}
//           <nav className="hidden md:flex flex-1 justify-center gap-8 text-lg font-medium">
//             {listNavbar.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.path}
//                 className={`relative px-3 py-2 group ${scrolled ? 'text-gray-700' : 'text-white'
//                   }`}
//               >
//                 <span className="relative z-10">{item.name}</span>
//                 {/* Animated underline */}
//                 <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${scrolled ? 'bg-green-600' : 'bg-orange-400'
//                   } group-hover:w-full transition-all duration-300`}></span>
//                 {/* Background glow */}
//                 <span className={`absolute inset-0 ${scrolled ? 'bg-green-50' : 'bg-white/10'
//                   } rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}></span>
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Right Section with enhanced styling */}
//           <div className="hidden md:flex items-center">
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className={`p-3 rounded-full ${scrolled
//                     ? 'text-red-600 hover:bg-red-50'
//                     : 'text-white hover:bg-white/10'
//                   } transition-all duration-300 transform hover:scale-110 hover:rotate-90`}
//                 title="Logout"
//               >
//                 <FaPowerOff className="text-xl" />
//               </button>
//             ) : (
//               <div className="transform hover:scale-105 transition-transform duration-300">
//                 <SplitButton
//                   model={loginItems}
//                   icon="pi pi-user"
//                   dropdownIcon="pi pi-angle-down"
//                   className={`${scrolled
//                       ? 'bg-green-600 hover:bg-green-700'
//                       : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
//                     } border-none text-white rounded-lg shadow-lg`}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button with icon transition */}
//           <button
//             onClick={() => setShow(!show)}
//             className={`flex md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
//               } transition-all duration-300`}
//           >
//             {show ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
//           </button>
//         </div>

//         {/* Mobile Menu with smooth slide animation */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${show ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//             } ${scrolled ? 'bg-white border-t border-gray-200' : 'bg-gradient-to-b from-green-700 to-green-800'}`}
//         >
//           <div className="px-4 pb-4 pt-2 flex flex-col items-center gap-4">

//             <nav className="flex flex-col gap-2 w-full">
//               {listNavbar.map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.path}
//                   onClick={() => setShow(false)}
//                   className={`text-center py-3 px-4 rounded-lg font-medium transition-all duration-300 ${scrolled
//                       ? 'text-gray-700 hover:bg-green-50 hover:text-green-600'
//                       : 'text-white hover:bg-white/10'
//                     }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>

//             {/* Mobile Auth Section */}
//             <div className="w-full pt-2 border-t border-white/20">
//               {isLoggedIn ? (
//                 <button
//                   onClick={handleLogout}
//                   className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${scrolled
//                       ? 'bg-red-50 text-red-600 hover:bg-red-100'
//                       : 'bg-white/10 text-white hover:bg-white/20'
//                     }`}
//                   title="Logout"
//                 >
//                   <FaPowerOff />
//                   <span>Logout</span>
//                 </button>
//               ) : (
//                 <SplitButton
//                   model={loginItems}
//                   icon="pi pi-user"
//                   dropdownIcon="pi pi-angle-down"
//                   className={`w-full ${scrolled
//                       ? 'bg-green-600 hover:bg-green-700'
//                       : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
//                     } border-none text-white rounded-lg shadow-lg`}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

// export default Header;

import React, { useEffect, useState } from "react";
import {
  FaRegClock,
  FaBars,
  FaPowerOff,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineMailOutline, MdPhone } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { SplitButton } from "primereact/splitbutton";

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authRole, setAuthRole] = useState(null);

  const listNavbar = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  const loginItems = [
    {
      label: "User Login",
      icon: "pi pi-user",
      command: () => navigate("/login"),
    },
    {
      label: "Admin Login",
      icon: "pi pi-cog",
      command: () => navigate("/admin-login"),
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  useEffect(() => {
    const checkAuth = () => {
      const userToken = sessionStorage.getItem("token");
      const adminToken = sessionStorage.getItem("adminToken");

      if (adminToken) setAuthRole("admin");
      else if (userToken) setAuthRole("user");
      else setAuthRole(null);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);


  const handleLogout = () => {
    if (authRole === "admin") {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminData");
      navigate("/admin-login");
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userData");
      navigate("/");
    }

    setAuthRole(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
     
      <div className="w-full bg-slate-900 text-white px-4 py-3 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-2">
            <FaRegClock className="text-green-400" />
            Mon–Sat 8:00–6:00
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline className="text-green-400" />
            ecosync@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-green-400" />
            478 Preston Rd. Maine
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-green-400" />
            +91 7736975914
          </div>
        </div>
      </div>

      
      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled ? "bg-white shadow-lg" : "bg-green-700"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
   
          <Link to="/">
            <img src="W.png" alt="Logo" className="w-[100px] h-[50px]" />
          </Link>

        
          <nav className="hidden md:flex gap-8">
            {listNavbar.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={scrolled ? "text-gray-700" : "text-white"}
              >
                {item.name}
              </Link>
            ))}
          </nav>

     
          <div className="hidden md:flex items-center">
            {authRole ? (
              <button
                onClick={handleLogout}
                title="Logout"
                className={`p-3 rounded-full transition ${
                  scrolled
                    ? "text-red-600 hover:bg-red-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <FaPowerOff size={18} />
              </button>
            ) : (
              <SplitButton
                model={loginItems}
                icon="pi pi-user"
                dropdownIcon="pi pi-angle-down"
                className="bg-green-600 text-white border-none"
              />
            )}
          </div>

          <button
            onClick={() => setShow(!show)}
            className={`md:hidden ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {show ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            show ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } ${scrolled ? "bg-white" : "bg-green-700"}`}
        >
          <div className="px-4 pb-4 flex flex-col gap-3">
            {listNavbar.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => setShow(false)}
                className={scrolled ? "text-gray-700" : "text-white"}
              >
                {item.name}
              </Link>
            ))}

            {authRole ? (
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaPowerOff />
                Logout
              </button>
            ) : (
              <SplitButton
                model={loginItems}
                icon="pi pi-user"
                dropdownIcon="pi pi-angle-down"
                className="w-full bg-green-600 text-white border-none"
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
