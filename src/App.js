import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/Theme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Spotlight from "./components/SpotLight";
import NewBooks from "./components/NewBooks";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Hero />
        <Spotlight />
        <NewBooks />
        <Footer />
    </ThemeProvider>
  );
}

export default App;
