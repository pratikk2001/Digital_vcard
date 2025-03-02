import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/admin/dashboard';
import Settings from './pages/admin/AdminSettings';
import Profile from './pages/admin/adminProfile';
import Themes from './pages/admin/themes';
import CustomerCard from './pages/admin/customer_card';
import Costomer from './pages/admin/customer_details.jsx';

import SuperLogin from './components/admin_auth/login_component/Login';
import Signup from './components/admin_auth/signup_component/signup';

import CustomerLogin from './components/customer_auth/login_component/Login';
import CustomerSignup from './components/customer_auth/signup_component/signup';

import MultiAdminLogin from './components/multiadmin_auth/login_component/MultiAdminLogin'; 
import MultiAdminSignup from './components/multiadmin_auth/signup_component/MultiAdminSignup'; 
import MultiAdminDashboard from './pages/MultiAdmin/MultiDashboard';
import MultiCards from './pages/MultiAdmin/multicards';
import MultiTheme from './pages/MultiAdmin/themes';

import CustomerDashboard from './pages/customer/dashboard';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerSettings from './pages/customer/settings';
import CustomerThemes from './pages/customer/themes';
import CustomersMyCard from './pages/customer/mycards';
import CustomerGetCard from './pages/customer/getcard';
import CustomerHome from './pages/customer/home';
import FormDashboard from './components/forms/FormDashboard';

// Forms
import EnglishForm from './components/forms/EnglishForm/EnglishForm';  
import Marathi from './components/forms/MarathiForm/MarathiForm';

// Templates
import Templates1 from './pages/customer/Templates1';
import Templates2 from './pages/customer/Templates2';
import Templates3 from './pages/customer/Templates3';
import Templates4 from './pages/customer/Templates4';
import Templates5 from './pages/customer/Templates5';
import Templates6 from './pages/customer/Templates6';
import DynamicTemplate from './pages/customer/dynamicTemplate'; // Renamed for consistency

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/AdminSignup" element={<Signup />} /> {/* Fixed path case */}
        <Route path="/Dashboard" element={<Home />} />
        <Route path="/AdminSettings" element={<Settings />} />  
        <Route path="/AdminProfile" element={<Profile />} />
        <Route path="/Themes" element={<Themes />} />
        {/* <Route path="/CustomerCard" element={<CustomerCard />} />} */}
        <Route path="/Customers" element={<Costomer />} /> 
        <Route path="/FormDashboard" element={<FormDashboard />} />
        <Route path="/AdminLogin" element={<SuperLogin />} />
        <Route path="/MultiAdminLogin" element={<MultiAdminLogin />} />
        <Route path="/MultiAdminSignup" element={<MultiAdminSignup />} />
        <Route path= "/MultiAdminDashboard" element={<MultiAdminDashboard />} />
        <Route path="/MultiCards" element={<MultiCards />} />
        <Route path="/MultiThemes" element={<MultiTheme />} />
      
        {/* Customer Routes */}
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
        <Route path="/CustomerCard" element={<CustomersMyCard />} />
        <Route path="/CustomerSettings" element={<CustomerSettings />} />
        <Route path="/CustomerThemes" element={<CustomerThemes />} />
        <Route path="/MyCard" element={<CustomersMyCard />} /> {/* Renamed for clarity */}
        <Route path="/GetCard" element={<CustomerGetCard />} />
        <Route path="/EnglishForm" element={<EnglishForm />} />
        <Route path="/MarathiForm" element={<Marathi />} />
        
        {/* Customer Templates */}
        <Route path="/Templates1" element={<Templates1 />} />
        <Route path="/Templates2" element={<Templates2 />} />
        <Route path="/Templates3" element={<Templates3 />} />
        <Route path="/Templates4" element={<Templates4 />} />
        <Route path="/Templates5" element={<Templates5 />} />
        <Route path="/Templates6" element={<Templates6 />} />

        {/* Dynamic Template Route */}
        <Route path="/:userUrl" element={<DynamicTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;