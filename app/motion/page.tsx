"use client"

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from "react";


export default function MotionPage() {
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: redRef,
    offset: ["start start", "end end", ]
  });

  // Opacity transformations based on scroll progress
  const starfieldOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const wormholeOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const starfieldScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const wormholeScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      <motion.section
        ref={blueRef}
        style={{
          position:        'fixed',
          width:           '100vw',
          height:          '100vh',
          backgroundColor: 'blue',
          opacity:         starfieldOpacity,
          scale:           starfieldScale,
        }}
      >
        First Section (Fixed)
      </motion.section>
      <motion.section
        ref={redRef}
        style={{
          width:           '100%',
          height:          '500vh',
          backgroundColor: 'red',
          position:        'relative',
          top:             '100vh',
          opacity:         wormholeOpacity,
        }}
      >
        Second Section (Scroll)
      </motion.section>
    </div>
  )
}
