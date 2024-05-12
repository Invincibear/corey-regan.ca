"use client"

import Wormhole     from "@/components/Wormhole"
import { useRef, useState } from "react"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"


export default function WormholeHero() {
  // Reference HTML elements
  const sectionRef = useRef(null)
  const divRef = useRef(null)

  // Zoom properties
  const zoomInitialSpeed = .3
  const zoomFullyInViewSpeed = 2.69
  const [zoomScrollSpeed, setZoomScrollSpeed] = useState(zoomInitialSpeed)

  // Visibility properties
  const [isVisible, setIsVisible] = useState(false)
  const [isFullyVisible, setIsFullyVisible] = useState(false)

  // Scrolling properties
  const { scrollYProgress } = useScroll({
    // target:    divRef.current,
    // container: sectionRef.current,
    // target:    sectionRef.current,
    // container: divRef.current,
    // offset:    ["end end", "end start"],
  })
  const scaleZoom = useSpring(scrollYProgress, { bounce: 0 }) // 0 bounce prevents unintentional backwards movement

  const checkIfFullyVisible = () => {
    console.log(scrollYProgress)
  }

  return (
    <motion.section
      id              = "wormhole-hero"
      className       = "relative w-full bg-pink-500 h-500vh"
      ref             = {sectionRef}
      onScroll        = {checkIfFullyVisible}
      onViewportEnter = {() => setIsVisible(true)}
      onViewportLeave = {() => setIsVisible(false)}
    >
      <motion.div ref={divRef} className="w-full h-full top-0 ">
        <Wormhole isVisible={isVisible} scrollProgress={scaleZoom} zoomScrollSpeed={zoomScrollSpeed} />
      </motion.div>
    </motion.section>
  )
}
