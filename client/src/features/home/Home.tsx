import Hero from "../../components/Hero";
import OurProducts from "../../components/OurProducts";
import Best from "../../components/Best";
import Latest from "../../components/Latest";

const HomePage = () => {
  return (
     <div>
      <Hero />
      <Best />
      <Latest />
      <OurProducts />
    </div>
  );
};

export default HomePage;
