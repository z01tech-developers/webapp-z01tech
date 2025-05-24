import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaMobileAlt, FaChartLine, FaRocket } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const services = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with the latest technologies.',
      link: '/services#web-development'
    },
    {
      icon: <FaMobileAlt />,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      link: '/services#app-development'
    },
    {
      icon: <FaChartLine />,
      title: 'Social Media',
      description: 'Strategic social media marketing and management to grow your online presence.',
      link: '/services#social-media'
    },
    {
      icon: <FaRocket />,
      title: 'Digital Strategy',
      description: 'Comprehensive digital strategies to accelerate your business growth.',
      link: '/services#digital-strategy'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Pushing The Boundaries Of <span className="neon-text">Digital Innovation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            We build cutting-edge digital solutions that transform businesses and create exceptional user experiences.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/services">
              <motion.button
                className="btn btn-primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px #FF4500'
                }}
              >
                Our Services
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                className="btn btn-secondary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px #FF0000'
                }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <div className="hero-image-container">
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Futuristic tech graphic or animation would go here */}
            <div className="tech-graphic"></div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Our <span className="neon-text">Services</span></h2>
            <p>Innovative solutions for the digital age</p>
            <div className="section-divider"></div>
          </motion.div>

          <motion.div
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(255,0,0,0.5)'
                }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link} className="learn-more">
                  Learn More
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section about-preview-section">
        <div className="container">
          <div className="about-preview-grid">
            <motion.div
              className="about-preview-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2>Who <span className="neon-text">We Are</span></h2>
              <p>Z01 Tech is a forward-thinking digital agency specializing in creating cutting-edge web and mobile applications, innovative social media strategies, and comprehensive digital solutions.</p>
              <p>Our team of experts is committed to pushing the boundaries of what's possible in the digital realm, delivering exceptional results for our clients.</p>
              <Link to="/about">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 15px #FF4500'
                  }}
                >
                  About Us
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              className="about-preview-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="tech-team-image"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Ready to <span className="neon-text">Transform</span> Your Digital Presence?</h2>
            <p>Let's work together to build something extraordinary.</p>
            <Link to="/contact">
              <motion.button
                className="btn btn-primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px #FF4500'
                }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
