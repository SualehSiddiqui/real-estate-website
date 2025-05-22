import { Container } from "react-bootstrap";
import "./style.css";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter, FaPhone, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="footer-main-div">
            <Container className="footer-container">
                <div className="upper-footer">
                    <div className="footer-sec-1">
                        <h1>RentBro.</h1>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa itaque,
                            aliquam provident pariatur blanditiis ipsa aspernatur illo aliquid eaque
                            earum ratione dolor eum amet, rem accusantium, excepturi eveniet iure
                            animi!
                        </p>
                        <div className="d-flex mt-5">
                            <Link className="social-icons">
                                <FaFacebook />
                            </Link>
                            <Link className="social-icons">
                                <FaInstagram />
                            </Link>
                            <Link className="social-icons">
                                <FaLinkedinIn />
                            </Link>
                            <Link className="social-icons">
                                <FaXTwitter />
                            </Link>
                        </div>
                    </div>
                    <div className="footer-sec-2">
                        <div className="sub-sec-1">
                            <div className="property-div">
                                <h4>Property</h4>
                                <ul>
                                    <li>
                                        <Link to={'/'} className="footer-links">Buy</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="footer-links">Rent</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="property-div">
                                <h4>Service</h4>
                                <ul>
                                    <li>
                                        <Link to={'/'} className="footer-links">About Us</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="footer-links">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="footer-links">Privacy Policies</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="footer-links">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="property-div">
                                <h4>Contact</h4>
                                <ul>
                                    <li>
                                        <Link to={'/'} className="footer-links"><FaLocationDot className="me-2" />75 3rd Ave, New York, NY 10003, USA</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="footer-links"><FaPhone className="me-2" />Phone: +1484xxx4309</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sub-sec-2">
                            <h3>News Letter</h3>
                            <input type="text" placeholder="enter you email" />
                            <button>Send</button>
                        </div>
                    </div>
                </div>
                <div className="lower-footer">
                    © 2025 | All rights reserved by Innovative Hive
                </div>
            </Container>
        </div>
    )
}

export default Footer