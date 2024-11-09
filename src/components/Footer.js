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
    <p>Copyright © 2024. All rights reserved</p>
  </FooterContainer>
);

export default Footer;
