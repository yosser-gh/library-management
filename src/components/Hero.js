import React from "react";
import styled from "styled-components";

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  background-image: url('src/images/hero_image.jpg');
  background-size: cover;
  color: black;

  @media (max-width: 768px) {
    height: 50vh;
    padding: 1em;
  }
`;


const Hero = () => (
  <HeroSection>
    <h1>Your Home for Books</h1>
    <p>Discover, explore, and loan books at the City Central Library.</p>
  </HeroSection>
);

export default Hero;