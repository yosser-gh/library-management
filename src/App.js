import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Catalog from './components/BookList';
import EventList from './components/EventLists';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
