import Hero from "@/components/Hero";
import HomeComponents from "@/components/HomeComponents";
import InfoBoxes from "@/components/InfoBoxes";
import connectDb from "@/config/database";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeComponents />
    </div>
  );
};

export default HomePage;
