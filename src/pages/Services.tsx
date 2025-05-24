import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaChartLine, FaServer, FaRobot, FaDatabase } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/Services.css';

const Services = () => {
  const servicesData = [
    {
      id: 'web-development',
      icon: <FaCode />,
      title: 'Web Development',
      description: 'We build modern, responsive, and high-performance websites and web applications tailored to your business needs.',
      features: [
        'Responsive Web Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'Progressive Web Apps (PWAs)',
        'Web Application Development',
        'SEO Optimization'
      ]
    },
    {
      id: 'app-development',
      icon: <FaMobileAlt />,
      title: 'App Development',
      description: 'Our team creates intuitive and feature-rich mobile applications for iOS and Android platforms.',
      features: [
        'Native iOS Development',
        'Native Android Development',
        'Cross-platform Solutions',
        'UI/UX Design',
        'App Store Optimization',
        'Maintenance & Support'
      ]
    },
    {
      id: 'social-media',
      icon: <FaChartLine />,
      title: 'Social Media',
      description: 'We help businesses establish and grow their social media presence through strategic planning and execution.',
      features: [
        'Social Media Strategy',
        'Content Creation',
        'Community Management',
        'Social Media Advertising',
        'Influencer Marketing',
        'Performance Analytics'
      ]
    },
    {
      id: 'backend-development',
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Our backend solutions provide the foundation for robust, scalable, and secure applications.',
      features: [
        'API Development',
        'Microservices Architecture',
        'Database Design',
        'Server Configuration',
        'Cloud Integration',
        'DevOps Implementation'
      ]
    },
    {
      id: 'ai-solutions',
      icon: <FaRobot />,
      title: 'AI Solutions',
      description: 'We leverage artificial intelligence and machine learning to create innovative solutions for your business.',
      features: [
        'Machine Learning Implementation',
        'Chatbots & Virtual Assistants',
        'Predictive Analytics',
        'Computer Vision Applications',
        'Natural Language Processing',
        'AI Integration'
      ]
    },
    {
      id: 'blockchain',
      icon: <FaDatabase />,
      title: 'Blockchain',
      description: 'Our blockchain solutions provide transparent, secure, and decentralized systems for your business needs.',
      features: [
        'Smart Contract Development',
        'Decentralized Applications (DApps)',
        'Cryptocurrency Integration',
        'Blockchain Consulting',
        'NFT Development',
        'Security Audits'
      ]
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="services-page">
      <PageHeader
        title="Our Services"
        subtitle="Cutting-edge solutions for the digital age"
      />

      <div className="services-content">
        <div className="container">
          <motion.div
            className="services-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              At Z01 Tech, we offer a comprehensive range of digital services to help businesses thrive in the digital landscape.
              Our team of experts combines technical expertise with creative thinking to deliver solutions that drive results.
            </p>
          </motion.div>

          <motion.div
            className="services-list"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="service-detail-card"
                id={service.id}
                variants={fadeInUp}
              >
                <div className="service-detail-header">
                  <div className="service-icon">{service.icon}</div>
                  <h2>{service.title}</h2>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  <h3>What We Offer</h3>
                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="services-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>Ready to get started?</h2>
            <p>Contact us today to discuss your project and how we can help bring your vision to life.</p>
            <motion.button
              className="btn btn-primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px #FF4500'
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
