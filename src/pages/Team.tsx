import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in tech, Alex has led multiple successful startups before founding Z01 Tech.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Sophia Chen',
      role: 'CTO',
      bio: 'An expert in AI and blockchain technologies, Sophia oversees all technical aspects of our projects.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Marcus Williams',
      role: 'Lead Designer',
      bio: 'Award-winning designer with a passion for creating intuitive and visually stunning user interfaces.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Olivia Taylor',
      role: 'Frontend Developer',
      bio: 'Frontend specialist with expertise in React and cutting-edge animation techniques.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'David Kim',
      role: 'Backend Developer',
      bio: 'Experienced backend engineer specializing in scalable architecture and database optimization.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Emma Rodriguez',
      role: 'Marketing Director',
      bio: 'Strategic marketer with a background in digital campaigns for tech companies.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'James Wilson',
      role: 'Mobile Developer',
      bio: 'iOS and Android expert focused on creating seamless mobile experiences.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Ava Patel',
      role: 'Project Manager',
      bio: 'Certified project manager with a track record of delivering complex projects on time and within budget.',
      image: '',
      social: {
        linkedin: 'https://linkedin.com'
      }
    }
  ];

  const departments = [
    {
      name: 'Leadership',
      members: [0, 1]
    },
    {
      name: 'Development',
      members: [3, 4, 6]
    },
    {
      name: 'Design',
      members: [2]
    },
    {
      name: 'Operations',
      members: [5, 7]
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="team-page">
      <PageHeader
        title="Our Team"
        subtitle="Meet the talented individuals behind Z01 Tech"
      />

      <div className="team-content">
        <div className="container">
          <motion.div
            className="team-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Our team is composed of passionate experts in their respective fields, dedicated to pushing the
              boundaries of digital innovation and delivering exceptional results for our clients.
            </p>
          </motion.div>

          {departments.map((department, departmentIndex) => (
            <section className="team-department" key={departmentIndex}>
              <motion.h2
                className="department-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {department.name}
              </motion.h2>

              <motion.div
                className="team-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {department.members.map((memberIndex) => {
                  const member = teamMembers[memberIndex];
                  return (
                    <motion.div
                      key={memberIndex}
                      className="team-card"
                      variants={fadeInUp}
                      whileHover={{
                        y: -10,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 0, 0, 0.3)'
                      }}
                    >
                      <div className="member-image">
                        <div className="image-placeholder">
                          {member.name.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <p className="member-bio">{member.bio}</p>
                        <div className="member-social">
                          {member.social.linkedin && (
                            <motion.a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{
                                scale: 1.2,
                                color: '#0A66C2'
                              }}
                            >
                              <FaLinkedin />
                            </motion.a>
                          )}
                          {member.social.twitter && (
                            <motion.a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{
                                scale: 1.2,
                                color: '#1DA1F2'
                              }}
                            >
                              <FaTwitter />
                            </motion.a>
                          )}
                          {member.social.github && (
                            <motion.a
                              href={member.social.github}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{
                                scale: 1.2,
                                color: '#FFFFFF'
                              }}
                            >
                              <FaGithub />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          ))}

          <motion.div
            className="join-team-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Join <span className="neon-text">Our Team</span></h2>
            <p>
              We're always looking for talented individuals to join our team. If you're passionate about
              technology and innovation, we'd love to hear from you.
            </p>
            <motion.button
              className="btn btn-primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px #FF4500'
              }}
              onClick={() => window.location.href = '/contact'}
            >
              View Open Positions
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Team;
