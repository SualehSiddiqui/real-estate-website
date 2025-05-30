import { Footer, HouseCard, Navbar, PropertySearchAutocomplete } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { WhyUs } from "../../Sections";
import { useEffect, useState } from "react";
import propertyService from "../../Services/property";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { show, hide } from "../../Store/spinnerSlice";


const Rent = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    const getProperty = async (city, state) => {
        dispatch(show());
        try {
            // Build the filter parameters for the unified API
            const filters = {
                page: undefined,
                size: undefined,
                availableFor: 'rent',
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
                                <h1>Rent with Ease, Live with Comfort.</h1>
                                <p>
                                    Browse through a diverse selection of rental properties tailored to fit
                                    your lifestyle and budget. From apartments to family homes, find the perfect
                                    place to call home — all listed by trusted agents ready to help you every
                                    step of the way. Start your hassle-free rental search today.
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
                            Avaliable For Rent
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
                                    <h4>No Properties available for Rent in this City or State</h4>
                            }
                        </div>
                    </Container>
                </div>
                <WhyUs />
                <Footer />
            </div>
        </>
    )
}

export default Rent;