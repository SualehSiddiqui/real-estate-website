import { Form } from 'react-bootstrap';
import "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaPhone } from "react-icons/fa";


function NavScrollExample() {
    return (
        <Navbar expand="md" className='py-3'>
            <Container>
                <Navbar.Brand href="#">Rent Bro</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto me-auto my-2 my-md-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action2" className='mx-md-3'>Home</Nav.Link>
                        <Nav.Link href="#action1" className='mx-md-3'>Buy</Nav.Link>
                        <Nav.Link href="#action2" className='mx-md-3'>Rent</Nav.Link>
                        <Nav.Link href="#action2" className='mx-md-3'>About</Nav.Link>
                    </Nav>
                    <Form>
                        <button className='contact-btn-nav'>
                            Contact us
                            <FaPhone className='ms-1' size={14}/>
                        </button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;