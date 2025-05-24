import "./style.css";
import { Navbar, Footer } from "../../Components"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignupAgent = () => {
    return (
        <>
            <div className='main-login-div'>
                <Navbar />
                <div className="login-div">
                    <Container className="login-container">
                        <form className="login-form">
                            <h2>Welcome Back</h2>
                            <label htmlFor="fullname">
                                Fullname:
                                <span>*</span>
                            </label>
                            <input autoFocus type="text" id="fullname" placeholder="Enter Your Fullname" />
                            <label htmlFor="emai">
                                Email:
                                <span>*</span>
                            </label>
                            <input type="email" id="email" placeholder="Enter Your Email" />
                            <label htmlFor="phone">
                                Phone:
                                <span>*</span>
                            </label>
                            <input type="text" id="phone" placeholder="Enter Your Phone" />
                            <label htmlFor="address">
                                Address:
                                <span>*</span>
                            </label>
                            <input type="text" id="address" placeholder="Enter Your office address" />
                            <label htmlFor="password">
                                Password:
                                <span>*</span>
                            </label>
                            <input type="password" id="password" placeholder="Enter Your Password" />
                            <button className="mt-3" type="submit">Sign Up</button>
                            <Link to={'/login-as-agent'} className="login-page-link">
                                Already have an Account?
                            </Link>
                        </form>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignupAgent;