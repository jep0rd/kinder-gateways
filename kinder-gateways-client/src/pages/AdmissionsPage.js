import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import Gcash from "../assets/GCash.png"
import BPI from "../assets/BPI.png"
import LoginModal from "../components/LoginModal";



const AdmissionsPage = () => {
    const [loggedIn, isLoggedIn] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
    }

    const handleRegisterButtonClick = () => {
       setShowRegisterModal(true);
    }
 
   const handleModalClose = () => {
      setShowRegisterModal(false);
      setShowLoginModal(false);
    }

    const handleRedirect = () => {
        alert('You are already logged in. Redirecting you to Profile page.')
        navigate('/profile')
    }

    useEffect(() => {
        const storedItem = JSON.parse(localStorage.getItem('login'))
        storedItem ? isLoggedIn(true) : isLoggedIn(false);
     }, [])

    return (
        <div className="d-flex max-w-[1240px] mx-auto mt-10">
            <div className="d-flex w-[75%] justify-center mx-auto mb-20">
                <h1 className="text-center text-6xl font-bold"><span className="text-[#FCBE1D]">Kinder</span><span className="text-[#2C5C5C]"> Gateways Admission</span></h1>
                <br/>
                <br/>

                 <p>There is a palpable buzz right across the Pre-Prep and Prep School as our excited and inspired learners bounce into School to enjoy wonderful days packed with opportunities.
                 </p>
                 <br/>

                 <p>
                 It is fascinating to see what these young minds and bodies can achieve within such a stimulating and enriching environment.
                 </p>
                 <br/>

                 <p>
                 There is no formal assessment for entrance into Kinder Gateways. However, we do obtain references for all children from their previous school and parents should liaise with our Admissions Team in regards to the timing of this request.
                 </p>
            </div>
            <div className="d-flex w-[50%] justify-center mx-auto mb-20 p-20 rounded-lg bg-[#EFF4F4] shadow-md">
                <h1 className="text-center text-4xl font-bold text-[#2C5C5C] mb-10">Admission Process</h1>
                <p className="mb-5">
                    <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">1</span>
                    <span className="text-2xl"><b> <button onClick={loggedIn ? handleRedirect : handleRegisterButtonClick} className="hover:text-[#2C5C5C] cursor-pointer">Register</button></b> a parent account.</span></p>
                <ul>
                    <li className="mb-5">Ensure that you accomplish all the required fields of the register form <span className="font-bold"></span>ACCURATELY.</li>
                    <li className="mb-10">Remember your credentials as you will use it for your child's enrollment.
                    </li>
                </ul>

                <p className="mb-5">
                    <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">2</span>
                    <span className="text-2xl"><b> Fill up</b> the enrollment form.</span></p>
                <ul>
                    <li className="mb-5"><span onClick={loggedIn ? handleRedirect : handleLoginButtonClick} className="font-bold hover:text-[#2C5C5C] cursor-pointer">Sign in</span> with your login credentials. Once logged-in, go to Profile tab and select Student Information then click on Enrollment.</li>

                    {showLoginModal && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]" 
                        onClick={handleModalClose}>
                        <div onClick={(event) => event.stopPropagation()}>
                            <LoginModal/>
                        </div>
                        </div>
                    )} 

                    <li className="mb-5">Ensure that you accomplish all the required fields of the  application form <span className="font-bold">ACCURATELY</span>.  Incorrect and inaccurate entries may result to disapproval or disqualification of your application.</li>
                    <li className="mb-10">
                    <span className="font-bold">DOUBLE CHECK</span> the information you have entered. Kinder Gateways Admission will not make changes to the information you have provided which eventually will be used in all your school records.
                    </li>
                </ul>

                <p className="mb-5">
                    <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">3</span>
                    <span className="text-2xl"><b> Wait </b> for approval confirmation.</span></p>
                <ul>
                    <li className="mb-10">Check on your profile page for the status of your application. Once approved, you'll see the details of the child, assigned teacher and other important details.</li>
                </ul>

                <p className="mb-5">
                    <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">4</span>
                    <span className="text-2xl"><b> Payments </b> after got approved.</span></p>
                <ul>
                    <li className="mb-5">You may now proceed with payment for the application fee.</li>
                    <li className="mb-5">Application fee: P1000 (Application fees are non-refundable.)</li>
                    <li><img src={BPI} alt="BPI" className="w-[100px]"/></li>
                    <li className="mb-5"><span className="font-bold">BPI Peso Current Account</span>
                    <br/>Account Name: Kinder Gateways
                    <br/>Account Number: 02030040005
                    </li>
                    <li><img src={Gcash} alt="Gcash" className="w-[160px]"/></li>
                    <li className="mb-10"><span className="font-bold">GCash Payment</span>
                    <br/>Account Name: Kinder Gateways
                    <br/>Account Number: +63 912 345 6789
                    </li>
                </ul>

                <p className="mb-10">
                    <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">5</span>
                    <span className="text-2xl"><b> Submit </b> your requirements.</span></p>
                <ul>
                    <li className="mb-5">You may submit the requirements to our Admission Office.</li>
                    <li className="mb-1">Submit the following:</li>
                    <ul>
                        <li className="ml-5">Birth Certificate (Original copy from PSA)</li>
                        <li className="ml-5">Report Card from previous school (if applicable)</li>
                    </ul>
                </ul>
            </div>
            <div className="d-flex w-[75%] justify-center mx-auto my-20">
                <h1 className="text-center text-3xl font-bold text-[#2C5C5C]">Do you have Questions?</h1>
                <br/>

                <p className="self-center text-center">
                If you have questions, please follow the link to our <Link exact to="/faqs" className="text-[#FCBE1D] font-bold">FAQs</Link> page where you can see frequently asked questions and answers. You may also visit our <Link exact to="/contact" className="text-[#FCBE1D] font-bold">contact page</Link> if you have other questions or issues. If your issue is urgent then telephone details are also available.</p>
                <br/>
            </div>
            
            {showRegisterModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]" onClick={handleModalClose}>
                    <div onClick={(event) => event.stopPropagation()}>
                    <RegisterModal/>
                    </div>
                </div>
                )}
        </div>
    )
}

export default AdmissionsPage