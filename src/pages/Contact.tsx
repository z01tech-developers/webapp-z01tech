import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // In a real application, you would send this data to a server
    // This is a simple simulation of form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Our Location',
      details: '123 Tech Drive, Silicon Valley, CA 94043'
    },
    {
      icon: <FaPhone />,
      title: 'Phone Number',
      details: '+1 (555) 123-4567'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      details: 'hello@z01tech.com'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
      />

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-form-container"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2>Send Us a <span className="neon-text">Message</span></h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <motion.input
                      whileFocus={{ boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <motion.input
                      whileFocus={{ boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <motion.input
                    whileFocus={{ boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <motion.textarea
                    whileFocus={{ boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }}
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></motion.textarea>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 15px #FF4500'
                  }}
                >
                  Send Message
                </motion.button>

                {formStatus.submitted && (
                  <motion.div
                    className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              className="contact-info-container"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <h2>Contact <span className="neon-text">Information</span></h2>
              <p>You can also reach out to us using the following information:</p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-info-item"
                    variants={fadeInUp}
                  >
                    <div className="contact-info-icon">
                      {info.icon}
                    </div>
                    <div className="contact-info-content">
                      <h3>{info.title}</h3>
                      <p>{info.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="contact-map">
                <div className="map-placeholder">
                  <p>Interactive Map</p>
                  <small>Map would be embedded here in a real application</small>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="faq-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Frequently Asked <span className="neon-text">Questions</span></h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How long does a typical project take?</h3>
                <p>Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while complex applications can take several months. We'll provide a detailed timeline during our initial consultation.</p>
              </div>
              <div className="faq-item">
                <h3>What is your pricing structure?</h3>
                <p>We offer flexible pricing options, including fixed-price contracts and hourly rates. The cost depends on project requirements, timeline, and complexity. Contact us for a custom quote.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer maintenance services?</h3>
                <p>Yes, we provide ongoing maintenance and support for all our projects. We offer various maintenance packages tailored to your needs.</p>
              </div>
              <div className="faq-item">
                <h3>How do we start a new project?</h3>
                <p>Fill out the contact form above or reach out directly via email or phone. We'll schedule an initial consultation to discuss your requirements and provide a proposal.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
