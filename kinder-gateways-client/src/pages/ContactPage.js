import React, {useState} from "react"
import ContactUs from "../assets/Contact_Us.png"
import axios from "axios";


const ContactPage = () => {
  const [inquiry, setInquiry] = useState({
    name : '',
    number : '',
    email : '',
    subject : '',
    message : ''
  })
  let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(inquiry.email);
  let numberValidation = /^9\d{9}$/.test(inquiry.number);

  const handleValues = (event) => {
    setInquiry({...inquiry, [event.target.name]:event.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(inquiry.name.trim() === '' ||
      inquiry.number.trim() === '' ||
      inquiry.email.trim() === '' ||
      inquiry.subject.trim() === '' ||
      inquiry.message.trim() === ''){
        alert('Do not leave any fields blank')
      } else if (!emailValidation || !numberValidation){
        alert('Please enter correct email address and/or phone number')
      } else {
        try{
          const response = await axios.post('http://localhost:3001/contact/inquiry', inquiry)
          alert('Your message has been submitted. We will response within 24 hours.')
          window.location.reload();
        }catch(error){
          alert('Server error.')
        }
      }
  }

   return (
    <div className="d-flex max-w-[1240px] mx-auto mt-10">
      <div className="w-[50%] mx-auto">
          <h2 className="text-center text-5xl mb-10 font-bold text-[#2C5C5C]">Contact Us</h2>
          <p className="text-center mb-10">Email us with any questions or inquiries or may call +63 912 345 6789. We would be happy to answer your questions and set-up a meeting with you.</p>
      </div>
      <div className="flex mb-10 flex-wrap">
        <div className="flex max-w-[1240px] mx-auto mt-1">
          <form className="flex flex-col bg-[#EEF4F4] h-[auto] w-[auto] rounded-xl px-10 py-8 my-5 text-sm border shadow-xl" action=''>
                <div className="flex justify-between flex-wrap">
                      <div className="flex flex-col mr-4">
                          <label>Name</label>
                          <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="name" onChange={handleValues}/>   
                      </div>
                      <div className="flex flex-col">
                          <label>Phone Number</label>
                          <input type="text" name="number" className="px-3 py-2 my-2 bg-[#32949620]" onChange={handleValues}/>
                      </div>
                </div>
                <label>Email Address</label>
                <input type="email" className="px-3 py-2 my-2 bg-[#32949620]" name="email" onChange={handleValues}/>
                <label>Subject</label>
                <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="subject" onChange={handleValues}/>
                <label>Message</label>
                <textarea className="px-3 py-2 my-2 bg-[#32949620]" name="message" rows="6" cols="50" onChange={handleValues}/> 
                <button className="w-[120px] rounded-full bg-[#2C5C5C] text-[#f9f9f9] py-2 hover:bg-[#329496] mx-auto mt-8" onClick={handleSubmit}>Send Email</button>
          </form>
        </div>
        <div className="my-auto mx-auto">
          <img src={ContactUs} alt="Contact Page" className="rounded-3xl"/>
        </div>
      </div>
    </div>   
   )
};

export default ContactPage;
