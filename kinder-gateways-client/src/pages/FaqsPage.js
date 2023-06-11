import React from "react";
import { Link } from "react-router-dom";
import ArrowHead from "../assets/Arrow_Head.png";

const FaqsPage = () => {

    return (
        <div className="d-flex max-w-[1240px] mx-auto mt-10">
            <div className="d-flex w-[75%] justify-center mx-auto mb-20">
                <h1 className="text-center text-6xl font-bold text-[#2C5C5C]">Frequently Asked Questions</h1>
                <br/>
                <br/>

                <p>
                We appreciate that parents/carers who are new to our school will have many questions and concerns. Staff at the school are often asked questions in relation to your child’s education, school timings, procedures and a myriad of other topics. Here you can find answers to frequently asked questions.</p>
                <br/>

                <p>If your particular question is not answered here then please do contact the school via our
                <Link exact to="/contact"> <span className="font-bold text-[#FCBE1D] underline">Contact Us</span></Link> page.</p>
            </div>

            <div className="d-flex w-[75%] mb-10 justify-center mx-auto">
                <div className="list">
                    <div className="d-flex justify-center items-center px-5 py-5 my-3 rounded-xl bg-[#EFF4F4] shadow-md">
                        <div className="d-flex justify-center items-center">
                            <input type="checkbox" id="input" className="absolute peer opacity-0"/>
                            <img src={ArrowHead}
                            alt="Arrow"
                            className="h-[15px] mt-2 peer-checked:rotate-90 absolute duration-200"
                            />
                            <label for="input" className="w-full ml-5 text-lg peer-checked:font-bold hover:cursor-pointer">            
                            Application Process
                            </label>

                            <div className="overflow-hidden max-h-0 peer-checked:max-h-full">
                                <p className="text-[#2C5C5C] mt-3 mb-4 font-bold "><span className="text-[#FCBE1D] text-lg">Q:</span> I am a new enrollee. What are the procedures for enrollment?
                                </p>
                                <p className="mb-10">
                                <span className="text-[#2C5C5C] font-bold text-lg">A:</span> Please click this <Link exact to="/admissions" className="font-bold underline">link.</Link>
                                </p>

                                <p className="text-[#2C5C5C] font-bold mb-4"><span className="text-[#FCBE1D] text-lg">Q:</span> The system displays the error message "Record Already Exists," despite the fact that I have not yet submitted an enrollment application.
                                </p>
                                <p className="mb-10">
                                <span className="text-[#2C5C5C] font-bold text-lg">A:</span> Please send an email with your student number, full name, and screenshot of the error message to the Education Management Information Systems office (kindergateways@kg.edu.ph) <span className="text-[red]">IMMEDIATELY.</span>
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold "><span className="text-[#FCBE1D] text-lg">Q:</span> How will I know if I am officially enrolled?
                                </p>
                                <p className="mb-10">
                                <span className="text-[#2C5C5C] font-bold text-lg">A:</span> Once our Registrar offices have approved your enrollment application, you will receive a confirmation email with your registration (including section and schedule).
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold "><span className="text-[#FCBE1D] text-lg">Q:</span> I've decided to enroll to another school; can I cancel my enrollment application?
                                </p>
                                <p className="mb-1">
                                <span className="text-[#2C5C5C] font-bold text-lg">A:</span> If your enrollment application is still in the "Pending" status, simply send an email to the Education Management Information Systems office (kindergateways@kg.edu.ph) and the officers will delete your application.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-center items-center px-5 py-5 my-3 rounded-xl bg-[#EFF4F4] shadow-md">
                        <div className="d-flex justify-center items-center">
                            <input type="checkbox" id="input1" className="absolute peer opacity-0"/>
                            <img src={ArrowHead}
                            alt="Arrow"
                            className="h-[15px] mt-2 peer-checked:rotate-90 absolute duration-200"
                            />
                            <label for="input1" className="w-full ml-5 text-lg peer-checked:font-bold hover:cursor-pointer">            
                            School
                            </label>

                            <div className="overflow-hidden max-h-0 peer-checked:max-h-full">
                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> How many students do you have?
                                </p>
                                <p className="mb-10">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> 250 students as of December 2022.
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> What kind of food is served?
                                </p>
                                <p className="mb-10">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> Freshly prepared and healthy options are available for every meal. Dietary requirements can be catered for, please let us know and we can discuss this further.
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> What is the kind of security offered to the students?
                                </p>
                                <p className="mb-1">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> The school has installed CCTV in all classrooms. Students are always accompanied by teachers or the class monitors when they are moving from one block to the other.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-center items-center px-5 py-5 my-3 rounded-xl bg-[#EFF4F4] shadow-md">
                        <div className="d-flex justify-center items-center">
                            <input type="checkbox" id="input4" className="absolute peer opacity-0"/>
                            <img src={ArrowHead}
                            alt="Arrow"
                            className="h-[15px] mt-2 peer-checked:rotate-90 absolute duration-200"
                            />
                            <label for="input4" className="w-full ml-5 text-lg peer-checked:font-bold hover:cursor-pointer">            
                            Uniform
                            </label>

                            <div className="overflow-hidden max-h-0 peer-checked:max-h-full">
                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> Where can I buy school uniform from?
                                </p>
                                <p className="mb-10">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> School uniform is available from our school Store. They are open monday to friday from 8am to 5pm.
                                    <br/>
                                    <b>Contact Information:</b>
                                    <br/>
                                    Phone: +63 912 345 6789
                                    <br/>
                                    Email: sales@kgsales.com
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> Can my child wear jewellery in school?
                                </p>
                                <p className="mb-1">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> We ask that pupils do not wear jewellery in school. Schools are busy places and we find that jewellery can cause unnecessary accidents.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-center items-center px-5 py-5 my-3 rounded-xl bg-[#EFF4F4] shadow-md">
                        <div className="d-flex justify-center items-center">
                            <input type="checkbox" id="input2" className="absolute peer opacity-0"/>
                            <img src={ArrowHead}
                            alt="Arrow"
                            className="h-[15px] mt-2 peer-checked:rotate-90 absolute duration-200"
                            />
                            <label for="input2" className="w-full ml-5 text-lg peer-checked:font-bold hover:cursor-pointer">            
                            Medical / Health Issues
                            </label>

                            <div className="overflow-hidden max-h-0 peer-checked:max-h-full">
                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> What do I do if my child is prescribed medication?
                                </p>
                                <p className="mb-10">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> If your child needs to have medication at school you must complete a form at the school office. We ask that medication at school is kept to a minimum and if antibiotics are prescribed for less than four times a day we suggest this can be organised out of school time.
                                    <br/><br/>All medication held on school premises is kept locked and secure.
                                </p>

                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> What happens if my child has an accident at school?
                                </p>
                                <p className="mb-1">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> All Teaching Assistants are first aid trained and can offer reassurance and first aid to pupils who are injured at school.
                                    <br/><br/>If the injury is significant we would inform parents and appropriate first aid would be given and of course any serious injury we would involve the medical services as soon as possible.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-center items-center px-5 py-5 my-3 rounded-xl bg-[#EFF4F4] shadow-md">
                        <div className="d-flex justify-center items-center">
                            <input type="checkbox" id="input3" className="absolute peer opacity-0"/>
                            <img src={ArrowHead}
                            alt="Arrow"
                            className="h-[15px] mt-2 peer-checked:rotate-90 absolute duration-200"
                            />
                            <label for="input3" className="w-full ml-5 text-lg peer-checked:font-bold hover:cursor-pointer">            
                            Co-curricular Activities
                            </label>

                            <div className="overflow-hidden max-h-0 peer-checked:max-h-full">
                                <p className="text-[#2C5C5C] mb-4 font-bold mt-3"><span className="text-[#FCBE1D] text-lg">Q:</span> How do I find out what activities I can do after school?
                                </p>
                                <p className="mb-1">
                                    <span className="text-[#2C5C5C] font-bold text-lg">A:</span> Activities change every term. There will be a really large selection of options, meaning there is something for everyone. A copy of the choices is sent to parents every term with the option to sign up straight away. At the start of term, one tutor session is dedicated to choosing activities to make sure everyone has signed up or can ask any questions if they’re unsure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>

            <div className="d-flex w-[75%] justify-center mx-auto my-20">
                <h1 className="text-center text-3xl font-bold text-[#2C5C5C]">Still need help?</h1>
                <br/>

                <p>
                If you have not found the answer to your question, please follow the link to our Contact Us page where you can request answers via our contact form. If your issue is urgent then telephone details are also available.</p>
                <br/>

                <p className="text-center">
                <Link exact to="/contact" className="rounded-lg bg-[#2C5C5C] text-[#f9f9f9] px-10 py-3 hover:bg-[#329496] cursor-pointer">Contact Us</Link>
                </p>
            </div>

        </div>
    )
}

export default FaqsPage