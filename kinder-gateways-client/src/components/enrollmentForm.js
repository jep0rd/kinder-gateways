import '../App.css';
import React, {useEffect, useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EnrollmentForm = () => {
  
  const [maxDate, setMaxDate] = useState(getMaxDate());
  const [incForm, setIncData] = useState(false)
  const [validNum, isNumValid] = useState(true);
  const [emailValid, isEmailValid] = useState(true);
  const navigate = useNavigate();
  // variable that will store the form data
  const [studentData, setValues] = useState({
  firstname : '',
  lastname : '',
  gender : '',
  birthdate : '',
  religion : '',
  sy: '',
  parent_firstname : '',
  parent_lastname : '',
  parent_gender : '',
  parent_number : '',
  parent_address : '',
  parent_email : '',
  id: ''
  })

  // email validation
  let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(studentData.parent_email);
  // phone number validation
  let numberValidation = /^9\d{9}$/.test(studentData.parent_number);

  // function for collecting the input data
  const handleStudentData = (event) => {
    setValues({...studentData, [event.target.name]:event.target.value});
  }

  // age limit
  function getMaxDate() {
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    const year = fiveYearsAgo.getFullYear();
    let month = fiveYearsAgo.getMonth() + 1;
    let day = fiveYearsAgo.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  // auto fill
  useEffect( () => {
    axios.get('http://localhost:3001/profile')
    .then((response) => {
      let data = response.data[0];
      setValues((formData) => ({
        ...formData, parent_firstname: data.first_name, parent_lastname: data.last_name, parent_gender: data.gender, parent_number: data.phone_number, parent_address: data.address, parent_email: data.email_address, id: data.user_id
      }))
    })
    .catch((error) => {
      console.log('Server Error')
    })
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if( studentData.firstname.trim() === '' ||
      studentData.lastname.trim() === '' ||
      studentData.gender.trim() === '' ||
      studentData.birthdate.trim() === '' ||
      studentData.religion.trim() === '' ||
      studentData.sy.trim() === '' ||
      studentData.parent_firstname.trim() === '' ||
      studentData.parent_lastname.trim() === '' ||
      studentData.parent_gender.trim() === '' ||
      studentData.parent_number.trim() === '' ||
      studentData.parent_address.trim() === '' ||
      studentData.parent_email.trim() === ''){
        setIncData(true)
      } else if(!emailValidation || !numberValidation){
        !emailValidation ? isEmailValid(false) : isEmailValid(true);
        !numberValidation ? isNumValid(false) : isNumValid(true);
        setIncData(false)
      } else {
        try{
          const response = axios.post('http://localhost:3001/enrollment', studentData)
          alert('The enrollment form has been submitted. Visit your profile page to check for update.')
          window.location.reload();
          setIncData(false)
          isEmailValid(true)
          isNumValid(true)
        }catch(error){
          alert('Server Error.')
        }
      }
  }

  return (
    <>
    <form className="enrollment-form flex flex-col bg-[#f9f9f9] w-screen max-w-lg rounded px-10 py-8 text-sm" action='/' method='POST'>

      <div className="flex flex-col">
        <h1 className="text-center text-2xl mb-10 font-bold">ENROLLMENT FORM</h1>
        <small className={incForm ? "text-error" : "hide"}>Do not leave any fields blank</small>
        {/* Child Information */}
        <div className="flex justify-between mb-5">
          <h2 className='text-center text-lg font-bold'>
            CHILD INFORMATION
          </h2>
          <div className='bg-[#2C5C5C] w-52 h-px self-center'>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-52">
              <label>First Name</label>
              <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="firstname" onChange={handleStudentData}/>
          </div>
          <div className="flex flex-col w-52">
              <label>Last Name</label>
              <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="lastname" onChange={handleStudentData}/>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
              <label>Gender</label>
              <select name="gender" onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]">
                <option value="" selected disabled>---</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
          </div>
          <div className="flex flex-col w-52">
              <label>Birthdate</label>
              <input type="date" name="birthdate" max={maxDate} onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]"/>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
              <label>School Year</label>
              <select name="sy"  onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]">
                <option value="" selected disabled>---</option>
                <option value="2023">2023</option>
                <option value="2023">2024</option>
              </select>
          </div>
          <div className="flex flex-col w-52">
              <label>Religion</label>
              <input type="text" name="religion" onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]"/>
          </div>
        </div>

        {/* Parent Information */}
        <div className="flex justify-between mb-5 mt-10">
          <div className='bg-[#2C5C5C] w-52 h-px self-center'>
          </div>
          <h2 className='text-center text-lg font-bold'>
            PARENT INFORMATION
          </h2>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-52">
              <label>First Name</label>
              <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="parent_firstname" value={studentData.parent_firstname} onChange={handleStudentData}/>
          </div>
          <div className="flex flex-col w-52">
              <label>Last Name</label>
              <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="parent_lastname" value={studentData.parent_lastname} onChange={handleStudentData}/>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
              <label>Gender</label>
              <select name="parent_gender" value={studentData.parent_gender} onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]">
                <option value="" selected disabled>---</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
          </div>
          <div className="flex flex-col w-52">
              <label>Phone Number</label>
              <input type="number" name="parent_number" value={studentData.parent_number} onChange={handleStudentData} className="px-3 py-2 my-2 bg-[#32949620]"/>
              <small className={!validNum ? "text-error display mb-2" : "hide"}>Phone number must start with '9' followed by nine-digit number</small>
          </div>
        </div>
        <label>Home Address</label>
        <input type="text" className="px-3 py-2 my-2 bg-[#32949620]" name="parent_address" value={studentData.parent_address} onChange={handleStudentData}/>
        <label>Email Address</label>
        <input type="parent_email" className="px-3 py-2 my-2 bg-[#32949620]" name="parent_email" value={studentData.parent_email} onChange={handleStudentData}/>
        <small className={!emailValid ? "text-error display mb-2" : "hide"}>Please enter correct email address</small>
        <button onClick={handleSubmit} className="w-[120px] rounded-full bg-[#2C5C5C] text-[#f9f9f9] py-2 hover:bg-[#329496] mx-auto mt-8">Submit</button>
      </div>
    </form>  
    </>
  )
}

export default EnrollmentForm;