import './style.css';
import { Footer, Navbar } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { About, Rentals, Testimonials, WhyUs } from '../../Sections';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import propertyService from '../../Services/property';
import { show, hide } from "../../Store/spinnerSlice";

const Home = () => {
    const dispatch = useDispatch();

    const [rentProperties, setRentProperties] = useState([]);
    const [sellProperties, setSellProperties] = useState([]);

    const getPropertiesByAvailability = async (availabilityType) => {
        dispatch(show());
        try {
            const filters = {
                availableFor: availabilityType,
                limit: 3
            };

            const response = await propertyService.getProperties(filters);
            return response.properties || [];
        } catch (error) {
            console.log(`Error fetching ${availabilityType} properties:`, error.message);
            return [];
        } finally {
            dispatch(hide());
        }
    };

    useEffect(() => {
        const fetchProperties = async () => {
            const rentData = await getPropertiesByAvailability('rent');
            const sellData = await getPropertiesByAvailability('sell');

            setRentProperties(rentData);
            setSellProperties(sellData);
        };

        fetchProperties();
    }, []);


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
                <Rentals heading="Available for Rents" data={rentProperties} />
                <Rentals heading="Available for Sale" data={sellProperties} />
                <About />
                <Testimonials />
                <WhyUs />
            </div>
            <Footer />
        </>
    )
}

export default Home;