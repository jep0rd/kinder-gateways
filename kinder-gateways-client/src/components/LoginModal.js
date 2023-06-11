import React, { useState } from "react";
import RegisterModal from "./RegisterModal";
import { json, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginModal = () => {
  const navigate= useNavigate();
  const [error, setError] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  


  const handleUserData = (event) => {
    setLoginData({...loginData, [event.target.name]:event.target.value});
  }

  // Form validation here
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/verify/login', loginData)
      if(response.statusText == 'OK'){
        setError(false);
        try {
          const login = await axios.put('http://localhost:3001/login');
          if(login.statusText == 'OK'){
            alert('You have successfully logged in.')
            localStorage.setItem('account', JSON.stringify({ 'email': response.data[0].email_address}));
            localStorage.setItem('login', true);
            navigate('/profile');
            window.location.reload();

          }
        } catch(error) {
          alert('Server Error.')
        }
      } else {
      }


    } catch(error) {
      console.log(error.response.data.error)
      setError(true)
    }
    };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setShowRegisterModal(true);
  };

  const handleModalClose = () => {
    setShowRegisterModal(false);
  };

  const signUp = (
    <button className="underline cursor-pointer" onClick={handleSignUpClick}>
      Sign Up
    </button>
  )

  return (
    <form className="flex flex-col bg-[#f9f9f9] h-[400px] w-[350px] rounded-xl px-10 py-14 relative" action="/about" method="POST">
      <label>Email Address</label>
      <input type="text" 
            className="px-3 py-2 my-2 bg-[#32949620]" 
            name="email"
            onChange={handleUserData} />
      <label>Password</label>
      <input type={showPassword ? "text" : "password"} 
            className="px-3 py-2 my-2 bg-[#32949620] login_password" 
            name="password"
            onChange={handleUserData} />
      <span
        className="absolute show_password"
        onClick={() => {setShowPassword(!showPassword) }}
      >{showPassword ? "hide" : "show"}</span>
      {/* <div>
         <input type="checkbox" id="remember"></input>
         <label htmlFor="remember"
               className="text-[15px] mx-2">Remember Me</label>
      </div> */}
      <small className={error ? "text-error" : "hide"}>Incorrect email adddress or password</small>
      <button onClick={handleLogin}
            className="w-[120px] rounded-full bg-[#2C5C5C] text-[#f9f9f9] py-2 hover:bg-[#329496] mx-auto mt-10"
         >Login</button>
      <p className="text-sm mx-auto my-2">
        Don't have an account? {signUp}
      </p>
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleModalClose}>
          <div onClick={(event) => event.stopPropagation()}>
            <RegisterModal/>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginModal;
