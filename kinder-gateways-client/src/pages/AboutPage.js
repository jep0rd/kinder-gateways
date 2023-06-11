import React from "react";
import CarouselComponent from "../components/SchoolCarousel"

const AboutPage = () => {

    return (
        <div className="d-flex max-w-[1240px] mx-auto mt-10">
            <div>
                <h1 className="text-center text-6xl font-bold text-[#2C5C5C]">About our School</h1>
                <br/>
                <br/>
            </div>
            <div className="flex justify-center mx-auto mb-20 flex-wrap">
                <div className="about-css">
                <p><b><span className="text-[#FCBE1D]">Kinder </span>Gateways</b> provides children with the opportunity to develop a lifelong love of learning. The pupils benefit from small class sizes and an exciting inquiry-based curriculum.
                </p>
                <br/>

                <p>
                Inspirational teaching is complemented by an extensive co-curricular activity programme and we provide plenty of opportunities for children to develop their own interests and skills.
                </p>
                <br/>

                <p>
                Those visiting our Preparatory School often reflect upon the confidence and enthusiasm of our children. They exude a love of learning and this is reflected in their inquisitive nature and joyous determination to understand the world around them. Above all else, our children are happy and they treat each other with respect, kindness and compassion.
                </p>
                <br/>

                <p>
                All of our staff are committed to knowing each child as an individual and our parents become part of our wonderfully warm and vibrant community. Outstanding care underpins all aspects of a child’s journey at Kinder Gateways and our holistic approach ensures that well-being is nurtured and self-confidence developed. We are more than just a School; we are a family.
                </p>
                <br/>
                </div>
                <CarouselComponent/>
            </div>

            <div className="d-flex w-[75%] justify-center mx-auto mb-20 text-center">
                <h1 className="text-6xl font-bold text-[#2C5C5C]">Our Mission and Vision</h1>
                <br/>
                <br/>
                <div>
                <h2 className="text-2xl font-bold">SHAPING LIVES, INSPIRING EXCELLENCE</h2>
                <p>It is our mission to inspire young people to develop a life-long love of learning within a
                <br/>pastorally nurturing, culturally exciting and intellectually creative community.</p>
                <br/>

                <h2 className="text-2xl font-bold">OUR VISION</h2>
                <p>The School is committed to inspiring young people to develop their potential by providing
                <br/>them with a first class educational experience within the context of an intellectually exciting and culturally creative community.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage