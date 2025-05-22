// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// my styles file
import './style.css';
import { useState } from 'react';
import { Container } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Quote1 from "../../Assets/Testimonials/quote1.png";
import Quote2 from "../../Assets/Testimonials/quote2.png";
import MaleIcon from "../../Assets/Testimonials/male-icon.png";
import FemaleIcon from "../../Assets/Testimonials/female-icon.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const TestimonialSlide = ({ icon, name, body }) => (
    <>
        <div className='test-icon-div'>
            <img src={icon} alt={`${name}'s icon`} />
        </div>
        <img src={Quote1} className='quote-img quote1-img' alt="quote1-img" />
        <img src={Quote2} className='quote-img quote2-img' alt="quote2-img" />
        <div className='test-details-div'>
            <p>
                {body}
            </p>
            <h2>{name}</h2>
        </div>
    </>
);

const Testimonials = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);

    return (
        <div className="testimonials-main">
            <Container className="testimonials-container">
                <h1 className="rentals-hd">
                    Client Reviews
                </h1>
                <div className="testimonials-all-div">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[EffectCoverflow, Pagination]}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        className='test-swipper'
                    >
                        <SwiperSlide className='test-swipper-slide'>
                            <TestimonialSlide
                                icon={MaleIcon}
                                name={'Sualeh'}
                                body={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat fuga a ab eaque quia. Excepturi, hic ipsam! Suscipit vitae laboriosam fuga, odit unde aliquam architecto dolore et molestias? Ipsam, molestiae?"}
                            />
                        </SwiperSlide>
                        <SwiperSlide className='test-swipper-slide'>
                            <TestimonialSlide
                                icon={FemaleIcon}
                                name={'Sidra'}
                                body={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat fuga a ab eaque quia. Excepturi, hic ipsam! Suscipit vitae laboriosam fuga, odit unde aliquam architecto dolore et molestias? Ipsam, molestiae?"}
                            />
                        </SwiperSlide>
                        <SwiperSlide className='test-swipper-slide'>
                            <TestimonialSlide
                                icon={FemaleIcon}
                                name={'Sara'}
                                body={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat fuga a ab eaque quia. Excepturi, hic ipsam! Suscipit vitae laboriosam fuga, odit unde aliquam architecto dolore et molestias? Ipsam, molestiae?"}
                            />
                        </SwiperSlide>
                        <SwiperSlide className='test-swipper-slide'>
                            <TestimonialSlide
                                icon={MaleIcon}
                                name={'Ahad'}
                                body={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat fuga a ab eaque quia. Excepturi, hic ipsam! Suscipit vitae laboriosam fuga, odit unde aliquam architecto dolore et molestias? Ipsam, molestiae?"}
                            />
                        </SwiperSlide>

                        <button
                            className='previousButton'
                            onClick={() => {
                                if (swiperInstance) {
                                    swiperInstance.slidePrev();
                                }
                            }}
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            className='nextButton'
                            onClick={() => {
                                if (swiperInstance) {
                                    swiperInstance.slideNext();
                                }
                            }}
                        >
                            <IoIosArrowForward />
                        </button>
                    </Swiper>
                </div>
            </Container>
        </div>
    );
};

export default Testimonials;


