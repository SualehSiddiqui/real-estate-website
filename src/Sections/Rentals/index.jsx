import { Container } from "react-bootstrap";
import "./style.css";
import { HouseCard } from "../../Components";

const Rentals = ({ heading, data }) => {
    return (
        <div className="main-rental-div">
            <Container>
                <h1 className="rentals-hd">
                    {heading}
                </h1>
                <div className="houses-container">
                    {
                        data?.map(property => (
                            <HouseCard
                                imgLink={property?.imgUrl[0]?.url}
                                title={property?.title}
                                address={property?.address}
                                price={property?.price}
                                _id={property?._id}
                                key={property?._id}
                            />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Rentals