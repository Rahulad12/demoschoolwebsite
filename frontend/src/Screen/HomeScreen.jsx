import React from "react";
import Coverpage from "../Components/Coverpage";
import WhyChooseSchool from "../Components/WhyChooseschool";
import Contact from "../Components/Contact";
import Notice from "../Components/Notice";
const HomeScreen = () => {
  return (
    <div>
      <Coverpage />
      <Notice />
      <WhyChooseSchool />
      <Contact />
    </div>
  );
};

export default HomeScreen;
