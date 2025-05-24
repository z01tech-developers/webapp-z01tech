import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { icon: <FaGithub />, url: 'https://github.com' },
    { icon: <FaFacebook />, url: 'https://facebook.com' }
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="footer-container">
        <motion.div className="footer-logo-section" variants={itemVariants}>
          <Link to="/" className="footer-logo">
            <span className="neon-text">Z01 Tech</span>
          </Link>
          <p>Pushing the boundaries of digital innovation</p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.2,
                  textShadow: '0 0 8px #FF0000, 0 0 15px #FF0000'
                }}
                className="social-icon"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="footer-links">
          <motion.div className="footer-links-column" variants={itemVariants}>
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-links-column" variants={itemVariants}>
            <h3>Services</h3>
            <ul>
              <li><Link to="/services#web-development">Web Development</Link></li>
              <li><Link to="/services#app-development">App Development</Link></li>
              <li><Link to="/services#social-media">Social Media</Link></li>
              <li><Link to="/services#ai">AI Solutions</Link></li>
              <li><Link to="/services#blockchain">Blockchain</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-links-column" variants={itemVariants}>
            <h3>Contact</h3>
            <ul>
              <li>hello@z01tech.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Tech Drive, Silicon Valley</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div className="footer-bottom" variants={itemVariants}>
        <div className="copyright">
          &copy; {currentYear} Z01 Tech. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
