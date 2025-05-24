import { motion } from 'framer-motion';
import '../styles/PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, subtitle, backgroundImage }: PageHeaderProps) => {
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="page-header" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}>
      <div className="overlay"></div>
      <div className="container">
        <motion.div
          className="header-content"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <motion.h1 className="header-title" variants={textVariants}>
            <span className="neon-text">{title}</span>
          </motion.h1>
          {subtitle && (
            <motion.p className="header-subtitle" variants={textVariants}>
              {subtitle}
            </motion.p>
          )}
          <motion.div className="header-line" variants={textVariants}></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
