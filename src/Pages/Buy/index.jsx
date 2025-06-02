import "./style.css";
import { Footer, HouseCard, Navbar, PropertySearchAutocomplete } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { WhyUs } from "../../Sections";
import { useEffect, useState } from "react";
import propertyService from "../../Services/property.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { show, hide } from "../../Store/spinnerSlice";


const Buy = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    const getProperty = async (city, state) => {
        dispatch(show());
        try {
            // Build the filter parameters for the unified API
            const filters = {
                page: undefined,
                size: undefined,
                availableFor: 'sell',
            };

            if (city && city.trim() !== '') {
                filters.city = city.trim();
            }

            if (state && state.trim() !== '') {
                filters.state = state.trim();
            }

            const response = await propertyService.getProperties(filters);

            setData(response.properties);


        } catch (error) {
            console.log('Error fetching properties:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error fetching properties!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
        }
    };

    useEffect(() => {
        getProperty()
    }, []);

    const handleSearch = (value) => {
        if (value?.type?.toLowerCase() === 'city') getProperty(value?.name, undefined);
        else if (value?.type?.toLowerCase() === 'state') getProperty(undefined, value?.name);
        else getProperty(undefined, undefined);
    }

    return (
        <>
            <div className="main-home-div">
                <div className='hero-main-div'>
                    <Navbar />
                    <Container className='hero-container'>
                        <div className='hero-div'>
                            <div className='text-div'>
                                <h1>Find the Home You’ve Been Waiting For.</h1>
                                <p>
                                    Explore a wide range of properties available for sale from trusted agents near you.
                                    Whether you’re looking for a cozy apartment or a spacious family home, our listings
                                    make it easy to find the perfect match. Start your journey to ownership with confidence
                                    and clarity.
                                </p>
                            </div>
                            <div className='hero-img-div'>
                                <img src={HeroImg} alt="Building-Image" />
                            </div>
                            <div className="search-div">
                                <PropertySearchAutocomplete onSearch={handleSearch} />
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="main-rental-div mt-5">
                    <Container>
                        <h1 className="rentals-hd">
                            Avaliable For Sale
                        </h1>
                        <div className="houses-container">
                            {
                                data.length > 0 ? data?.map(property => (
                                    <HouseCard
                                        imgLink={property?.imgUrl[0]?.url}
                                        title={property?.title}
                                        address={property?.address}
                                        price={property?.price}
                                        _id={property?._id}
                                        key={property?._id}
                                    />
                                )) :
                                    <h4>No Properties available for Sell in this City or State</h4>
                            }
                        </div>
                    </Container>
                </div>
                <WhyUs />
            </div>
            <Footer />
        </>

    )
}

export default Buy