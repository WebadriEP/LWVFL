import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/navigation/Navbar';
import Footer from './components/Footer';

// pages
import Engagement from './pages/Engagement';
import Members from './pages/Members';
import Member from './pages/Member';
import CreateAccount from './pages/createAccount';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Donors from './pages/Donors';
import NewReport from './components/reports/NewReport';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
         <Routes>

          {/* Main routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/members" element ={ <Members /> } />
          <Route path="/donors" element={<Donors />} />
          <Route path="/engagement" element ={ <Engagement /> } />
          <Route path="/reports" element={ <Reports /> } />
          
          {/* Other routes */}
          <Route exact path="/member/:id" element={<Member />} />
          <Route path="/reports/new" element={<NewReport />} />


          {/* <Route path = "/member/add" element ={ <AddMemberForm /> } /> */}
          {/* <Route path = "/create" element={ <CreateAccount />} /> */}
         </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
