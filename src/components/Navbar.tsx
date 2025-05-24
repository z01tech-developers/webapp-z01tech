import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      textShadow: '0 0 8px #FF0000, 0 0 12px #FF0000',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <motion.span
            className="neon-text"
            whileHover={{ scale: 1.05 }}
          >
            Z01 Tech
          </motion.span>
        </Link>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover">Home</motion.span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover">Services</motion.span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover">About Us</motion.span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/team"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover">Team</motion.span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover">Contact</motion.span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <motion.button
          className="btn btn-primary"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 8px #FF4500, 0 0 15px #FF4500'
          }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;
