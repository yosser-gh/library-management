import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Spotlight from "./components/SpotLight";
import NewBooks from "./components/NewBooks";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Hero />
        <Spotlight />
        <NewBooks />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
