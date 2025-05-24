import { motion } from 'framer-motion';
import { FaLightbulb, FaUserAstronaut, FaRocket, FaCog } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import VisionAnimation from '../components/three/VisionAnimation';
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

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

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

  return (
    <div className="about-page">
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
              <h2><span className="neon-text">Our</span> Vision</h2>
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
                  whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 82, 82, 0.3)' }}
                >
                  <h3 className="stat-value neon-text">{stat.value}</h3>
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
              <h2>Our <span className="neon-text">Values</span></h2>
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
                  whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 82, 82, 0.3)' }}
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

          {/* Our Approach Section */}
          <section className="about-section approach-section">
            <motion.div
              className="section-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2><span className="neon-text">Our</span> Approach</h2>
              <p className="large-text">
                We believe in a collaborative and transparent approach to every project, working closely
                with our clients to understand their unique needs and goals.
              </p>
              <div className="approach-steps">
                <div className="approach-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h3>Discovery</h3>
                    <p>We start by deeply understanding your business, goals, and target audience to create a solid foundation for your project.</p>
                  </div>
                </div>
                <div className="approach-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h3>Strategy</h3>
                    <p>Based on our findings, we develop a comprehensive strategy and roadmap tailored to your specific needs and objectives.</p>
                  </div>
                </div>
                <div className="approach-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h3>Creation</h3>
                    <p>Our team of experts works diligently to bring your vision to life, using the latest technologies and best practices.</p>
                  </div>
                </div>
                <div className="approach-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h3>Refinement</h3>
                    <p>We continuously test, refine, and optimize your solution to ensure it meets and exceeds expectations.</p>
                  </div>
                </div>
                <div className="approach-step">
                  <div className="step-number">05</div>
                  <div className="step-content">
                    <h3>Launch & Growth</h3>
                    <p>After launch, we provide ongoing support and guidance to help your digital presence grow and evolve.</p>
                  </div>
                </div>
              </div>
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
            <h2>Ready to <span className="neon-text">Work</span> with Us?</h2>
            <p>Let's create something amazing together.</p>
            <motion.button
              className="btn btn-primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px #ff7b52'
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
