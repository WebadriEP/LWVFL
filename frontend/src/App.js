import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
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
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
         <Routes>

          {/* Main routes */}
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!user ?  <Login /> : <Navigate to="/"/>}/>
          <Route path="/members" element ={user ?  <Members /> : <Navigate to="/"/>} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/engagement" element ={user ?  <Engagement /> : <Navigate to="/"/>} />
          <Route path="/reports" element={user ?  <Reports /> : <Navigate to="/"/>} />
          
          {/* Other routes */}
          <Route exact path="/member/:id" element={<Member />} />
          <Route path="/reports/new" element={<NewReport />} />


          {/* <Route path = "/member/add" element ={ <AddMemberForm /> } /> */}
           <Route path = "/create" element={!user ?  <CreateAccount /> : <Navigate to="/"/>} /> 
         </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
