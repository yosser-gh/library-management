import React from "react";
import styled from "styled-components";

const SpotlightSection = styled.section`
  display: flex;
  gap: 1em;
  padding: 2em;
  background: #f9f9f9;
`;

const Card = styled.div`
  flex: 1;
  padding: 1em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Spotlight = () => (
  <SpotlightSection>
    <Card>
      <h3>Join the Book Club</h3>
      <p>Be part of our community.</p>
    </Card>
    <Card>
      <h3>Upcoming Poetry Competition</h3>
      <p>Express yourself through words.</p>
    </Card>
    <Card>
      <h3>Book of the Month</h3>
      <p>Explore our top pick.</p>
    </Card>
  </SpotlightSection>
);

export default Spotlight;
