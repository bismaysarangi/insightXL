import FAQ from "../components/FAQ";
import Hero from "../components/hero";
import HowItWorks from "../components/HowItWorks";
import LandingIntro from "../components/LandingIntro";

const Home = () => {
  return (
    <div>
      <LandingIntro />
      <Hero />
      <HowItWorks />
      <FAQ />
    </div>
  );
};

export default Home;
