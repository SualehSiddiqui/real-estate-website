import { Container } from "react-bootstrap";
import { Footer, Navbar } from "../../Components";
import "./style.css";
import { Carousel, Image } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHouseChimney, FaClockRotateLeft, FaHammer } from "react-icons/fa6";
import { BsHouse } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from 'antd';
import { chunkArray } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { show, hide } from "../../Store/spinnerSlice";
import Swal from "sweetalert2";
import propertyService from "../../Services/property";
import moment from "moment";
import authService from "../../Services/auth";

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
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [brooker, setBrooker] = useState({});
    const params = useParams();


    const [contactForm1, setContactForm1] = useState({
        name: '',
        email: '',
        phone: '',
        date: moment().format('YYYY-MM-DD'),
        message: '',
    })

    const [contactForm2, setContactForm2] = useState({
        name: '',
        email: '',
        phone: '',
        date: moment().format('YYYY-MM-DD'),
        message: '',
    })

    const getProperty = async (_id) => {
        dispatch(show());
        try {
            // Build the filter parameters for the unified API
            const filters = {};

            if (_id && _id.trim() !== '') {
                filters._id = _id.trim();
            }

            const response = await propertyService.getProperties(filters);
            if (response?.properties[0]) {
                getBrooker(response.properties[0].addedBy)
            }
            setData(response?.properties[0]);


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

    const getBrooker = async (_id) => {
        dispatch(show());
        try {
            const response = await authService.getSpecificUser(_id);

            setBrooker(response.user);

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
        getProperty(params.id)
    }, []);

    const [seeMore, setSeeMore] = useState(false);
    const [seeMoreFeatures, setSeeMoreFeatures] = useState(false);
    const [seeMoreForm, setSeeMoreForm] = useState(false);

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

    const handleSubmit = async (e, form) => {
        e.preventDefault()

        const obj = form === 'form1' ? contactForm1 : contactForm2;
        console.log(obj, data?.addedBy, data)
        dispatch(show());
        try {
            const response = await authService.messageAboutProperty(obj, data?.addedBy, data);

            console.log('response', response);

            Swal.fire({
                icon: "success",
                title: "Sent!",
                text: response.message,
            });
        } catch (error) {
            console.log('Error fetching properties:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error fetching properties!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
            setContactForm1({
                name: '',
                email: '',
                phone: '',
                date: moment().format('YYYY-MM-DD'),
                message: '',
            });
            setContactForm2({
                name: '',
                email: '',
                phone: '',
                date: moment().format('YYYY-MM-DD'),
                message: '',
            });
        }
    }

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="main-property-div">
                <div className="contact-btn-div-res">
                    <a href={'#bookerDetails'} className="contact-btn-house-res">Contact Agent</a>
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
                                {
                                    data?.imgUrl?.map(images => (
                                        <div className="product-carousel-slide">
                                            <Image
                                                width={'100%'}
                                                height={'100%'}
                                                src={images.url}
                                            />
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <p className="mt-2 d-flex align-items-center text-capitalize">
                            <span className="green-dot mb-0 me-2"></span>
                            For {data?.availableFor}
                        </p>
                        <div className="d-flex">
                            <div className="house-details-div">
                                <h2 className="house-price">
                                    {
                                        data?.availableFor === 'rent' ?
                                            <>$ {data?.price} <span> /mo</span></> :
                                            `$ ${data?.price}`
                                    }
                                </h2>
                                <p className="house-structure-details">
                                    <span className="me-1">{data?.bed}</span> bed
                                    <span className="ms-3 me-1">{data?.bath}</span> bath
                                    <span className="ms-3 me-1">{data?.houseSqft}</span> sqft
                                    <span className="ms-3 me-1">{data?.lotSqft}</span> sqft lot
                                </p>
                                <h2 className="house-address">
                                    {data?.address}
                                </h2>
                            </div>
                            <div className="house-location-div">
                                <iframe
                                    title="House Location"
                                    src={data?.location}
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
                                    <span className="text-capitalize">
                                        {data?.details?.type}
                                    </span>
                                    <br />
                                    Property type
                                </p>
                            </div>
                            <div>
                                <FaHammer size={28} />
                                <p className="ms-2 mb-0">
                                    <span className="text-capitalize">
                                        {data?.details?.yearBuilt}
                                    </span>
                                    <br />
                                    Year Built
                                </p>
                            </div>
                            <div>
                                <SlCalender size={28} />
                                <p className="ms-2 mb-0">
                                    <span className="text-capitalize">
                                        {moment(data?.details?.availablity).format('MMMM DD')}
                                    </span>
                                    <br />
                                    Availablity
                                </p>
                            </div>
                        </div>
                        <p className={`mt-4 mb-0`}>
                            {data?.details?.description?.length > 300 ? (seeMore ? data?.details?.description : data?.details?.description?.slice(0, 300) + '...') : data?.details?.description}
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
                            <a href={'#bookerDetails'} className="contact-btn-house">Contact Agent</a>
                        </div>
                        <h2 className="house-hd">
                            Features
                        </h2>
                        {
                            seeMoreFeatures ? data?.features?.map(value => value.list.length > 0 && (
                                <div className="p-3" key={value.title}>
                                    <h3 className="features-sub-hd">{value.title}</h3>
                                    <div className="feature-list-div">
                                        {
                                            chunkArray(value.list, 3).map((chunk, idx) => (
                                                <ul className="feature-list" key={idx}>
                                                    {chunk.map((listItem, i) => (
                                                        <li key={i}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            ))
                                        }
                                    </div>
                                </div>
                            )) : data?.features?.slice(0, 1).map(value => (
                                <div className="p-3" key={value.title}>
                                    <h3 className="features-sub-hd">{value.title}</h3>
                                    <div className="feature-list-div">
                                        {
                                            chunkArray(value.list, 3).map((chunk, idx) => (
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
                        <form className="get-quote-form" onSubmit={e => handleSubmit(e, 'form1')}>
                            <h3>More about this property</h3>
                            <label htmlFor="full-name">Full Name*</label>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="Enter your name"
                                value={contactForm1.name}
                                onChange={e => setContactForm1({ ...contactForm1, name: e.target.value })}
                                required
                            />

                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={contactForm1.email}
                                onChange={e => setContactForm1({ ...contactForm1, email: e.target.value })}
                                required
                            />

                            <label htmlFor="phone">Phone*</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter your phone"
                                value={contactForm1.phone}
                                onChange={e => setContactForm1({ ...contactForm1, phone: e.target.value })}
                                required
                            />

                            <label htmlFor="date">Desired move-in Date*</label>
                            <input
                                type="date"
                                id="date"
                                value={contactForm1.date}
                                onChange={e => setContactForm1({ ...contactForm1, date: e.target.value })}
                                required
                            />

                            <label htmlFor="message">Message*</label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Enter your Message"
                                value={contactForm1.message}
                                onChange={e => setContactForm1({ ...contactForm1, message: e.target.value })}
                                required
                            ></textarea>

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
                                <form className="get-quote-form get-quote-form-2" onSubmit={e => handleSubmit(e, 'form2')}>
                                    <h3>More about this property</h3>
                                    <label htmlFor="full-name">Full Name*</label>
                                    <input
                                        type="text"
                                        id="full-name"
                                        placeholder="Enter your name"
                                        value={contactForm2.name}
                                        onChange={e => setContactForm2({ ...contactForm2, name: e.target.value })}
                                        required
                                    />

                                    <label htmlFor="email">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={contactForm2.email}
                                        onChange={e => setContactForm2({ ...contactForm2, email: e.target.value })}
                                        required
                                    />

                                    <label htmlFor="phone">Phone*</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Enter your phone"
                                        value={contactForm2.phone}
                                        onChange={e => setContactForm2({ ...contactForm2, phone: e.target.value })}
                                        required
                                    />

                                    <label htmlFor="date">Desired move-in Date*</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={contactForm2.date}
                                        onChange={e => setContactForm2({ ...contactForm2, date: e.target.value })}
                                        required
                                    />

                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Enter your Message"
                                        value={contactForm2.message}
                                        onChange={e => setContactForm2({ ...contactForm2, message: e.target.value })}
                                        required
                                    ></textarea>

                                    <button type="submit">Send</button>
                                    <p>
                                        {formText}
                                    </p>
                                </form>
                            </div>
                            <div>
                                <img src={data?.imgUrl && data?.imgUrl[0]?.url} alt={data?.imgUrl && data?.imgUrl[0]?.url} />
                            </div>
                        </div>
                    </div>
                    <div className="agent-details-div" id="bookerDetails">
                        <h3 className="text-center">Broker Details</h3>
                        <div>
                            <div>
                                <p>
                                    Broker Name:
                                </p>
                                <p className="agent-detail text-capitalize">{brooker?.name}</p>
                            </div>
                            <div>
                                <p>
                                    Broker Location:
                                </p>
                                <p className="agent-detail">{brooker?.address}</p>
                            </div>
                            <div>
                                <p>
                                    Broker Phone:
                                </p>
                                <Link to={`tel:${brooker?.phone}`} className="agent-detail">{brooker?.phone}</Link>
                            </div>
                            <div>
                                <p>
                                    Broker Email:
                                </p>
                                <Link to={`mailto:${brooker?.email}`} className="agent-detail">{brooker?.email}</Link>
                            </div>
                        </div>
                    </div>
                </Container >
            </div >
            <Footer />
        </>
    )
}

export default Property