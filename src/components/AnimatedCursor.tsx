import React, { useState, useEffect } from 'react';

const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Function to update cursor position with smooth animation
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Function to update the dot position with no delay (follows cursor exactly)
    const updateDotPosition = (e: MouseEvent) => {
      setDotPosition({ x: e.clientX, y: e.clientY });
    };

    // Function to handle hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Show cursor after it's been moved
    const handleMouseMove = () => {
      setIsVisible(true);
    };

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousemove', updateDotPosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousemove', updateDotPosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default AnimatedCursor; 