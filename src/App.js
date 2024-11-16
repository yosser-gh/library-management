import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <Header />
        <Hero />
        <Spotlight />

        {/* Define the route for NewBooks */}
        <Routes>
          <Route path="/" element={<NewBooks />} />
        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
