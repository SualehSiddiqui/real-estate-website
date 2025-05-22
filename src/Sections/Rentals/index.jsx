import { Container } from "react-bootstrap";
import "./style.css";
import RentalsImg1 from "../../Assets/rentals-1.png";
import RentalsImg2 from "../../Assets/rentals-2.png";
import RentalsImg3 from "../../Assets/rentals-3.png";

const Rentals = ({ heading }) => {
    return (
        <div className="main-rental-div">
            <Container>
                <h1 className="rentals-hd">
                    {heading}
                </h1>
                <div className="houses-container">
                    <div className="house-card">
                        <div className="house-img-div">
                            <img src={RentalsImg1} alt="" />
                        </div>
                        <div className="house-details-div">
                            <h3>abcd</h3>
                            <p className="house-address">single room</p>
                            <p className="mt-2 house-price">$ 399.00</p>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className="house-card">
                        <div className="house-img-div">
                            <img src={RentalsImg2} alt="" />
                        </div>
                        <div className="house-details-div">
                            <h3>abcd</h3>
                            <p className="house-address">twin bedded room</p>
                            <p className="mt-2 house-price">$ 399.00</p>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className="house-card">
                        <div className="house-img-div">
                            <img src={RentalsImg3} alt="" />
                        </div>
                        <div className="house-details-div">
                            <h3>abcd</h3>
                            <p className="house-address">luxury standard room</p>
                            <p className="mt-2 house-price">$ 399.00</p>
                            <button>See More</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Rentals