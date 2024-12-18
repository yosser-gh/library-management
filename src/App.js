import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import VerifySignup from "./pages/VerifySignup";
import Login from "./pages/login"
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Events from "./pages/Events";
import About from "./pages/About";
import Profile from "./pages/Profile";
import EventDetails from "./components/EventDetails";


function App() {
  const [user, setUser] = useState(null); // Track the logged-in user

  useEffect(() => {
    // Check for a token in localStorage and decode user information
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUser({ username: user.username, role: user.role });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/books" element={<Books />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-signup" element={<VerifySignup />} />
          {user && user.role === "admin" && <Route path="/dashboard" element={<AdminDashboard />} />}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
