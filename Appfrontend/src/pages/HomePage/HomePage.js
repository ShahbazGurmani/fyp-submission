import React from "react";
import Layout from "../../components/Layout/Layout.js";
import HeroSection from "./Sections/HeroSecttion.js";
import AboutSection from "./Sections/AboutSection.js";
import CitySection from "./Sections/CitySection.js";
import GetApp from "./Sections/GetApp.js";
import FAQSection from "./Sections/FAQSection.js";
const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      {/* AbouSalon Section */}
      <AboutSection />
      {/* cities */}
      <CitySection />
      {/* get app  Section */}
      <GetApp />
      {/* FAQ Section */}
      <FAQSection />
    </Layout>
  );
};

export default HomePage;
