import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ContactPage from "./pages/ContactPage";
import FaqsPage from "./pages/FaqsPage";
import AdminDashboard from "./pages/Admin";
import Profile from './pages/Profile';
import LoginRoute from "./components/PrivateRoute";


const App = () => {

  return (
    <>
      <div className="w-full bgimage">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/admissions" element={<AdmissionsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/faqs" element={<FaqsPage/>} />
            <Route path="/profile" element={<LoginRoute/>}>
              <Route index element={<Profile/>} />
            </Route>
            <Route exact path="/admin" element={<AdminDashboard/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
