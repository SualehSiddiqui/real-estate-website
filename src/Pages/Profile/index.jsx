import "./style.css"
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar } from "../../Components";
import { Container } from "react-bootstrap";
import { show, hide } from "../../Store/spinnerSlice.js";
import Cookies from "js-cookies";
import authService from "../../Services/auth";
import { login, logout } from "../../Store/authSlice.js";


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isChecking, status } = useSelector(state => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(show());

        const obj = {
            name,
            phone,
            address,
            oldPassword,
            newPassword,
        }

        try {
            const response = await authService.updateUser(user?._id, obj);
            Cookies.setItem('user', JSON.stringify(response.user));
            dispatch(login(response.user));

            Swal.fire({
                icon: "success",
                title: "Updated...",
                text: 'User Updated Successfully'
            });

        } catch (error) {
            console.log('Error authorizing user:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error authorizing user!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
            setOldPassword('');
            setNewPassword('');
        }
    }

    useEffect(() => {
        if (!isChecking) {
            setName(user?.name);
            setEmail(user?.email);
            setPhone(user?.phone);
            setAddress(user?.address);
        }
    }, [user, isChecking])


    const handleLogout = () => {
        dispatch(logout());
        Cookies.removeItem('user');
        Cookies.removeItem('timestamp');
        Cookies.removeItem('token');
        navigate('/')
    }

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="new-properties-main-div">
                <Container>
                    <div className="main-profile">
                        <form onSubmit={handleSubmit}>
                            <div className="profile-img-div">
                                <img src="https://cdn-icons-png.freepik.com/512/3135/3135823.png" alt="" />
                                <span className="mt-3">
                                    {user?.name}
                                </span>
                            </div>
                            <div className="detials-div">
                                <span>Name:</span>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    disabled
                                    value={email}
                                    required
                                />
                                <span>Phone</span>
                                <input
                                    type="text"
                                    placeholder="Your Phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    required
                                />
                                <span>Address</span>
                                <input
                                    type="text"
                                    placeholder="Your Address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                />
                                <span>Old Password</span>
                                <input
                                    type="password"
                                    placeholder="Enter Your Old Password"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    required
                                />
                                <span>New Password</span>
                                <input
                                    type="password"
                                    placeholder="Enter Your New Password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                                <Button className="update-btn" type={'submit'} variant="outline-success">Update</Button>
                                <Button onClick={handleLogout} className="update-btn" variant="outline-danger">Logout</Button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Profile;





