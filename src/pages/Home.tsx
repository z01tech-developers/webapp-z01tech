import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaMobileAlt, FaChartLine, FaRocket, FaArrowRight } from 'react-icons/fa';
import HeroAnimation from '../components/three/HeroAnimation';
import AboutAnimation from '../components/three/AboutAnimation';
import PageTransition from '../components/PageTransition';
import { useEffect, useRef, useState } from 'react';
import '../styles/Home.css';
import '../styles/ThreeAnimations.css';

// Fallback components as a backup
const FallbackHeroAnimation = () => (
  <div className="fallback-hero-animation">
    <div className="pulse-circle"></div>
  </div>
);

const FallbackAboutAnimation = () => (
  <div className="fallback-about-animation">
    <div className="circuit-lines"></div>
    <div className="floating-text">Z01 TECH</div>
  </div>
);

// Background particles
const ParticleBackground = () => {
  return (
    <div className="particles-container">
      {Array.from({ length: 80 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 1}px`,
            height: `${Math.random() * 5 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Split text animation
interface SplitTextProps {
  text: string;
  className?: string;
  wordClass?: string;
  charClass?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = "", 
  wordClass = "", 
  charClass = "" 
}) => {
  return (
    <span className={className}>
      {text.split(" ").map((word, wordIndex) => (
        <span className={`word ${wordClass}`} key={wordIndex}>
          {word.split("").map((char, charIndex) => (
            <span className={`char ${charClass}`} key={charIndex}>
              {char}
            </span>
          ))}
          {wordIndex !== text.split(" ").length - 1 && " "}
        </span>
      ))}
    </span>
  );
};

// Floating decoration elements
const FloatingElements = () => {
  return (
    <div className="floating-elements">
      <motion.div 
        className="floating-shape shape-1"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="floating-shape shape-2"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -8, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="floating-shape shape-3"
        animate={{
          y: [0, -15, 0],
          x: [0, 15, 0],
          rotate: [0, 10, 0],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

// Scroll indicator
const ScrollIndicator = () => {
  const handleScroll = () => {
    // Scroll to the services section smoothly
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="scroll-indicator"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      onClick={handleScroll}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>Scroll</span>
      <motion.div 
        className="scroll-arrow"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <FaArrowRight />
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.65, 0.3, 0.9]
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
    <PageTransition>
      <div className="home-page">
        <ParticleBackground />
        
        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <motion.div 
            className="hero-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          
          <HeroAnimation />
          <FloatingElements />
          
          <div className="hero-content">
            <motion.div
              className="hero-title-container"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              <h1 className="hero-title">
                <SplitText 
                  text="Pushing The Boundaries Of" 
                  className="split-heading"
                  charClass="hero-char"
                />
                <motion.span 
                  className="gradient-text highlight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  Digital Innovation
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.1 }}
            >
              We build cutting-edge digital solutions that transform businesses and create exceptional user experiences.
            </motion.p>
            
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <Link to="/services">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 25px rgba(52, 152, 219, 0.7)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Our Services
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="btn btn-secondary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(52, 152, 219, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* The Three.js animation replaces the static tech-graphic */}
          </motion.div>
          
          <ScrollIndicator />
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
              <h2>Our <span className="gradient-text">Services</span></h2>
              <p>Innovative solutions for the digital age</p>
              <div className="section-divider"></div>
            </motion.div>

            <motion.div
              className="services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 10px 30px rgba(52, 152, 219, 0.2), 0 0 15px rgba(52, 152, 219, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
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
                <h2>Who <span className="gradient-text">We Are</span></h2>
                <p>Z01 Tech is a forward-thinking digital agency specializing in creating cutting-edge web and mobile applications, innovative social media strategies, and comprehensive digital solutions.</p>
                <p>Our team of experts is committed to pushing the boundaries of what's possible in the digital realm, delivering exceptional results for our clients.</p>
                <Link to="/about">
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(52, 152, 219, 0.7)'
                    }}
                    whileTap={{ scale: 0.98 }}
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
                <AboutAnimation />
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
              <h2>Ready to <span className="gradient-text">Transform</span> Your Digital Presence?</h2>
              <p>Let's work together to build something extraordinary.</p>
              <Link to="/contact">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 25px rgba(52, 152, 219, 0.7)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
