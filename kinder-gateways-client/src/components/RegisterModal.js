import React, { useState } from "react";
import axios from "axios";
import '../App.css'

const RegisterModal = () => {
   const [serverError, setserverError] = useState('')
   const [formError, setFormError] = useState('')
   const [isEmailAvail, setEmailAvail] = useState(true)
   const [isPassValid, setPassValid] = useState(true)
   const [isEmailValid, setEmailValid] = useState(true)
   const [isNumValid, setNumValid] = useState(true)
   const [showTerms, setShowTerms] = useState(false)
   const [incData, setIncData] = useState(false)

   // variable that will store the form data
   const [userData, setValues] = useState({
      email : '',
      password : '',
      firstname : '',
      lastname : '',
      address : '',
      mobile : '',
      gender : '',
      login : false
   })
   // function for collecting the input data
   const handleUserData = (event) => {
      setValues({...userData, [event.target.name]:event.target.value});
   }

   // getting the value of T&C if accepted
   const [isTermsAccepted, setTerms] = useState(false);
   const handleTerms = (event) => {
      if(event.target.checked){
         setTerms(true);
      } else{
         setTerms(false);
      }
   }

   // password validation
   let passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/g.test(userData.password);
   // email validation
   let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(userData.email);
   // phone number validation
   let numberValidation = /^9\d{9}$/.test(userData.mobile)

   // submit button
   const handleRegister = async (e) => {
      e.preventDefault()


      // Form validation here
      if( userData.firstname.trim() === '' ||
      userData.lastname.trim() === '' ||
      userData.gender.trim() === '' ||
      userData.mobile.trim() === '' ||
      userData.address.trim() === '' ||
      userData.email.trim() === '' ||
      userData.password.trim() === ''){
         setIncData(true)
         setFormError('Do not leave any fields blank')
         setEmailAvail(true)
      } else if(!passValidation || !emailValidation || !numberValidation){
         setIncData(false)
         setEmailAvail(true)
         emailValidation = !emailValidation ? setEmailValid(false) : setEmailValid(true);
         passValidation = !passValidation ? setPassValid(false) : setPassValid(true);
         numberValidation = !numberValidation ? setNumValid(false) : setNumValid(true);
      } else if(isTermsAccepted === false){
         setIncData(true)
         setEmailAvail(true)
         setEmailValid(true)
         setPassValid(true)
         setFormError('Please accept the terms and conditions.')
      } else{
         const confirmSubmit = window.confirm('Are you sure you want to submit this information now?');
         if(confirmSubmit){
         // adding the user account
         try{
            const response = await axios.post('http://localhost:3001/registration', userData);
            setEmailAvail(true)
            setIncData(false)
            setEmailValid(true)
            setPassValid(true)
            setNumValid(true)
            alert('You have successfully registered.')
            window.location.reload();
         }
         catch(error){
            setserverError(error.response.data.error)
            setEmailAvail(false)
            setIncData(false)
            setEmailValid(true)
            setPassValid(true)
            setNumValid(true)
            }
         } else {

         }
      }
   };

   const handleTermsClick = () => {
      setShowTerms(true);
      setValues((values) => ({
         ...values, email: '', password: '', firstname: '', lastname: '', address: '', mobile: '', gender: ''
      }))
   }

   const termsAndConditions = (
      <button onClick={handleTermsClick} className="underline">
         terms and conditions
      </button>
   );

   const handleBackClick = () => {
      setShowTerms(false);
   }

   return (
      <form className="flex flex-col bg-[#f9f9f9] h-[auto] w-[auto] max-w-lg rounded-xl px-10 py-8 text-sm" action='/' method='POST'>

         {showTerms ? (
            <div>
               <h2 className="text-center text-xl mb-5 font-bold">TERMS AND CONDITIONS</h2>
               <div className="max-h-[450px] overflow-y-scroll mb-3 terms">
                  <p className="text-justify text-[12px]">
                     Welcome to Kinder Gateways! These Terms and Conditions govern your use of our online enrollment management system and website. Please read this Agreement carefully before accessing or using our services. By accessing or using Kinder Gateways, you agree to be bound by these Terms and Conditions.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">1. Acceptance of Terms:</span> By accessing or using Kinder Gateways, you acknowledge that you have read, understood, and agree to comply with these Terms and Conditions, as well as any other applicable laws and regulations.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">2. User Accounts:</span> To access certain features and services on Kinder Gateways, you may need to create a user account. You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account. Notify us immediately if you suspect any unauthorized use of your account.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">3. Privacy Policy:</span> We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using Kinder Gateways, you consent to our collection, use, and disclosure of your personal information as described in our Privacy Policy.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">4. User Obligations:</span> You agree to use Kinder Gateways responsibly and in compliance with all applicable laws. You will not engage in any unauthorized use, distribute harmful content, or interfere with the proper functioning of the website or its services.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">5. Intellectual Property:</span> The content, design, graphics, and other materials on Kinder Gateways are protected by intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works based on the website's content without our prior written consent.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">6. Limitation of Liability:</span> Kinder Gateways and its administrators shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the website or its services, including but not limited to errors, delays, or interruptions in the transmission of data.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">7. Third-Party Websites and Services:</span> Kinder Gateways may contain links to third-party websites or services. We do not endorse or have control over the content, privacy policies, or practices of these third-party websites. You access and use them at your own risk.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">8. Modifications to the Agreement:</span> We reserve the right to modify, update, or amend these Terms and Conditions at any time. Any changes will be effective immediately upon posting the revised Agreement on Kinder Gateways. Your continued use of the website constitutes acceptance of the modified Agreement.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">9. Termination:</span> We reserve the right to terminate or suspend your access to Kinder Gateways at any time, with or without cause, and without prior notice.
                  </p>
                  <p className="text-justify text-[11px] m-3">
                     <span className="font-bold">10. Governing Law and Jurisdiction:</span> These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where Kinder Gateways operates. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
                  </p>
                  <p className="text-justify text-[12px] mb-3">
                     If you have any questions or concerns regarding these Terms and Conditions, please contact us at <span className="underline cursor-pointer">kinder.gateways@gmail.com.ph</span>.
                  </p>
               </div>
               <button className="bg-[#2C5C5C] hover:bg-[#329496] rounded-full px-4 py-1 text-[#f9f9f9]" onClick={handleBackClick}>Back</button>
           </div> 
         ) : (
            <div className="flex flex-col">
               <h2 className="text-center text-xl mb-10 font-bold z-[100]">PARENT/GUARDIAN REGISTRATION FORM</h2>
               <small className={incData ? "text-error display" : "hide"}>{formError}</small>
               <div className="flex justify-between">
                  <div className="flex flex-col w-52">
                     <label>First Name</label>
                     <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="firstname" onChange={handleUserData}/>
                  </div>
                  <div className="flex flex-col w-52">
                     <label>Last Name</label>
                     <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="lastname" onChange={handleUserData}/>
                  </div>
               </div>
               <div className="flex justify-between">
                  <div className="flex flex-col">
                     <label>Gender</label>
                     <select name="gender" onChange={handleUserData} className="px-3 py-2 my-2 bg-[#32949620]">
                        <option value="" selected disabled>---</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                     </select>
                  </div>
                  <div className="flex flex-col w-52">
                     <label>Phone Number</label>
                     <input type="number" name="mobile" onChange={handleUserData} className="px-3 py-2 my-2 bg-[#32949620]"/>
                     <small className={!isNumValid ? "text-error display mb-2" : "hide"}>Phone number must start with '9' followed by nine-digit number</small>
                  </div>
               </div>
               <label>Home Address</label>
               <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="address" onChange={handleUserData}/>
               <label>Email Address</label>
               <input type="email"
                  className="px-3 py-2 my-2 bg-[#32949620]"
                  name="email"
                  onChange={handleUserData}/>
               <small className={!isEmailAvail ? "text-error display mb-2" : "hide"}>{serverError}</small>
               <small className={!isEmailValid ? "text-error display mb-2" : "hide"}>Please enter correct email address</small>
               <label>Password</label>
               <input type="password"
                  className="px-3 py-2 my-2 bg-[#32949620]"
                  name="password"
                  onChange={handleUserData}/>
               <div className={!isPassValid ? "text-error display mb-2" : "hide"}>
                  <small className="text-error">Password must be between 8-15 characters long and contain at least:</small>
                  <ul className="list-disc list-inside">
                     <li><small>One lowercase letter</small></li>
                     <li><small>One uppercase letter</small></li>
                     <li><small>One digit</small></li>
                  </ul>
               </div>
               
               <div>
                  <input type="checkbox" id="agreement" onChange={handleTerms}/>
                  <label htmlFor="agreement"
                     className="text-[12px] mx-2">
                     I hereby confirm that I have read, understood, and agree to abide by the {termsAndConditions} of Kinder Gateways.
                  </label>
               </div>
               <button onClick={handleRegister}
                  className="w-[120px] rounded-full bg-[#2C5C5C] text-[#f9f9f9] py-2 hover:bg-[#329496] mx-auto mt-8"
               >Register</button>
            </div>
         )}
      </form>  
   );
};

export default RegisterModal;
