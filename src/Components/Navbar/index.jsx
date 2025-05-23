import { Form } from 'react-bootstrap';
import "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';


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
                            navLinks.map((navItem, key) => (
                                <Nav.Link href={navItem.link} key={key} className={`mx-md-3 ${navItem.link === location.pathname ? 'active-link' : ''}`}>{navItem.title}</Nav.Link>
                            ))
                        }
                    </Nav>
                    <Form>
                        <button className='contact-btn-nav'>
                            Login as Agent
                        </button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComp;