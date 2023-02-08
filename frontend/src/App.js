import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import { useAuthContext } from './hooks/useAuthContext';
// components

import Navbar from './components/navigation/Navbar';
import Footer from './components/Footer';

// pages
import Engagement from './pages/Engagement';
import Members from './pages/Members';
//import AddMember from './pages/AddMember';
import Member from './pages/Member';
import CreateAccount from './pages/createAccount';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import AddMember from './pages/AddMember';
import Donors from './pages/Donors';
import Donations from './pages/Donations';
import AddDonor from './pages/AddDonor';
import AddDonation from './pages/AddDonation';

import NewReport from './components/reports/NewReport';

// css
import './App.css';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
         <Routes>
          {/* Main routes */}
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path="/engagement" element ={user ?  <Engagement /> : <Navigate to="/"/>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={!user ?  <Login /> : <Navigate to="/"/>}/>
          {/* <Route path = "/create" element={ <CreateAccount />} /> */}
          
          {/* Donor Routes */}
          <Route path="/addmember" element ={ <AddMember /> } />
          <Route path="/donors" element ={ <Donors /> } />
          <Route path="/donors/add" element ={ <AddDonor/> } />
          
          {/* Donation Routes */}
          <Route path="/donations/list/:id" element ={ <Donations /> } />
          <Route path="/donations/add" element ={ <AddDonation/> } />
          
          {/* Member Routes */}
          <Route path="/members" element ={user ?  <Members /> : <Navigate to="/"/>} />
          <Route path = "/create" element={!user ?  <CreateAccount /> : <Navigate to="/"/>} /> 
          <Route exact path="/member/:id" element={<Member />} />
          {/* <Route path = "/member/add" element ={ <AddMemberForm /> } /> */}
          
          {/* Reports Routes */}
          <Route path="/reports" element={user ?  <Reports /> : <Navigate to="/"/>} />
          <Route path="/reports/new" element={<NewReport />} />
         </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
