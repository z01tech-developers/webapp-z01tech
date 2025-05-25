import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  type?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'zoom-in';
  delay?: number;
  threshold?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  type = 'fade-in', 
  delay = 0,
  threshold = 0.2,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            if (delay) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, threshold]);

  // Animation class map
  const animationClasses = {
    'fade-in': 'fade-in-scroll',
    'slide-in-left': 'slide-in-left-scroll',
    'slide-in-right': 'slide-in-right-scroll',
    'zoom-in': 'zoom-in-scroll'
  };

  return (
    <div
      ref={elementRef}
      className={`${animationClasses[type]} ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 