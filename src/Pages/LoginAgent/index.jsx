import "./style.css";
import { Navbar, Footer } from "../../Components"
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../Services/auth.js";
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from "../../Store/authSlice.js";
import { show, hide } from "../../Store/spinnerSlice.js";
import Cookies from "js-cookies";
import Swal from "sweetalert2";

const LoginAgent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/add-new-properties");
        }
    }, [user, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticateUser = async (e) => {
        e.preventDefault();
        dispatch(show());
        try {
            const response = await authService.loginUser(email, password);
            Cookies.setItem('user', JSON.stringify(response.user));
            Cookies.setItem('token', response.token);
            Cookies.setItem('timestamp', Date.now());
            dispatch(authLogin(response.user));
            navigate('/add-new-properties');

        } catch (error) {
            console.log('Error authorizing user:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error authorizing user!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
        }
    }

    return (
        <>
            <div className='main-login-div'>
                <Navbar />
                <div className="login-div">
                    <Container className="login-container">
                        <form className="login-form" onSubmit={authenticateUser}>
                            <h2>Welcome Back!</h2>
                            <label htmlFor="email">
                                Email:
                                <span>*</span>
                            </label>
                            <input
                                autoFocus
                                type="email"
                                id="email"
                                placeholder="Enter Your Email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">
                                Password:
                                <span>*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Your Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
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