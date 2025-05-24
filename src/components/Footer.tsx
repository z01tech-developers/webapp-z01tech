import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Company Info */}
            <div className="footer-widget">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="footer-widget-title">Z01 Tech</h3>
                <p>Innovative solutions for a digital world. Building the future with technology that matters.</p>
                <div className="social-links">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
                    <a key={platform} href={`https://${platform}.com`} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                      <i className={`icon-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-widget">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="footer-widget-title">Quick Links</h3>
                <ul className="footer-links">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' },
                    { name: 'Services', path: '/services' },
                    { name: 'Team', path: '/team' },
                    { name: 'Contact', path: '/contact' }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Services */}
            <div className="footer-widget">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="footer-widget-title">Our Services</h3>
                <ul className="footer-links">
                  {[
                    'Web Development',
                    'Mobile Apps',
                    'Cloud Solutions',
                    'AI Integration',
                    'Cybersecurity'
                  ].map((service) => (
                    <li key={service}>
                      <Link to="/services">{service}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Contact */}
            <div className="footer-widget">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="footer-widget-title">Contact Us</h3>
                <ul className="contact-info">
                  <li>
                    <i className="icon-location"></i>
                    <span>123 Tech Street, Suite 100<br />San Francisco, CA 94107</span>
                  </li>
                  <li>
                    <i className="icon-phone"></i>
                    <span>(123) 456-7890</span>
                  </li>
                  <li>
                    <i className="icon-email"></i>
                    <span>info@z01tech.com</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} Z01 Tech. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
