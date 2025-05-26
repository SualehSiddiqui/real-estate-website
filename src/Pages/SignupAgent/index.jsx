import "./style.css";
import { useEffect, useState } from "react";
import { Navbar, Footer } from "../../Components"
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.js";
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from "../../Store/authSlice.js";
import { show, hide } from "../../Store/spinnerSlice.js";
import Cookies from "js-cookies";
import Swal from "sweetalert2";

const SignupAgent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate("/home")
        }
    }, [user, navigate]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const authenticateUser = async (e) => {
        e.preventDefault();
        dispatch(show());
        const user = {
            name,
            email,
            address,
            phone,
            password
        }
        try {
            const response = await authService.createUser(user);
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
                            <h2>Welcome Back</h2>
                            <label htmlFor="fullname">
                                Fullname:
                                <span>*</span>
                            </label>
                            <input
                                autoFocus
                                type="text"
                                id="fullname"
                                placeholder="Enter Your Fullname"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <label htmlFor="emai">
                                Email:
                                <span>*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="phone">
                                Phone:
                                <span>*</span>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter Your Phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <label htmlFor="address">
                                Address:
                                <span>*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter Your office address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            <label htmlFor="password">
                                Password:
                                <span>*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
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