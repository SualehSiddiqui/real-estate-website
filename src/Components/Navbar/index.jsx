import { Form } from 'react-bootstrap';
import "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookies";
import { logout } from '../../Store/authSlice';
import authService from '../../Services/auth';
import { show, hide } from "../../Store/spinnerSlice";

function NavbarComp({ withoutHero }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [login, setLogin] = useState(false);
    const { user, isChecking, status } = useSelector(state => state.auth);
    const [unreadMessages, setUnreadMessages] = useState(0);

    const navLinks = [
        {
            title: 'Home',
            link: '/',
            show: true
        },
        {
            title: 'Buy',
            link: '/buy',
            show: true
        },
        {
            title: 'Rent',
            link: '/rent',
            show: true
        },
        {
            title: 'About',
            link: '/about-us',
            show: true
        },
        {
            title: 'Properties',
            link: '/add-new-properties',
            show: login
        },
        {
            title: 'Messages',
            link: '/message',
            badge: true,
            show: login
        },
        {
            title: 'Profile',
            link: '/profile',
            show: login
        },
    ];

    const checkUser = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    };

    useEffect(() => {
        checkUser();
    }, [dispatch])

    const getMessages = async (pageNo, limit, id) => {
        dispatch(show());
        try {
            const response = await authService.getAllMessages(pageNo, limit, id);

            setUnreadMessages(response?.messages?.filter(message => !message.read)?.length);

        } catch (error) {
            console.log('Error fetching properties:', error.message);
        } finally {
            dispatch(hide());
        }
    };

    useEffect(() => {
        if (!isChecking && status) getMessages(undefined, undefined, user?._id);
    }, [user, isChecking, status]);


    const logoutUser = () => {
        dispatch(logout());
        Cookies.removeItem('user');
        Cookies.removeItem('timestamp');
        Cookies.removeItem('token');
        navigate('/')
    }

    return (
        <Navbar expand="md" className={`py-3 main-nav-div ${withoutHero ? 'nav-not-hero' : ''}`}>
            <Container>
                <Navbar.Brand href="/">Rent Bro</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            RentBro
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                            className="ms-auto me-auto my-2 my-md-0"
                        >
                            {
                                navLinks.map((navItem, key) => {
                                    return navItem.show && (navItem.badge && unreadMessages > 0 ? (
                                        <Nav.Link
                                            href={navItem.link}
                                            key={key}
                                            className={`mx-md-3 ${navItem.link === location.pathname ? 'active-link' : ''}`}
                                        >
                                            <Badge count={unreadMessages} overflowCount={99}>
                                                <span
                                                    style={{
                                                        padding: 'var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x)',
                                                        fontSize: 'var(--bs-nav-link-font-size)',
                                                        fontWeight: '600',
                                                        color: 'var(--bs-nav-link-color)',
                                                        textDecoration: 'none',
                                                        background: '0 0',
                                                        border: '0',
                                                        transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out',
                                                    }}
                                                >
                                                    {navItem.title}
                                                </span>
                                            </Badge>
                                        </Nav.Link>
                                    ) : (
                                        <Nav.Link
                                            href={navItem.link}
                                            key={key}
                                            className={`mx-md-3 ${navItem.link === location.pathname ? 'active-link' : ''}`}
                                        >
                                            {navItem.title}
                                        </Nav.Link>
                                    ))
                                })
                            }
                        </Nav>
                        <Form>
                            <Link to={'/login-as-agent'} onClick={login ? logoutUser : ''} className='contact-btn-nav'>
                                {login ? 'Log out' : 'Login as Agent'}
                            </Link>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar >
    );
}

export default NavbarComp;