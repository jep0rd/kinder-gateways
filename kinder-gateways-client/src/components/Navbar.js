import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/nav-logo.png";
import LoginModal from "./LoginModal";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Navbar = () => {
   const [browserStorage, setBrowserStorage] = useState({});
   const [loggedIn, isLoggedIn] = useState(false);
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showOffcanvas, setShowOffcanvas] = useState(false);
   const navigate = useNavigate();


   const handleLoginButtonClick = () => {
      setShowLoginModal(true);
   };

   const handleModalClose = () => {
      setShowLoginModal(false);
   };

   const handleOffcanvasToggle = () => {
      setShowOffcanvas(!showOffcanvas);
   };

   const handleOffcanvasClose = () => {
      setShowOffcanvas(false);
   }

   useEffect(() => {
      const storedItem = JSON.parse(localStorage.getItem('login'))
      storedItem ? isLoggedIn(true) : isLoggedIn(false);
      if(storedItem) {
         const storedAccount = JSON.parse(localStorage.getItem('account'));
         setBrowserStorage(storedAccount);
      }
   }, [])

   const handleLogout = async () => {
      try{
         const response = await axios.put('http://localhost:3001/logout', browserStorage)
         if(response.statusText == 'OK'){
            console.log(response)
            localStorage.setItem('login', false)
            localStorage.setItem('account', '');
            setShowLoginModal(false)
            alert('You have logged out successfully.')
            navigate('/')
            window.location.reload()
         }
      } catch(error){
         alert('Server Error.')
      }
   }


  return (
   <div className="sticky top-0 bg-[#f9f9f9] bg-opacity-95 z-[90]">
      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">

         <Link exact to="/">
            <img src={logo} 
            alt="Kinder Gateways Logo" 
            className="h-24 cursor-pointer"/>
         </Link>

         <ul className="hidden md:flex">
            <Link exact to="/about">
               <li className="m-4 px-2 cursor-pointer">About</li>
            </Link>
            <Link exact to="/admissions">
               <li className="m-4 px-2 cursor-pointer">Admissions</li>
            </Link>
            <Link exact to="/contact">
               <li className="m-4 px-2 cursor-pointer">Contact</li>
            </Link>
            <Link exact to="/faqs">
               <li className="m-4 px-2 cursor-pointer">FAQs</li>
            </Link>
            <Link exact to="/profile">
               <li className={loggedIn ? "m-4 px-2 cursor-pointer" : "hide" }>Profile</li>
            </Link>
            <li className="m-3 px-2">{loggedIn ?
            <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]"
            onClick={handleLogout}>Log out</button> : 
            <button 
            className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" 
            onClick={handleLoginButtonClick}>Log In</button>}</li>    
         </ul>

         {showLoginModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
               onClick={handleModalClose}>
               <div onClick={(event) => event.stopPropagation()}>
                  <LoginModal/>
               </div>
            </div>
         )}  

         <div onClick={handleOffcanvasToggle}
            className="cursor-pointer md:hidden">
               <AiOutlineMenu size={25} />
         </div>

         {showOffcanvas && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
               <div className="fixed right-0 top-0 w-[400px] border-l border-l-gray-200 h-full bg-[#f9f9f9] pt-9">
                  <div className="flex items-center justify-end">
                     <AiOutlineClose size={25}
                        className="cursor-pointer"
                        onClick={handleOffcanvasClose}
                     />
                  </div>
                  <ul className="pt-5">
                     <Link to="/about">
                        <li className="py-4 px-8 cursor-pointer border-b border-gray-200 hover:bg-[#329496] hover:text-[#f9f9f9]">
                        About
                        </li>
                     </Link>
                     <Link to="/admissions">
                        <li className="py-4 px-8 cursor-pointer border-b border-gray-200 hover:bg-[#329496] hover:text-[#f9f9f9]">
                        Admissions
                        </li>
                     </Link>
                     <Link to="/contact">
                        <li className="py-4 px-8 cursor-pointer border-b border-gray-200 hover:bg-[#329496] hover:text-[#f9f9f9]">
                        Contact
                        </li>
                     </Link>
                     <Link to="/faqs">
                        <li className="py-4 px-8 cursor-pointer border-b border-gray-200 hover:bg-[#329496] hover:text-[#f9f9f9]">
                        FAQs
                        </li>
                     </Link>
                     <li className="mx-3 my-auto p-2">
                        <button
                           className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]"
                           onClick={handleLoginButtonClick}
                        >
                        Log In
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         )
         }
      </div>
   </div>   
  )
}

export default Navbar