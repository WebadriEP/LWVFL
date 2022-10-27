import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// pages
import Engagement from './pages/Engagement';
import Member from './pages/Member';
import AddMember from './pages/AddMember'
import CreateAccount from './pages/createAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className ="pages">
         <Routes>
            <Route path = "/member" element ={ <Member /> } />
            <Route path = "/member/add" element ={ <AddMember /> } />
            <Route path = "/engagement" element ={ <Engagement /> } />
            {/* <Route path = "/create" element={ <CreateAccount />} /> */}
            
         </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
