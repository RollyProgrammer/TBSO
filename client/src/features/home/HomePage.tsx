import Hero from "../../components/Hero";
import LatestArrival from "../../components/LatestArrival";
import OurProducts from "../../components/OurProducts";
import Best from "../../components/Best";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Best />
      <LatestArrival />
      <OurProducts />
    </div>
  );
};

export default HomePage;
