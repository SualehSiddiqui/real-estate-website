import './style.css';
import { Footer, Navbar } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { About, Rentals, Testimonials, WhyUs } from '../../Sections';

const Home = () => {
    return (
        <>
            <div className='main-home-div'>
                <div className='hero-main-div'>
                    <Navbar />
                    <Container className='hero-container'>
                        <div className='hero-div'>
                            <div className='text-div'>
                                <h1>Connecting You to Your Dream Home, Effortlessly.</h1>
                                <p>
                                    Discover a seamless way to find your perfect property, whether for sale or rent.
                                    Our platform brings trusted real estate agents and motivated buyers together,
                                    making your property search simple, transparent, and efficient. Start exploring
                                    today and connect directly with agents who can turn your dreams into reality.
                                </p>
                            </div>
                            <div className='hero-img-div'>
                                <img src={HeroImg} alt="Building-Image" />
                            </div>
                        </div>
                    </Container>
                </div>
                <Rentals heading="Available for Rents" />
                <Rentals heading="Available for Sale" />
                <About />
                <Testimonials />
                <WhyUs />
            </div>
            <Footer />
        </>
    )
}

export default Home;