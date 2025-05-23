import "./style.css";
import { Footer, HouseCard, Navbar } from '../../Components';
import { Container } from 'react-bootstrap';
import HeroImg from "../../Assets/hero.png";
import { IoSearch } from "react-icons/io5";
import RentalsImg1 from "../../Assets/rentals-1.png";
import RentalsImg2 from "../../Assets/rentals-2.png";
import RentalsImg3 from "../../Assets/rentals-3.png";
import { WhyUs } from "../../Sections";


const Buy = () => {
    return (
        <>
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
                            <div className="input-search-div">
                                <input type="text" placeholder="Enter City, State, Neighborhood" />
                                <div className="search-icon">
                                    <IoSearch />
                                </div>
                            </div>
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
                        <HouseCard
                            imgLink={RentalsImg1}
                            title={'single room'}
                            address={'abcd'}
                            price={399}
                            _id={'abcd'}
                        />
                        <HouseCard
                            imgLink={RentalsImg2}
                            title={'single room'}
                            address={'abcd'}
                            price={399}
                            _id={'abcd'}
                        />
                        <HouseCard
                            imgLink={RentalsImg3}
                            title={'single room'}
                            address={'abcd'}
                            price={399}
                            _id={'abcd'}
                        />
                    </div>
                </Container>
            </div>
            <WhyUs />
            <Footer />
        </>
    )
}

export default Buy