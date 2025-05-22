import { Container } from "react-bootstrap";
import "./style.css";
import AboutImg from "../../Assets/Section/About.png";

const About = () => {
    return (
        <div className="main-rental-div">
            <Container>
                <div className="about-sec-div">
                    <div className="about-sec-img-div">
                        <img src={AboutImg} alt="House" />
                    </div>
                    <div className="about-sec-text-div">
                        <h1 className="rentals-hd mb-4">
                            About Us
                        </h1>
                        <h1>Rent Your Perfect Square</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ut ea dicta
                            atque assumenda praesentium expedita. Illo asperiores tempore beatae, quasi natus
                            exercitationem doloribus tenetur deserunt odio possimus reiciendis quos.
                        </p>
                        <button className="booknow-btn">Book Now</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default About