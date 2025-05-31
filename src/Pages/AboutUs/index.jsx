import "./style.css";
import { Container } from "react-bootstrap"
import { Footer, Navbar } from "../../Components"
import Banner from "../../Assets/about-us-banner.png";

const AboutUs = () => {
    return (
        <>
            <Navbar withoutHero={true} />
            <div className="new-properties-main-div">
                <Container className="about-us-container">
                    <h1>About RentBro</h1>
                    <p>
                        For years, millions of home buyers have relied on RentBro.com® to help them find their
                        perfect home. Powered by Move, Inc., RentBro.com® provides an extensive selection of
                        homes for sale, along with the insights and tools needed to make confident real estate
                        decisions. Today, more than ever, RentBro.com® remains The Home of Home Search℠.
                    </p>
                    <p>
                        Homeowners can also take advantage of a wide range of helpful features through the My Home℠
                        dashboard. This personalized tool empowers property owners to treat their home as the valuable
                        investment it is—by tracking its value over time, exploring and managing home improvement
                        projects, and comparing similar properties in the neighborhood.
                    </p>
                    <img src={Banner} alt="about-us-banner" />
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs