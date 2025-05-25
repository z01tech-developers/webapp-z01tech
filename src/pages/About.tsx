import { motion, useAnimation } from 'framer-motion';
import { FaLightbulb, FaUserAstronaut, FaRocket, FaCog, FaArrowRight, FaCheck, FaCircle } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import VisionAnimation from '../components/three/VisionAnimation';
import { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import '../styles/ThreeAnimations.css';

// Fallback component as a backup
const FallbackVisionAnimation = () => (
  <div className="fallback-vision-animation">
    <div className="lightbulb-icon">
      <div className="bulb"></div>
      <div className="base"></div>
    </div>
  </div>
);

// Floating decorative elements
const CircuitPatterns = () => {
  return (
    <div className="circuit-patterns">
      <motion.div 
        className="circuit-line horizontal line-1"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div 
          className="circuit-node"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
      </motion.div>
      
      <motion.div 
        className="circuit-line vertical line-1"
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <motion.div 
          className="circuit-node"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />
      </motion.div>
      
      <motion.div 
        className="circuit-line diagonal line-1"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.3, delay: 1.5 }}
      >
        <motion.div 
          className="circuit-node"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
      </motion.div>
      
      <motion.div 
        className="circuit-line horizontal line-2"
        initial={{ width: 0 }}
        animate={{ width: '80%' }}
        transition={{ duration: 1, delay: 2 }}
      />
      
      <motion.div 
        className="data-flow flow-1"
        animate={{ 
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: 3, 
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      
      <motion.div 
        className="data-flow flow-2"
        animate={{ 
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: 4, 
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 2,
          delay: 1
        }}
      />
    </div>
  );
};

// Futuristic floating tech elements
const TechElements = () => {
  return (
    <div className="tech-elements">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className={`tech-shape shape-${index + 1}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.2 + 1 
          }}
        >
          <motion.div 
            className="shape-inner"
            animate={{ 
              rotate: index % 2 === 0 ? [0, 360] : [360, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20 + index * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Process step component
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  number, 
  title, 
  description, 
  isActive, 
  isCompleted, 
  onClick 
}) => {
  return (
    <motion.div 
      className={`process-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 8px 30px rgba(52, 152, 219, 0.2)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="process-step-number">
        {isCompleted ? (
          <motion.div 
            className="check-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <FaCheck />
          </motion.div>
        ) : (
          number
        )}
      </div>
      <div className="process-step-content">
        <h3>{title}</h3>
        <p>{description}</p>
        
        {isActive && (
          <motion.div 
            className="process-step-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <div className="detail-card">
              <div className="detail-icon">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {title === 'Discovery' && <FaLightbulb />}
                  {title === 'Strategy' && <FaUserAstronaut />}
                  {title === 'Creation' && <FaRocket />}
                  {title === 'Refinement' && <FaCog />}
                  {title === 'Launch & Growth' && <FaRocket />}
                </motion.div>
              </div>
              <div className="detail-text">
                <p>{getStepDetails(title)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <motion.div 
        className="process-progress"
        initial={{ width: 0 }}
        animate={{ width: isCompleted ? '100%' : isActive ? '50%' : '0%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// Helper function to get detailed text for each step
const getStepDetails = (title: string): string => {
  switch(title) {
    case 'Discovery':
      return 'Our discovery phase involves in-depth research, user interviews, competitive analysis, and stakeholder workshops to fully understand your business challenges and opportunities.';
    case 'Strategy':
      return 'We develop a comprehensive roadmap that outlines technical requirements, design direction, content strategy, and key performance indicators aligned with your business goals.';
    case 'Creation':
      return 'Our multidisciplinary team collaborates to bring your vision to life, combining cutting-edge technology, stunning design, and engaging content in an agile development process.';
    case 'Refinement':
      return 'Through rigorous testing, user feedback, and data analysis, we continuously optimize your solution for performance, usability, and business impact before launch.';
    case 'Launch & Growth':
      return 'We ensure a smooth deployment and provide ongoing support, analytics, and strategic guidance to help your digital presence evolve and grow with your business.';
    default:
      return '';
  }
};

// Glowing grid decoration
const GridDecoration = () => {
  return (
    <div className="grid-decoration">
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div 
          key={index}
          className="grid-dot"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ 
            duration: 3,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

const About = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const approachRef = useRef(null);
  const controls = useAnimation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Auto-advance steps for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        // Update completed steps
        if (!completedSteps.includes(prev)) {
          setCompletedSteps(current => [...current, prev]);
        }
        
        // Cycle through steps 0-4
        return (prev + 1) % 5;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, [completedSteps]);

  // Trigger animations when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (approachRef.current) {
      observer.observe(approachRef.current);
    }
    
    return () => {
      if (approachRef.current) {
        observer.unobserve(approachRef.current);
      }
    };
  }, [controls]);

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '10+', label: 'Completed Projects' },
    { value: '5+', label: 'Team Members' },
    { value: '10+', label: 'Happy Clients' }
  ];

  const values = [
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible, embracing new technologies and creative approaches to solve complex problems.'
    },
    {
      icon: <FaUserAstronaut />,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality in everything we do, paying meticulous attention to detail and refinement.'
    },
    {
      icon: <FaRocket />,
      title: 'Impact',
      description: 'We focus on creating solutions that generate measurable results and meaningful impact for our clients and their users.'
    },
    {
      icon: <FaCog />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork, both within our organization and in our partnerships with clients.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by deeply understanding your business, goals, and target audience to create a solid foundation for your project.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Based on our findings, we develop a comprehensive strategy and roadmap tailored to your specific needs and objectives.'
    },
    {
      number: '03',
      title: 'Creation',
      description: 'Our team of experts works diligently to bring your vision to life, using the latest technologies and best practices.'
    },
    {
      number: '04',
      title: 'Refinement',
      description: 'We continuously test, refine, and optimize your solution to ensure it meets and exceeds expectations.'
    },
    {
      number: '05',
      title: 'Launch & Growth',
      description: 'After launch, we provide ongoing support and guidance to help your digital presence grow and evolve.'
    }
  ];

  return (
    <div className="about-page">
      <CircuitPatterns />
      <TechElements />
      
      <PageHeader
        title="About Us"
        subtitle="The story behind Z01 Tech and our mission"
      />

      <div className="about-content">
        <div className="container">
          {/* Vision Section */}
          <section className="about-section vision-section">
            <motion.div
              className="section-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2><span className="gradient-text">Our</span> Vision</h2>
              <p className="large-text">
                At Z01 Tech, we envision a future where technology seamlessly enhances human experiences,
                driving innovation and creating meaningful connections in an increasingly digital world.
              </p>
              <p>
                Founded in 2020, Z01 Tech has rapidly established itself as a forward-thinking digital agency
                specialized in creating cutting-edge web and mobile applications, innovative social media strategies,
                and comprehensive digital solutions for businesses of all sizes.
              </p>
              <p>
                Our team of experts combines technical expertise with creative thinking to deliver exceptional
                results that help our clients succeed in the digital landscape. We are passionate about pushing
                the boundaries of what's possible and committed to staying at the forefront of technological advancements.
              </p>
            </motion.div>
            <motion.div
              className="vision-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <VisionAnimation />
            </motion.div>
          </section>

          {/* Stats Section */}
          <motion.section
            className="stats-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(52, 152, 219, 0.2), 0 0 15px rgba(52, 152, 219, 0.3)' }}
                >
                  <h3 className="stat-value gradient-text">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Our Values Section */}
          <section className="about-section values-section">
            <motion.div
              className="section-header center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2>Our <span className="gradient-text">Values</span></h2>
              <p>The principles that drive everything we do</p>
              <div className="section-divider"></div>
            </motion.div>

            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(52, 152, 219, 0.2), 0 0 15px rgba(52, 152, 219, 0.3)' }}
                >
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Approach Section - Redesigned */}
          <section className="about-section approach-section" ref={approachRef}>
            <GridDecoration />
            <motion.div
              className="section-content"
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
            >
              <h2><span className="gradient-text">Our</span> Approach</h2>
              <p className="large-text">
                We believe in a collaborative and transparent approach to every project, working closely
                with our clients to understand their unique needs and goals.
              </p>
              
              <motion.div 
                className="process-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="process-background">
                  <div className="process-line"></div>
                  <motion.div 
                    className="process-progress-indicator"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(activeStep / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="process-steps">
                  {processSteps.map((step, index) => (
                    <ProcessStep 
                      key={index}
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      isActive={activeStep === index}
                      isCompleted={completedSteps.includes(index)}
                      onClick={() => {
                        setActiveStep(index);
                        if (activeStep > index && !completedSteps.includes(index)) {
                          setCompletedSteps(current => [...current, index]);
                        }
                      }}
                    />
                  ))}
                </div>
                
                <div className="process-navigation">
                  <motion.button 
                    className="nav-button prev"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveStep(prev => (prev === 0 ? 4 : prev - 1));
                    }}
                  >
                    <FaArrowRight style={{ transform: 'rotate(180deg)' }} />
                  </motion.button>
                  
                  <div className="step-indicators">
                    {processSteps.map((_, index) => (
                      <motion.div 
                        key={index}
                        className={`step-dot ${activeStep === index ? 'active' : ''} ${completedSteps.includes(index) ? 'completed' : ''}`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setActiveStep(index)}
                      />
                    ))}
                  </div>
                  
                  <motion.button 
                    className="nav-button next"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!completedSteps.includes(activeStep)) {
                        setCompletedSteps(current => [...current, activeStep]);
                      }
                      setActiveStep(prev => (prev === 4 ? 0 : prev + 1));
                    }}
                  >
                    <FaArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <motion.section
            className="about-cta-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to <span className="gradient-text">Work</span> with Us?</h2>
            <p>Let's create something amazing together.</p>
            <motion.button
              className="btn btn-primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(52, 152, 219, 0.7)'
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </motion.button>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About;
