import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import AdminPage from './components/AdminPage';

export default function App() {
  return (
    <div className="container">
      <nav className="nav">
        <div className="logo"><h1>URL Shortener</h1></div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <footer className="footer">Built with MERN • URL Shortener</footer>
    </div>
  );
}
