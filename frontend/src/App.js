import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// components
import Navbar from './components/navigation/Navbar';

// pages
import Engagement from './pages/Engagement';
import Members from './pages/Members';
import CreateAccount from './pages/createAccount';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';

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
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
            <Route path="/login" element={!user ?  <Login /> : <Navigate to="/"/>}/>
            <Route path="/members" element ={user ?  <Members /> : <Navigate to="/"/>} />
            <Route path="/engagement" element ={user ?  <Engagement /> : <Navigate to="/"/>} />
            <Route path="/reports" element={user ?  <Reports /> : <Navigate to="/"/>} />
            {/* <Route path = "/member/add" element ={ <AddMemberForm /> } /> */}
             <Route path = "/create" element={!user ?  <CreateAccount /> : <Navigate to="/"/>} /> 
         </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
