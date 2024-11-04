import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #191919;
  color: #fff;
  padding: 2em;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 City Central Library</p>
  </FooterContainer>
);

export default Footer;
