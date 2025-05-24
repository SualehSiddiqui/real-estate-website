import { Form } from 'react-bootstrap';
import "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from 'antd';


function NavbarComp({ withoutHero }) {

    const location = useLocation();

    const navLinks = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Buy',
            link: '/buy',
        },
        {
            title: 'Rent',
            link: '/rent',
        },
        {
            title: 'About',
            link: '/about',
        },
        {
            title: 'Properties',
            link: '/add-new-properties',
        },
        {
            title: 'Messages',
            link: '/messages',
            badge: true
        },
    ]

    return (
        <Navbar expand="md" className={`py-3 main-nav-div ${withoutHero ? 'nav-not-hero' : ''}`}>
            <Container>
                <Navbar.Brand href="#">Rent Bro</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto me-auto my-2 my-md-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            navLinks.map((navItem, key) => {
                                return navItem.badge ? (
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
                                )
                            })
                        }
                    </Nav>
                    <Form>
                        <Link to={'/login-as-agent'} className='contact-btn-nav'>
                            Login as Agent
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavbarComp;