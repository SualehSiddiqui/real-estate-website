import { Container } from "react-bootstrap";
import "./style.css";
import ChooseUsImg from "../../Assets/ChooseUs/choose-us-1.png";
import { AiFillSafetyCertificate  } from "react-icons/ai";
import { Ri24HoursLine } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const WhyUs = () => {
    return (
        <div className="main-rental-div">
            <Container>
                <div className="choose-us-sec-div">
                    <div className="choose-us-sec-text-div">
                        <h1 className="rentals-hd mb-4">
                            Why Choose Us?
                        </h1>
                        <ul className="choose-us-list">
                            <li> <AiFillSafetyCertificate  className="choose-us-icon mx-2" /> Secure</li>
                            <li> <Ri24HoursLine  className="choose-us-icon mx-2" /> 24/7 Customer Support</li>
                            <li> <MdRateReview  className="choose-us-icon mx-2" /> 3000+ Customer Reviews</li>
                            <li> <FaHeart  className="choose-us-icon mx-2" /> Reliable</li>
                        </ul>
                        <button className="booknow-btn mt-3">Learn More</button>
                    </div>
                    <div className="choose-us-sec-img-div">
                        <img src={ChooseUsImg} alt="House" />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default WhyUs