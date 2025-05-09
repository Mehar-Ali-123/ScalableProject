import Hero from "../components/Hero";
import OurMission from "../components/OurMission";
import AboutSectionHome from "../components/AboutSectionHome.js";
export default function Home() {
  return (
    <>
      <Hero />
      <OurMission OurMission="Our mission is to offer customers ease of mind by providing an easy way to track and offset carbon emissions, tailored to your lifestyle." />
      <AboutSectionHome />
    </>
  );
}
