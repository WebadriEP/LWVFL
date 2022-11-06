import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/navigation/Navbar';

// pages
import Engagement from './pages/Engagement';
import Members from './pages/Members';
//import AddMember from './pages/AddMember';
import CreateAccount from './pages/createAccount';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Donors from './pages/Donors';
import AddDonor from './pages/AddDonor';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
         <Routes>
            <Route path = "/member" element ={ <Members /> } />
            <Route path = "/engagement" element ={ <Engagement /> } />
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element ={ <Members /> } />
            <Route path="/donors" element ={ <Donors /> } />
            <Route path="/donors/add" element ={ <AddDonor/> } />
            <Route path="/engagement" element ={ <Engagement /> } />
            <Route path="/reports" element={ <Reports /> } />
            
            {/* <Route path = "/member/add" element ={ <AddMemberForm /> } /> */}
            {/* <Route path = "/create" element={ <CreateAccount />} /> */}
         </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
