import { Container } from "react-bootstrap";
import "./style.css";
import RentalsImg1 from "../../Assets/rentals-1.png";
import RentalsImg2 from "../../Assets/rentals-2.png";
import RentalsImg3 from "../../Assets/rentals-3.png";
import { HouseCard } from "../../Components";

const Rentals = ({ heading }) => {
    return (
        <div className="main-rental-div">
            <Container>
                <h1 className="rentals-hd">
                    {heading}
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
    )
}

export default Rentals