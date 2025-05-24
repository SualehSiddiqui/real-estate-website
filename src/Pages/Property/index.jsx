import { Container } from "react-bootstrap";
import { Footer, Navbar } from "../../Components";
import "./style.css";
import { Carousel, Image } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHouseChimney, FaClockRotateLeft, FaHammer } from "react-icons/fa6";
import { BsHouse } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Img1 from "../../Assets/Product/img1.webp"
import Img2 from "../../Assets/Product/img2.webp"
import Img3 from "../../Assets/Product/img3.webp"
import Img4 from "../../Assets/Product/img4.webp"
import Img5 from "../../Assets/Product/img5.webp"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from 'antd';
import { chunkArray } from "../../Utils";

const CustomPrevArrow = ({ onClick }) => (
    <div className="product-carousel-arrows left-arrow" onClick={onClick}>
        <IoIosArrowBack />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div className="product-carousel-arrows right-arrow" onClick={onClick}>
        <IoIosArrowForward />
    </div>
);

const Property = () => {
    const [seeMore, setSeeMore] = useState(false);
    const [seeMoreFeatures, setSeeMoreFeatures] = useState(false);
    const [seeMoreForm, setSeeMoreForm] = useState(false);
    let content = ` Wonderful area of SW Austin! Close to everything! Shopping, excellent schools nearby, parks,
                            trails, restaurants, major roads nearby, about 20 minutes to downtown area and more! Airport
                            not far! Great floorplan! Home office/study downstairs, 3 bedrooms and 2 baths upstairs, 2
                            car garage, quiet culdesac, open kitchen/great room concept, high ceilings, lots of natural
                            light, large backyard/patio and more!`
    let formText = <>
        By proceeding, you consent to receive calls and texts at the number you provided, including
        marketing by autodialer and prerecorded and artificial voice, and email, from realtor.com
        and <Tooltip
            title={`Person who may contact you include real state professionals suc as agents and brokers, mortgage professionals such as lenders mortgage
                 brokers, abcd.com and it's affiliates insurers or their agents, thosewho may be assisting any of the foregoing`}
        ><span className="form-link">others</span></Tooltip> about your inquiry and other home-related matters,
        but not as a condition of any purchase. You also agree to our <Link className="form-link" to={'#'}>Terms of Use</Link> , and to our
        <Link className="form-link" to={'#'}>Privacy Policy</Link> regarding the information relating to you. Msg/data rates may apply. This
        consent applies even if you are on a corporate, state or national Do Not Call list.
    </>
    let plainFormText = `By proceeding, you consent to receive calls and texts at the number you provided, including
        marketing by autodialer and prerecorded and artificial voice, and email, from realtor.com
        and others about your inquiry and other home-related matters, but not as a condition of any purchase.
        You also agree to our Terms of Use, and to our Privacy Policy
        regarding the information relating to you. Msg/data rates may apply. This consent applies even if you are on a corporate, state or national Do Not Call list.`
    const features = [
        {
            title: 'Bedrooms',
            list: ['Bedrooms: 3'],
        },
        {
            title: 'Bathrooms',
            list: ['Total Bathrooms: 3', 'Full Bathrooms: 2', '1/2 Bathrooms: 1'],
        },
        {
            title: 'Interior Features',
            list: [
                'Bookcases',
                'Ceiling Fan(s)',
                'Vaulted Ceiling(s)',
                'Multiple Dining Areas',
                'Multiple Living Areas',
                'Pantry',
                'Soaking Tub',
                'Flooring: Carpet, Laminate, Tile',
                'Window Features: Double Pane Windows',
            ],
        },
        {
            title: 'Appliances',
            list: [
                'Dishwasher',
                'Disposal',
                'Microwave',
                'Electric Oven',
                'Refrigerator',
                'Vented Exhaust Fan',
                'Laundry Features: Laundry Room, Lower Level',
            ],
        },
        {
            title: 'Heating and Cooling',
            list: [
                'Cooling Features: Ceiling Fan(s), Central Air',
                'Fireplace Features: Family Room',
                'Heating Features: Central',
                'Number of Fireplaces: 1',
            ],
        },
        {
            title: 'Exterior and Lot Features',
            list: [
                'Rain Gutters',
                'Fencing: Back Yard, Wood',
                'Patio And Porch Features: Deck, Porch',
            ],
        },
        {
            title: 'Garage and Parking',
            list: [
                'Covered Spaces: 2',
                'Garage Spaces: 2',
                'Parking Features: Door-Single',
                'Parking Total: 2',
            ],
        },
        {
            title: 'Land Info',
            list: [
                'Lot Description: Back Yard, Cul-De-Sac, Curbs, Front Yard',
                'Lot Size Acres: 0.183',
                'Lot Size Square Feet: 7971',
            ],
        },
        {
            title: 'Homeowners Association',
            list: [
                'Association: No',
                'Calculated Total Monthly Association Fees: 0',
                'Pets Allowed: No',
            ],
        },
        {
            title: 'School Information',
            list: [
                'Elementary School: Mills',
                'High School: Bowie',
                'High School District: Austin ISD',
                'Middle School: Gorzycki',
                'School District: Austin ISD',
            ],
        },
        {
            title: 'Rental Info',
            list: [
                'Lease Term: Negotiable',
                'Max Lease Months: 24',
                'Min Lease Months: 12',
                'Tenant Pays: All Utilities, Cable TV, Electricity, Hot Water, Pest Control, Sewer, Trash Collection, Water',
                'Security Deposit: 3100',
                'Application Fee: 65',
            ],
        },
        {
            title: 'Amenities and Community Features',
            list: [
                'Community Features: Cluster Mailbox, Curbs, Park, Playground, Underground Utilities',
            ],
        },
        {
            title: 'Other Property Info',
            list: [
                'Tax Block: 32',
                'Source Listing Status: Active',
                'County: Travis',
                'Availability Date: 2025-07-01',
                'Directions: South on MoPac past the river, exit Davis Lane, go west to light at Beckett, turn left onto Beckett, turn right onto TaylorCrest, turn onto Janabyrd Dr and left onto Janabyrd Cove',
                'Source Property Type: Residential Lease',
                'Area: SWW',
                'Source Neighborhood: Village At Western Oaks Sec 15',
                'Owner Pays: Association Fees, Taxes',
                'Parcel Number: 04183813230000',
                'Subdivision: Village At Western Oaks Sec 15',
                'Flood Plain: No',
                'Property Subtype: Single Family Residence',
                'Source System Name: C2C',
            ],
        },
        {
            title: 'Building and Construction',
            list: [
                'Total Square Feet Living: 2387',
                'Year Built: 2000',
                'Construction Materials: Brick',
                'Direction Faces: East',
                'Foundation Details: Slab',
                'Levels: Two',
                'Living Area Source: Public Records',
                'Property Age: 25',
                'Property Condition: Resale',
                'Roof: Composition',
                'House Style: Entry Steps',
                'Total Area Sqft: 2387',
            ],
        },
        {
            title: 'Utilities',
            list: [
                'Sewer: Public Sewer',
                'Cable Available',
                'Electricity Connected',
                'Phone Available',
                'Sewer Connected',
                'Underground Utilities',
                'Water Connected',
                'Water Source: Public',
            ],
        },
    ];

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="main-property-div">
                <div className="contact-btn-div-res">
                    <button className="contact-btn-house-res">Contact Agent</button>
                </div>
                <Container className="property-container">
                    <div className="main-content-div">
                        <div className="main-img-div">
                            <Carousel
                                className="product-carousel-div"
                                infinite={true}
                                autoplay={true}
                                fade={true}
                                autoplaySpeed={4000}
                                arrows
                                prevArrow={<CustomPrevArrow />}
                                nextArrow={<CustomNextArrow />}
                            >
                                <div className="product-carousel-slide">
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={Img1}
                                    />
                                </div>
                                <div className="product-carousel-slide">
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={Img2}
                                    />
                                </div>
                                <div className="product-carousel-slide">
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={Img3}
                                    />
                                </div>
                                <div className="product-carousel-slide">
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={Img4}
                                    />
                                </div>
                                <div className="product-carousel-slide">
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={Img5}
                                    />
                                </div>
                            </Carousel>
                        </div>
                        <p className="mt-2 d-flex align-items-center">
                            <span className="green-dot mb-0 me-2 font-blalck"></span>
                            For Rent
                        </p>
                        <div className="d-flex">
                            <div className="house-details-div">
                                <h2 className="house-price">
                                    $ 2500 <span> /mo</span>
                                </h2>
                                <p className="house-structure-details">
                                    <span className="me-1">3</span> bed
                                    <span className="ms-3 me-1">2.5</span> bath
                                    <span className="ms-3 me-1">2,145</span> sqft
                                    <span className="ms-3 me-1">2,145</span> sqft
                                </p>
                                <h2 className="house-address">
                                    9104 Janabyrd Cv, Austin, TX 78749
                                </h2>
                            </div>
                            <div className="house-location-div">
                                <iframe
                                    title="House Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.276782676497!2d67.02406541491316!3d24.945867984023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33fb9c3e1b913%3A0xe13f66f906624934!2sBlock%201%2C%20Nazimabad%2C%20Karachi!5e0!3m2!1sen!2s!4v1684981225694!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                        </div>
                        <hr />
                        <h2 className="house-hd d-flex align-items-center">
                            <FaHouseChimney className="me-2" />
                            Property details
                        </h2>
                        <div className="property-details-div mt-4">
                            <div>
                                <BsHouse size={28} />
                                <p className="ms-2 mb-0">
                                    <span>
                                        Single Family
                                    </span>
                                    <br />
                                    Property type
                                </p>
                            </div>
                            <div>
                                <FaClockRotateLeft size={28} />
                                <p className="ms-2 mb-0">
                                    <span>
                                        Today
                                    </span>
                                    <br />
                                    Last Updated
                                </p>
                            </div>
                            <div>
                                <FaHammer size={28} />
                                <p className="ms-2 mb-0">
                                    <span>
                                        2000
                                    </span>
                                    <br />
                                    Year Built
                                </p>
                            </div>
                            <div>
                                <SlCalender size={28} />
                                <p className="ms-2 mb-0">
                                    <span>
                                        01 Jul
                                    </span>
                                    <br />
                                    Availablity
                                </p>
                            </div>
                        </div>
                        <p className={`mt-4 mb-0`}>
                            {content.length > 300 ? (seeMore ? content : content.slice(0, 300) + '...') : content}
                        </p>
                        <p onClick={e => setSeeMore(!seeMore)} className="see-more-btn">
                            {
                                seeMore ?
                                    <>
                                        See Less
                                        <MdOutlineKeyboardArrowUp color="black" />
                                    </> :
                                    <>
                                        See More
                                        <MdOutlineKeyboardArrowDown color="black" />
                                    </>
                            }
                        </p>
                        <div className="d-flex justify-content-center">
                            <button className="contact-btn-house">Contact Agent</button>
                        </div>
                        <h2 className="house-hd">
                            Features
                        </h2>
                        {
                            seeMoreFeatures ? features.map(value => (
                                <div className="p-3" key={value.title}>
                                    <h3 className="features-sub-hd">{value.title}</h3>
                                    <div className="feature-list-div">
                                        {
                                            chunkArray(value.list, 5).map((chunk, idx) => (
                                                <ul className="feature-list" key={idx}>
                                                    {chunk.map((listItem, i) => (
                                                        <li key={i}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            ))
                                        }
                                    </div>
                                </div>
                            )) : features.slice(0, 1).map(value => (
                                <div className="p-3" key={value.title}>
                                    <h3 className="features-sub-hd">{value.title}</h3>
                                    <div className="feature-list-div">
                                        {
                                            chunkArray(value.list, 5).map((chunk, idx) => (
                                                <ul className="feature-list" key={idx}>
                                                    {chunk.map((listItem, i) => (
                                                        <li key={i}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <p onClick={e => setSeeMoreFeatures(!seeMoreFeatures)} className="see-more-btn">
                            {
                                seeMoreFeatures ?
                                    <>
                                        See Less
                                        <MdOutlineKeyboardArrowUp color="black" />
                                    </> :
                                    <>
                                        See More
                                        <MdOutlineKeyboardArrowDown color="black" />
                                    </>
                            }
                        </p>
                    </div>
                    <div className="get-quote-div">
                        <form className="get-quote-form">
                            <h3>More about this property</h3>
                            <label htmlFor="full-name">Full Name*</label>
                            <input type="text" id="full-name" placeholder="Enter your name" />

                            <label htmlFor="email">Email*</label>
                            <input type="email" id="email" placeholder="Enter your email" />

                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" placeholder="Enter your phone" />

                            <label htmlFor="date">Desired move-in Date*</label>
                            <input type="date" id="date" />

                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" placeholder="Enter your Message"></textarea>

                            <button type="submit">Send</button>
                            <p>
                                {plainFormText.length > 300 ? (seeMoreForm ? formText : plainFormText.slice(0, 100) + '...') : formText}
                                <span onClick={e => setSeeMoreForm(!seeMoreForm)} className="ms-1">
                                    {
                                        seeMoreForm ?
                                            'See Less' :
                                            'See More'
                                    }
                                </span>
                            </p>
                        </form>
                    </div>
                </Container>
                <Container>
                    <div className="contact-property-div">
                        <h2>Learn more about this property</h2>
                        <div className="contact-form-div">
                            <div>
                                <form className="get-quote-form get-quote-form-2">
                                    <h3>More about this property</h3>
                                    <label htmlFor="full-name">Full Name*</label>
                                    <input type="text" id="full-name" placeholder="Enter your name" />

                                    <label htmlFor="email">Email*</label>
                                    <input type="email" id="email" placeholder="Enter your email" />

                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" placeholder="Enter your phone" />

                                    <label htmlFor="date">Desired move-in Date*</label>
                                    <input type="date" id="date" />

                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" placeholder="Enter your Message"></textarea>

                                    <button type="submit">Send</button>
                                    <p>
                                        {formText}
                                    </p>
                                </form>
                            </div>
                            <div>
                                <img src={Img1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="agent-details-div">
                        <h3 className="text-center">Broker Details</h3>
                        <div>
                            <p>
                                <p>
                                    Broker Name:
                                </p>
                                <p className="agent-detail">Sualeh Siddiqui</p>
                            </p>
                            <p>
                                <p>
                                    Broker Location:
                                </p>
                                <p className="agent-detail">AUSTIN, TX</p>
                            </p>
                            <p>
                                <p>
                                    Broker Phone:
                                </p>
                                <p className="agent-detail">(918) 968-1145</p>
                            </p>
                            <p>
                                <p>
                                    Broker Email:
                                </p>
                                <p className="agent-detail">SualehSiddiqui@gmail.com</p>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Property