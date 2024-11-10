// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Reservations } from './components/Reservations';
import { Contact } from './components/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/globals.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferência do usuário salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <ThemeProvider value={{ isDarkMode, toggleTheme }}>
      <Router>
        <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
          <nav className="navbar">
            <div className="logo">
              <Link to="/">Restaurante</Link>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/reservations">Reservas</Link>
              <Link to="/contact">Contato</Link>
              <button onClick={toggleTheme} className="theme-toggle">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <footer className="footer">
            <p>© 2024 Restaurante. Todos os direitos reservados.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
