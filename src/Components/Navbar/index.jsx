import { Form } from 'react-bootstrap';
import "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookies";
import { logout } from '../../Store/authSlice';
import authService from '../../Services/auth';

function NavbarComp({ withoutHero }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [login, setLogin] = useState(false);

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
            link: '/about',
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

    const logoutUser = () => {
        Cookies.removeItem('user');
        Cookies.removeItem('timestamp');
        Cookies.removeItem('token');
        dispatch(logout);
        navigate('/')
    }

    return (
        <Navbar expand="md" className={`py-3 main-nav-div ${withoutHero ? 'nav-not-hero' : ''}`}>
            <Container>
                <Navbar.Brand href="/">Rent Bro</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto me-auto my-2 my-md-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            navLinks.map((navItem, key) => {
                                return navItem.show && (navItem.badge ? (
                                    <Nav.Link
                                        href={navItem.link}
                                        key={key}
                                        className={`mx-md-3 ${navItem.link === location.pathname ? 'active-link' : ''}`}
                                    >
                                        <Badge count={99} overflowCount={10}>
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
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavbarComp;