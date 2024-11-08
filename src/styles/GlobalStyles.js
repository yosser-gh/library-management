import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');    
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&display=swap');
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px; /* Base font size */
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  
`;

export default GlobalStyles;
