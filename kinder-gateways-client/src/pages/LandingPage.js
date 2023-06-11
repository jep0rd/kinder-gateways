import React, { useState, useEffect } from "react";
import RegisterModal from "../components/RegisterModal";
import NurturingImage from "../assets/nurturing_environment.png";
import ExperiencedTeacher from "../assets/experienced_teacher.png";
import SmallClass from "../assets/Small_class_sizes.png";
import EngagingCurriculum from "../assets/Engaging_curriculum.png";
import Focus from "../assets/Focus.png";
import SafeEnvironment from "../assets/Safe_Environment.png";
import Parent1 from "../assets/Parent1.png"
import Parent2 from "../assets/Parent2.png"
import Parent3 from "../assets/Parent3.png"
import Parent4 from "../assets/Parent4.png"
import HorizontalLine from "../assets/horizontal_line.png"
import EnrollmentForm from "../components/enrollmentForm";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
   const [loggedIn, isLoggedIn] = useState(false);
   const [showRegisterModal, setShowRegisterModal] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const navigate = useNavigate();

   const handleRedirect = () => {
      alert('You are already logged in. Redirecting you to Profile page.')
      navigate('/profile')
   }

   const handleRegisterButtonClick = () => {
      setShowRegisterModal(true);
   }

   const handleModalClose = () => {
     setShowRegisterModal(false);
   }

   const closeModal = () => {
      setShowModal(false);
   }

   const handleEnrollment = () => {
      setShowModal(true);
   }
   
   useEffect(() => {
      const storedItem = JSON.parse(localStorage.getItem('login'))
      storedItem ? isLoggedIn(true) : isLoggedIn(false);
   }, [])

  return (
    <div className="d-flex max-w-[1240px] mx-auto mt-10 bgimage1">
      <div className="pt-10 pb-40 px-19 z-10">
         <h2 className="text-6xl font-bold m-5">Where learning begins,</h2>
         <h2 className="text-6xl font-bold mx-5 text-[#FCBE1D]">gateways open.</h2>
         <p className="w-[500px] my-10 mx-5 text-xl">Nurturing young minds with a holistic approach to education. Unleashing their full potential for a future of limitless possibilities.</p>
         <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-10 py-3 mx-5 hover:bg-[#329496] cursor-pointer"
         onClick={loggedIn ? handleEnrollment : handleRegisterButtonClick}
         >{loggedIn ? "Enroll" : "Register" }</button>
         {showRegisterModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]" onClick={handleModalClose}>
            <div onClick={(event) => event.stopPropagation()}>
               <RegisterModal/>
            </div>
          </div>
         )
         }
      </div>


      {/* What you can expect Section */}
      <div className="flex items-center mx-auto mb-10 mt-20">
         <div className="w-[50%]">
            <img src={HorizontalLine} alt="Horizontal Line"/>
         </div>
         <div>
            <h2 className="text-4xl m-5 text-[#2C5C5C]">What you can expect from us</h2>
         </div>
      </div>
      <div>
         <div className="flex justify-center pb-10">
            <div className=" max-w-sm landing-card mx-5 pt-6">
                  <img src={NurturingImage}
                     alt="Nurturing Environment"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Nurturing<br/>Environment
                  </p>
            </div>
            <div className=" max-w-sm landing-card mx-5 pt-6">
                  <img src={ExperiencedTeacher}
                     alt="Experienced Teacher"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Experienced<br/>Teachers
                  </p>
            </div>
            <div className="max-w-sm landing-card mx-5 pt-6">
                  <img src={SmallClass}
                     alt="Small Class Sizes"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Small Class Sizes
                  </p>
            </div>
         </div>
         <div className="flex justify-center pb-10">
            <div className="max-w-sm landing-card mx-5 pt-6">
                  <img src={EngagingCurriculum}
                     alt="Small Class Sizes"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Engaging<br/>Curriculum
                  </p>
            </div>
            <div className="max-w-sm landing-card mx-5 pt-6">
                  <img src={Focus}
                     alt="Focus on Social & Emotional Development"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Focus on Social &
                  <br/>Emotional Development
                  </p>
            </div>
            <div className="max-w-sm landing-card mx-5 pt-6">
                  <img src={SafeEnvironment}
                     alt="Safe & Supportive Environment"
                     className="h-[140px] mx-auto"
                  />
                  <p className="text-center">
                  Safe & Supportive<br/>Environment
                  </p>
            </div>
         </div>
      </div>

      {/* Enroll Now Section */}
      <div className="flex justify-center pb-10 pt-10 mt-10 flex-wrap">
         <div className="mx-auto mt-20">
         <h1 className="text-5xl text-[#2C5C5C]">Enroll now in just<br/> 3 easy steps!</h1>
         </div>
         <div class="inline-block h-[290px] min-h-[1em] w-1 self-stretch bg-[#2C5C5C] opacity-100 dark:opacity-50"></div>
         <div className="mx-auto mt-5">
          <p className="mb-10">
            <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">1</span>
            <span className="text-2xl"><b> <button onClick={loggedIn ? handleRedirect : handleRegisterButtonClick} className="hover:text-[#2C5C5C] cursor-pointer"> Register</button></b> a parent account.</span></p>
          <p className="mb-10">
            <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">2</span>
            <span className="text-2xl"><b> Fill up</b> the enrollment application<br/>form for your child.</span></p>
          <p className="mb-10">
            <span className="text-[#f9f9f9] bg-[#329496] rounded-full py-2 px-4">3</span>
            <span className="text-2xl"><b> Submit the form</b> and wait for<br/>       the response.</span></p>
         </div>
      </div>

      {/* Feedback Section */}
      <div>
         <div className="flex justify-center pt-5">
            <h1 className="text-4xl m-1 text-[#2C5C5C]">What other parents say</h1>
         </div>
         <div className="flex justify-center mb-10 flex-wrap">

            <div className="flex feedback-card m-4 items-center px-5 py-5 rounded-xl">
            <img src={Parent1}
                  alt="Experienced Teacher"
                  className="h-[140px] mx-4 my-5"
               />
            <p>"Enrolling my child at Kinder Gateways was the best decision I made. The nurturing environment, experienced teachers, and engaging curriculum have truly ignited my child's love for learning. I am amazed by their progress and couldn't be happier!"</p>
            </div>

            <div className="flex feedback-card m-4 items-center px-5 py-5 rounded-xl">
            <img src={Parent2}
                  alt="Experienced Teacher"
                  className="h-[140px] mx-4 my-5"
               />
            <p>"Kinder Gateways has exceeded my expectations in every way. The focus on social and emotional development has had a profound impact on my child's confidence and overall well-being. I highly recommend this kindergarten to any parent looking for a holistic and enriching educational experience."</p>
            </div>

            <div className="flex feedback-card m-4 items-center px-5 py-5 rounded-xl">
            <img src={Parent3}
                  alt="Experienced Teacher"
                  className="h-[140px] mx-4 my-5"
               />
            <p>"Choosing Kinder Gateways for my child's education has been a game-changer. The nurturing environment and dedicated staff have created a strong foundation for my child's future. I am amazed at their growth and the lifelong friendships they have formed. It's a truly special place!"</p>
            </div>

            <div className="flex feedback-card m-4 items-center px-5 py-5 rounded-xl">
            <img src={Parent4}
                  alt="Experienced Teacher"
                  className="h-[140px] mx-4 my-5"
               />
            <p>"The small class sizes at Kinder Gateways have made a world of difference for my child. The individualized attention and personalized approach have helped my child thrive academically and socially. I am grateful for the caring and dedicated teachers who go above and beyond."</p>
            </div>

         </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]" 
        onClick={closeModal}>
          <div onClick={(event) => event.stopPropagation()}>
            <EnrollmentForm/>
          </div>
        </div>)
      }

    </div>

  )
}

export default LandingPage