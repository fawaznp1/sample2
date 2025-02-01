import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AlternatingSidesAnimation = () => {
  // Create refs for multiple boxes that will animate
  const boxRefs = useRef([]);
  
  // Helper function to add elements to our refs array
  const addToRefs = (el) => {
    if (el && !boxRefs.current.includes(el)) {
      boxRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Set initial positions - odd boxes start from left, even from right
    boxRefs.current.forEach((box, index) => {
      // Even indices start from right, odd from left
      const startX = index % 2 === 0 ? -300 : 300;
      gsap.set(box, { x: startX });
    });

    // Create the animation timeline
    const tl = gsap.timeline({
      repeat: 0, // Infinite repetition
      yoyo: true, // Reverse animation
      repeatDelay: 1 // Add a 1-second delay between repetitions
    });

    // Animate all boxes to their center position
    tl.to(boxRefs.current, {
      duration: 2,
      x: 0, // Move to center
      stagger: {
        each: 0.2, // Time between each animation
        from: "start" // Start from the first element
      },
      ease: "power2.out",
      rotation: 0 // Full rotation as they move
    });

    // Cleanup on unmount
    return () => {
      tl.kill();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Create an array of 2 boxes
  const boxes = Array(2).fill(null);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      alignItems: 'center',
      padding: '20px',
      height: '100vh'
    }}>
      {boxes.map((_, index) => (
        <div
          key={index}
          ref={addToRefs}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: `hsl(${index * 30}, 70%, 60%)`, // Different color for each box
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Box {index + 1}
        </div>
      ))}
    </div>
  );
};

export default AlternatingSidesAnimation;