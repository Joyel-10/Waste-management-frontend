import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Common/Component/Header';
import Landing from './Common/Pages/Landing';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import Footer from './Common/Component/Footer';
import Contact from './Common/Pages/Contact';
import Authe from './Common/Pages/Authe';
import AppSideBar from './User/Components/AppSideBar';
import AdSideBar from './Admin/Components/AdSideBar';
import DashBoard from './User/Pages/DashBoard';
import Schedule from './User/Pages/Schedule';
import PickupHistory from './User/Pages/PickupHistory';
import Payements from './User/Pages/Payements';
import Complaints from './User/Pages/Complaints';
import Profile from './User/Pages/Profile';
import AdminDashboard from './Admin/Pages/AdminDashboard';
import AdminManageUsers from './Admin/Pages/AdminManageUsers';
import AdminBin from './Admin/Pages/AdminBin';
import AdminPickup from './Admin/Pages/AdminPickup';
import AdminReports from './Admin/Pages/AdminReports';
import AdminProfile from './Admin/Pages/AdminProfile';
import Services from './Common/Pages/Services';
import About from './Common/Pages/About';
import AdLogin from './Admin/Pages/AdLogin';
import AdRegister from './Admin/Pages/AdRegister';
import Register from './User/Pages/Register';
import Login from './User/Pages/Login';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Header />

      <Routes>
        {/* Common */}
        <Route path='/' element={<Landing />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/auth' element={<Authe />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />

        {/* User */}
        <Route path='/user-sidebar' element={<AppSideBar />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/schedule-pickup' element={<Schedule />} />
        <Route path='/pickup-history' element={<PickupHistory />} />
        <Route path='/payements' element={<Payements />} />
        <Route path='/complaints' element={<Complaints />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />

        {/* Admin */}
        <Route path='/admin-sidebar' element={<AdSideBar />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-manageusers' element={<AdminManageUsers />} />
        <Route path='/admin-bin' element={<AdminBin />} />
        <Route path='/admin-pickup' element={<AdminPickup />} />
        <Route path='/admin-reports' element={<AdminReports />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/admin-login' element={<AdLogin />} />
        <Route path='/admin-register' element={<AdRegister />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="light"
      />

      <Footer />
    </>
  );
}

export default App;
