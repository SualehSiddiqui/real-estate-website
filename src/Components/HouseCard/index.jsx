import { Link } from "react-router-dom";
import "./style.css";

const HouseCard = ({ imgLink, title, address, price, _id }) => {
    return (
        <div className="house-card">
            <div className="house-card-img-div">
                <img src={imgLink} alt="" />
            </div>
            <div className="house-card-details-div">
                <h3>{title}</h3>
                <p className="house-card-address">{address}</p>
                <p className="mt-2 house-card-price">$ {Number(price).toFixed(2)}</p>
                <Link to={`/property/${_id}`} className="house-card-see-more-btn">See More</Link>
            </div>
        </div>
    )
}

export default HouseCard