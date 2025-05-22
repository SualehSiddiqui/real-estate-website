import './style.css';
import { Footer, Navbar } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { About, Rentals, Testimonials, WhyUs } from '../../Sections';

const Home = () => {
    return (
        <>
            <div className='hero-main-div'>
                <Navbar />
                <Container className='hero-container'>
                    <div className='hero-div'>
                        <div className='text-div'>
                            <h1>Elevate Your Stay,</h1>
                            <h1>Elevate Your Status.</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos odio fuga voluptas
                                dolores quia atque ullam possimus veritatis doloribus. Et saepe aspernatur odio aut
                                obcaecati, provident quod dolorem accusantium exercitationem.
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
            <Footer />
        </>
    )
}

export default Home;