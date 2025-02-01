import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import image1 from "./images/kgf 5.png"
const AnimatedComponent = () => {
      // This is necessary because GSAP needs to work with actual DOM elements
  const boxRef = useRef(null);
  
  useEffect(() => {
   
    const element = boxRef.current;
    
   
    const tl = gsap.timeline({
     
      repeat: 0, // -1 means infinite repetition
      yoyo: true // Makes the animation reverse on alternate cycles
    });
    
    // Add animations to our timeline
    tl.to(element, {
      duration: 2,
      x: 200, // Move 200px to the right
      rotation: 0, // Full rotation
      backgroundColor: '#e44242', // Animate color change
      ease: 'power2.inOut' // Smooth easing function
    });
    
    // Cleanup function to kill the animation when component unmounts
    return () => {
      tl.kill();
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <div 
      ref={boxRef}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#3498db',
        borderRadius: '8px',

      }}
    >
      Animated Box <img src={image1} alt="kgf image" style={{
        width: '200px',
        height: '200px',
        
      }} />
    </div>
  );
};

export default AnimatedComponent;