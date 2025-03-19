//import './App.css'
import Landingpage from './Pages/Landingpage';
import Aboutus from './Pages/Aboutus';
import Addmeds from './Pages/Addmeds';
import Navbar from './components/Navbar';
import Browsemeds from './Pages/browsemeds';
import Signupadmin from './Pages/signupadmin';
import Loginadmin from './Pages/Loginadmin';
import Signupclient from './Pages/Signupclient';
import Loginclient from './Pages/Loginclient';
import Chatbot from './Pages/Chatbot';
import {BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landingpage/>}  />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/addmeds" element={<Addmeds/>} />
          <Route path="/browsemeds" element={<Browsemeds/>} />
          <Route path="/signupadmin" element={<Signupadmin/>} />
          <Route path="/loginasadmin" element={<Loginadmin/>} />
          <Route path="/signupclient" element={<Signupclient/>} />
          <Route path="/loginclient" element={<Loginclient/>} />
          <Route path="/chatbotai" element={<Chatbot/>} />


        </Routes>
      </Router>
    </>
  )
}

export default App
