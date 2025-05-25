import { motion } from 'framer-motion';
import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Animation variants for content elements
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-transition-container"
    >
      {React.Children.map(children, (child, i) => {
        // Only apply variants to direct div, section elements, etc.
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          // For components we pass the variants as props
          return React.cloneElement(child as React.ReactElement, {
            variants: itemVariants,
            key: i,
          });
        }
        
        // For HTML elements, wrap them in motion.div
        if (React.isValidElement(child) && typeof child.type === 'string') {
          return (
            <motion.div variants={itemVariants} key={i}>
              {child}
            </motion.div>
          );
        }
        
        return child;
      })}
    </motion.div>
  );
};

export default PageTransition; 