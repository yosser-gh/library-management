import React from "react";
import Hero from "../components/Hero";
import Spotlight from "../components/SpotLight";
import NewBooks from "../components/NewBooks";

const Home = () => {
    return (
      <div>
        <Hero />
        <Spotlight />
        <NewBooks />
      </div>
    );
  };
  
  export default Home;