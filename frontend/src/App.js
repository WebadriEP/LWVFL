import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// pages
import Engagement from './pages/Engagement';
import Member from './pages/Member';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className ="pages">
         <Routes>
            <Route path = "/member" element ={ <Member /> } />
            <Route path = "/member/add" element ={ <AddMemberForm /> } />
            <Route path = "/engagement" element ={ <Engagement /> } />
            <Route path = "/register" element = {<CreateAccount/>} />
         </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
