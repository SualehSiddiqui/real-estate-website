import "./style.css";
import { Navbar, Footer } from "../../Components"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginAgent = () => {
    return (
        <>
            <div className='main-login-div'>
                <Navbar />
                <div className="login-div">
                    <Container className="login-container">
                        <form className="login-form">
                            <h2>Welcome Back!</h2>
                            <label htmlFor="fullname">
                                Fullname:
                                <span>*</span>
                            </label>
                            <input autoFocus type="text" id="fullname" placeholder="Enter Your Fullname" />
                            <label htmlFor="password">
                                Password:
                                <span>*</span>
                            </label>
                            <input type="password" id="password" placeholder="Enter Your Password" />
                            <Link className="login-page-link text-start">
                                Forgot your password?
                            </Link>
                            <button type="submit">Login</button>
                            <Link to={'/signup-as-agent'} className="login-page-link">
                                Create New Account
                            </Link>
                        </form>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoginAgent;