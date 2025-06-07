import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/hero";
import HowItWorks from "../components/HowItWorks";
import LandingIntro from "../components/LandingIntro";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <LandingIntro />
      <Hero />
      <HowItWorks />
      <FAQ />    
      <Footer />
    </div>
  );
};

export default Home;
