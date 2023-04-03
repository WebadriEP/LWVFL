import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React from "react"


import { useAuthContext } from "./hooks/useAuthContext"
// components

import Navbar from "./components/navigation/Navbar"
import Footer from "./components/Footer"

// pages
import Engagement from "./pages/Engagement"
import Members from "./pages/Members"
//import AddMember from './pages/AddMember';
import Member from "./pages/Member"
import CreateAccount from "./pages/createAccount"
import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"
import Login from "./pages/Login"
import AddMember from "./pages/AddMember"
import Donors from "./pages/Donors"
import Donations from "./pages/Donations"
import AddDonor from "./pages/AddDonor"
import AddDonation from "./pages/AddDonation"
import Imports from "./pages/Imports"
import NewReport from "./components/reports/NewReport"
import UpdateUser from "./components/users/UpdateUser"


import UserDashboard from "./pages/UserDashboard"

// css
import "./App.css"

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Main routes */}
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/engagement"
              element={user ? <Engagement /> : <Navigate to="/" />}
            />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            {/* Donor Routes */}
            <Route
              path="/addmember"
              element={user ? <AddMember /> : <Navigate to="/" />}
            />
            <Route
              path="/donors"
              element={user ? <Donors /> : <Navigate to="/" />}
            />
            <Route
              path="/donors/add"
              element={user ? <AddDonor /> : <Navigate to="/" />}
            />
            {/* Donation Routes */}
            <Route
              path="/donations/list/:id"
              element={user ? <Donations /> : <Navigate to="/" />}
            />
            <Route
              path="/donations/add/:id"
              element={user ? <AddDonation /> : <Navigate to="/" />}
            />
            {/* Member Routes */}
            <Route
              path="/members"
              element={user ? <Members /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={user ? <CreateAccount /> : <Navigate to="/" />}
            />
            <Route
              path="/users"
              element={user ? <UserDashboard /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/member/:id"
              element={user ? <Member /> : <Navigate to="/" />}
            />

            <Route
              exact
              path="/update-user/:id"
              element={user ? <UpdateUser /> : <Navigate to="/" />}
            />

            <Route
              exact
              path="/member/:id"
              element={user ? <Member /> : <Navigate to="/" />}
            />
            {/* Reports Routes */}
            <Route
              path="/reports"
              element={user ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/reports/new"
              element={user ? <NewReport /> : <Navigate to="/" />}
            />
            <Route
              path="/import"
              element={user ? <Imports /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
