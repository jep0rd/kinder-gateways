import React, {useState,useEffect} from "react";
import '../App.css';
import axios from "axios";
import EnrollmentForm from "../components/enrollmentForm";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const [showStudent, setShowStudent] = useState(false);
  const [validNum, isNumValid] = useState(true);
  const [displayRes, setRes] = useState(false);
  const [allowEdit, isEditAllowed] = useState(false);
  const [matchPass, setMatchPass] = useState(true);
  const [passValid, isPassValid] = useState(true);
  const [emailValid, isEmailValid] = useState(true);
  const [emailAvail, isEmailAvail] = useState(true);
  const [showEnroll, setShowEnroll] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showDeclined, setShowDeclined] = useState(false);
  const [showStudInfo, setShowStudInfo] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [emailValidC, isEmailValidC] = useState(true);
  const [validNum2, isNumValid2] = useState(true);
  const [values, setValues] = useState({
    firstname : '',
    lastname : '',
    mobile : '',
    address : '',
    id : ''
  });

  const [secValues, setSecValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
    id : ''
  });

  const [contactInfo, setContactInfo] = useState({
    firstname : '',
    lastname : '',
    gender : '',
    mobile : '',
    address : '',
    email : '',
    status : 'approved',
    id : ''
  })

  const capitalizeFirstLetter = (x) => {
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };


  // password validation
  let passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/g.test(secValues.password);
  // email validation
  let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(secValues.email);
  let emailValidation2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(contactInfo.email);
  // phone number validation
  let numberValidation = /^9\d{9}$/.test(values.mobile);
  let numberValidation2 = /^9\d{9}$/.test(contactInfo.mobile);
  
  const enrollBtn = () => {
    setShowModal(true)
  }

  const userAccount = () => {
    setShowUser(true);
    setShowStudent(false);
  }

  const studentInfo = () => {
    setShowStudent(true);
    setShowUser(false);
  }
  const handleValues = (event) => {
    setValues({...values, [event.target.name]:event.target.value});
  }

  const handleSecValues = (event) => {
    setSecValues({...secValues, [event.target.name]:event.target.value});
  }

  const handleContactValues = (event) => {
    setContactInfo({...contactInfo, [event.target.name]:event.target.value});
  }

  const handleEdit = () => {
    isEditAllowed(true);
  }

  const cancelEdit = () => {
    isEditAllowed(false);
    setSecValues(() =>({
      password : '', confirm_password : ''
    }))
    setMatchPass(true);
    isEmailValid(true);
    isPassValid(true);
  }

  const submitValues = async () => {

    if( values.firstname.trim() === '' ||
      values.lastname.trim() === '' ||
      values.mobile.trim() === '' ||
      values.address.trim() === ''){
        alert('Do not leave any fields blank')
        setRes(false)
    } else if(!numberValidation){
        isNumValid(false)
        setRes(false)
    } else {
      try{
        const response = await axios.put('http://localhost:3001/profile/update', values);
        isNumValid(true)
        setRes(true)

      } catch(error){
        alert(error.message)
        setRes(false)
      }
    }
  }

  const updateContactInfo = async () => {
    if( contactInfo.firstname.trim() === '' ||
        contactInfo.lastname.trim() === '' ||
        contactInfo.gender.trim() === '' ||
        contactInfo.mobile.trim() === '' ||
        contactInfo.address.trim() === '' ||
        contactInfo.email.trim() === ''){
      alert('Do not leave any fields blank')
    } else if (!emailValidation2 || !numberValidation2){
      !emailValidation2 ? isEmailValidC(false) : isEmailValidC(true);
      !numberValidation2 ? isNumValid2(false) : isNumValid2(true);
    } else {
      try{
        const response = axios.put('http://localhost:3001/profile/contact/update', contactInfo);
        alert('Successfully saved the changes.')
        isNumValid2(true)
        isEmailValidC(true)
      } catch(error){
        alert('Server Error.')
        isNumValid2(true)
        isEmailValidC(true)
      }
    }
  }

  const submitSecValues = async () => {
    if( secValues.email.trim() === '' ||
      secValues.password.trim() === '' ||
      secValues.confirm_password.trim() === ''){
        alert('Do not leave any fields blank')
        isEmailAvail(true)
    } else if (!emailValidation || !passValidation){
      !passValidation ? isPassValid(false) : isPassValid(true);
      !emailValidation ? isEmailValid(false) : isEmailValid(true);
      setMatchPass(true);
      isEmailAvail(true);
    } else if(secValues.password !== secValues.confirm_password){
      setMatchPass(false);
      isPassValid(true);
      isEmailValid(true);
      isEmailAvail(true);
    } else {
      const confirmSubmit = window.confirm('You will be logged out once the changes have been made.')
      if(confirmSubmit){
        try{
          const response1 = await axios.put('http://localhost:3001/profile/update/security', secValues);
          alert('Successfully saved the changes.')
          setMatchPass(true);
          isPassValid(true);
          isEmailValid(true);
          isEmailAvail(true)
          localStorage.setItem('account', JSON.stringify({ 'email': secValues.email}));

          if(response1.statusText === "OK") {
            const response2 = await axios.put('http://localhost:3001/logout', secValues);
            localStorage.setItem('login', false);
            localStorage.setItem('account', '');
            window.location.reload();
          }
          
        } catch(error) {
          isEmailAvail(false);
          setMatchPass(true);
          isPassValid(true);
          isEmailValid(true);
        }
      }
    }
  }
  
    useEffect( () => {
      axios.get('http://localhost:3001/profile')
      .then((response) => {
        const data = response.data[0];
        console.log(data);
        setValues((values) => ({
          ...values, firstname : data.first_name, lastname : data.last_name, mobile : data.phone_number, address : data.address, id : data.user_id
        }))
        setSecValues((values) => ({
          ...values, email : data.email_address, id : data.user_id
        }))
      })
      .catch((error) => {
        console.log(error)
      })
    }, [allowEdit])

    useEffect( () => {
      axios.get('http://localhost:3001/profile/student')
      .then((response) => {
        if(response.data.length > 0 ){
          setStudentData(response.data[0]);
          const data = response.data[0];
          setContactInfo((values) => ({
            ...values, firstname : data.parent_first_name, lastname : data.parent_last_name, gender : data.parent_gender, mobile : data.parent_number, address : data.parent_address, email : data. parent_email, id : data.student_id
          }))

          setShowEnroll(false);
          if (data.enrollment_status == "pending"){
            setShowStatus(true);
            setShowPending(true);
            setShowDeclined(false);
            setShowStudInfo(false)
          } else if (data.enrollment_status == "declined") {
            setShowStatus(true);
            setShowPending(false);
            setShowDeclined(true);
            setShowStudInfo(false)
          } else {
            setShowStatus(false);
            setShowDeclined(false);
            setShowPending(false);
            setShowStudInfo(true)
          }
        } else{
          setShowStatus(false);
          setShowEnroll(true);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }, [showStudent])


  const closeModal = () => {
    setShowModal(false)
  }
  return(
    <>
      <div className="profile-container my-24">
        <div className="btn-container mb-5">
          <button className={showUser ? "account-btn shadow-xl selected" : "account-btn shadow-xl"} onClick={userAccount}>USER ACCOUNT</button>
          <button className={showStudent ? "student-btn shadow-xl selected" : "student-btn shadow-xl"} onClick={studentInfo}>STUDENT INFORMATION</button>
        </div>
        {showUser &&
        <div className="display-profile bg-[#EEF4F4] max-w-[800px] shadow-xl">
          <div><h1 className="text-2xl font-black mb-10">Account Settings</h1></div>
          <div className="flex flex-col max-w-[700px] self-center">
            <div className="flex justify-between space-x-5 mb-5">
              <div className="flex flex-col">
                <label for="firstname"> First Name </label>
                <input type="text" name="firstname" className="bg-[#D6E8E8] h-8 py-2 px-3 w-[225px]" onChange={handleValues} value={values.firstname}/>
              </div>
              <div className="flex flex-col">
                <label for='lastname'> Last Name </label>
                <input type="text" name="lastname" className="bg-[#D6E8E8] h-8 py-2 px-3 w-[225px]" onChange={handleValues} value={values.lastname}/>
              </div>
            </div>
            <label for='address'> Address </label>
            <input type="text" name="address" className="bg-[#D6E8E8] h-8 py-2 px-3 mb-5" onChange={handleValues} value={values.address}/>
            <div className="flex justify-between space-x-5 mb-10">
              <div className="flex flex-col">
                <label for='mobile'> Phone Number </label>
                <input type="number" name="mobile" className="bg-[#D6E8E8] h-8 py-2 px-3 w-[225px]" onChange={handleValues} value={values.mobile}/>
                <small className={!validNum ? "text-error display mb-2" : "hide"}>Phone number must start with '9' followed by nine-digit number</small>
                
              </div>
            </div>
            <div className="flex space-x-5 mb-10">
              <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" onClick={submitValues}>Save Changes</button>
              {displayRes && <small className="text-[green] self-center">Successfully updated the information!</small>}
            </div>

            {/* account security */}
            <div className="flex flex-col account-security mb-5">
              <div><h1 className="text-xl font-black mb-5">Account Security</h1></div>
              <div className="flex flex-col">
                <label for='email'> Email </label>
                <input type="email" name="email" className="bg-[#EEF4F4] h-8 py-2 px-3 mb-5" onChange={handleSecValues} value={secValues.email} disabled={allowEdit ? false : true}/>
                <small className={!emailValid ? "text-error display mb-2" : "hide"}>Please enter correct email address</small>
                <small className={!emailAvail ? "text-error display mb-2" : "hide"}>This email address is not available.</small>
              </div>
              <div className="flex justify-between space-x-5">
                <div className="flex flex-col">
                  <label for='password'> Password </label>
                  <input type="password" name="password" className="bg-[#EEF4F4] h-8 py-2 px-3 w-[225px]" onChange={handleSecValues} value={secValues.password} disabled={allowEdit ? false : true}/>
                </div>
                {allowEdit &&
                <div className="flex flex-col">
                  <label for='confirm_password'> Confirm Password </label>
                  <input type="password" name="confirm_password" className="bg-[#EEF4F4] h-8 py-2 px-3 w-[225px]" onChange={handleSecValues} value={secValues.confirm_password} disabled={allowEdit ? false : true}/>
                </div>
                }
              </div>
              <small className={matchPass ? "hide" : "text-error"}>Passwords do not match</small>
              <div className={!passValid ? "text-error display mb-5" : "hide"}>
                <small className="text-error">Password must be between 8-15 characters long and contain at least:</small>
                <ul className="list-disc list-inside">
                  <li><small>One lowercase letter</small></li>
                  <li><small>One uppercase letter</small></li>
                  <li><small>One digit</small></li>
                </ul>
              </div>
              <div className="flex justify-between space-x-5">
              {allowEdit ?
              <div className="space-x-5 mt-10">
                <button className="text-lg" onClick={cancelEdit}>Cancel</button>
                <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" onClick={submitSecValues}>Save</button>
              </div> : 
              <button className="mt-10 rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" onClick={handleEdit
              }>Change</button>}
              </div>
            </div>
          </div>

        </div>}
        {showStudent &&
          <div className="display-profile bg-[#EEF4F4] max-w-[800px] shadow-xl">
            <div>
              <h1 className="text-2xl font-black mb-10">Student Information</h1>
            </div>

            {showEnroll &&
              <div className="flex flex-col max-w-[700px] self-center">
                <small className="text-black mb-2">No student enrolled yet</small>
                <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" onClick={enrollBtn}>Enroll</button>
              </div>
            }
            {showStatus &&
              <div className="flex flex-col max-w-[700px] self-center">
                <h2 className="text-black mb-2 text-xl font-bold self-center">APPLICATION STATUS:</h2>
                {showPending &&
                  <h1 className="text-[rgb(252,190,29)] self-center text-2xl font-extrabold">PENDING</h1>
                }
                {showDeclined &&
                  <h1 className="text-error self-center text-2xl font-extrabold">DECLINED</h1>
                }
                <small className="mt-5 self-center">Should you have any questions, please <Link exact to="/contact" className="font-bold">contact us</Link>.</small>
              </div>
            }
            {showStudInfo &&
              <> 
                <div className="flex flex-col max-w-[500px] mx-auto">
                  <div className="flex flex-col">
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2">Name</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {capitalizeFirstLetter(studentData.student_first_name) + " " + capitalizeFirstLetter(studentData.student_last_name)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2">Gender</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {capitalizeFirstLetter(studentData.gender)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2 ">Birthdate</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {formatDate(studentData.birthdate)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2">Religion</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {capitalizeFirstLetter(studentData.religion)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2 ">School Year</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {studentData.school_year}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2">Section</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {capitalizeFirstLetter("TBA")}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="min-w-[180px] font-semibold text-center py-1 border-2">Payment</span>
                      <span className="self-center px-6 py-1 border-x- border-2 bg-[#DEEBEC] grow text-center">
                        {capitalizeFirstLetter(studentData.payment)}
                      </span>
                    </div>
                  </div>
                  <small className="mt-2 mb-10">If there is a need to update any of the student information, kindly <Link exact to="/contact" className="font-bold">contact us</Link>.</small>
                </div>

                <div className="flex flex-col p-5 bg-[#DEEBEC] mb-5 max-w-lg self-center rounded-[10px]">
                  <div>
                    <h1 className="text-xl font-black mb-5">Contact Information</h1>
                  </div>
                  <div className="flex justify-between space-x-5 mb-5">
                    <div className="flex flex-col">
                      <label for="firstname"> First Name </label>
                      <input type="text" name="firstname" className="bg-[#EEF4F4] h-8 py-2 px-3 w-[225px]" onChange={handleContactValues} value={contactInfo.firstname}/>
                    </div>
                    <div className="flex flex-col">
                      <label for='lastname'> Last Name </label>
                      <input type="text" name="lastname" className="bg-[#EEF4F4] h-8 py-2 px-3 w-[225px]" onChange={handleContactValues} value={contactInfo.lastname}/>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-5 mb-5">
                    <div className="flex flex-col">
                      <label>Gender</label>
                      <select name="gender" onChange={handleContactValues} value={contactInfo.gender} className="h-8 py-1 px-3 bg-[#EEF4F4]">
                        <option value="female" selected={(contactInfo.gender == 'female') && true}>Female</option>
                        <option value="male" selected={(contactInfo.gender == 'male') && true}>Male</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label for='mobile'> Phone Number </label>
                      <input type="number" name="mobile" className="bg-[#EEF4F4] h-8 py-2 px-3 w-[225px]" onChange={handleContactValues} value={contactInfo.mobile}/>
                      <small className={!validNum2 ? "text-error display mb-2 w-[225px]" : "hide"}>Phone number must start with '9' followed by nine-digit number</small>
                    </div>
                  </div>
                  <label for='address'> Home Address </label>
                  <input type="text" name="address" className="bg-[#EEF4F4] h-8 py-2 px-3 mb-5" onChange={handleContactValues} value={contactInfo.address}/>

                  <div className="flex flex-col">
                    <label for='email'> Email </label>
                    <input type="email" name="email" className="bg-[#EEF4F4] h-8 py-2 px-3 mb-10" onChange={handleContactValues} value={contactInfo.email}/>
                    <small className={!emailValidC ? "text-error display mb-2" : "hide"}>Please enter correct email address</small>
                  </div>
                  <div className="flex space-x-5 mb-10">
                    <button className="rounded-full bg-[#2C5C5C] text-[#f9f9f9] px-7 py-0.5 hover:bg-[#329496]" onClick={updateContactInfo}>Save Changes</button>
                    {displayRes && <small className="text-[green] self-center">Successfully updated the information!</small>}
                  </div>
                </div>
              </>
            }
          </div>
        }
      </div>


      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]" 
        onClick={closeModal}>
          <div onClick={(event) => event.stopPropagation()}>
            <EnrollmentForm/>
          </div>
        </div>)
      }  
    </>
  )
};

export default Profile;