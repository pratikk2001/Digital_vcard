// App.js

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/admin/dashboard';
import Setting from './pages/admin/settings';
import Profile from './pages/admin/adminProfile';
import Themes from './pages/admin/themes';
import CustomerCard from './pages/admin/customer_card';
import Costomer from './pages/admin/customer_details';

import Login from './components/admin_auth/login_component/Login';
import Signup from './components/admin_auth/signup_component/signup';

import CustomerLogin from './components/customer_auth/login_component/Login';
import CustomerSignup from './components/customer_auth/signup_component/signup';

import CustomerDashboard from './pages/customer/dashboard';
import CustomerProfile from './pages/customer/CustomerProfile'; 
import CustomerSettings from './pages/customer/settings';
import CustomerThemes from './pages/customer/themes';
import CustomersMyCard from './pages/customer/mycards';
import CustomerGetCard from './pages/customer/getcard';
import Customerform from './pages/customer/Cardform';
import CustomerHome from './pages/customer/home';
import DigitalCard from './components/customerCard/custumerCardDisplay';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/Adminsignup" element={<Signup />} />
        <Route path="/Dashboard" element={<Home />} />
        <Route path="/AdminSettings" element={<Setting />} />  
        <Route path="/AdminProfile" element={<Profile />} />
        <Route path="/Themes" element={<Themes />} />
        <Route path="/Customers Card" element={<CustomerCard />} />
        <Route path="/Customers" element={<Costomer />} />

        <Route path="/AdminLogin" element={<Login />} />
        <Route path="/CustomersForm" element={<Customerform />} />


        {/* Customer Routes */}
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
        <Route path="/CustomerSettings" element={<CustomerSettings />} />
        <Route path="/CustomerThemes" element={<CustomerThemes />} />
        <Route path="/CustomerCard" element={<CustomersMyCard />} />
        <Route path="/GetCard" element={<CustomerGetCard />} />
         {/* New DigitalCard Route */}
         <Route path="/:username" element={<DigitalCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
