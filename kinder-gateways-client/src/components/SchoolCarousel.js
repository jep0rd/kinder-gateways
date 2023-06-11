import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import School1 from "../assets/School1.jpg"
import School2 from "../assets/School2.jpg"
import School3 from "../assets/School3.jpg"
import School4 from "../assets/School4.jpg"

export default function CarouselComponent() {
    return (
		<div className="flex about-css justify-center items-center mb-10 mx-5 mt-3">
		<Carousel infiniteLoop useKeyboardArrows autoPlay>
			<div>
				<img src={School1} alt="School1" className="rounded-xl"/>
			</div>
			<div>
				<img src={School2} alt="School2" className="rounded-xl"/>
			</div>
			<div>
				<img src={School3} alt="School3" className="rounded-xl"/>
			</div>
			<div>
				<img src={School4} alt="School4" className="rounded-xl"/>
			</div>
		</Carousel>
		</div>
    );
}