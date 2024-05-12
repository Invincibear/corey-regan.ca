"use client"

import Wormhole     from "@/components/Wormhole"
import { useState } from "react"

import { motion, useScroll, useSpring } from "framer-motion"


export default function WormholeHero() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleZoom = useSpring(scrollYProgress, { bounce: 0 }) // 0 bounce prevents unintentional backwards movement

  return (
    <motion.section
      id              = "wormhole-hero"
      className       = "relative w-full h-screen bg-black"
      onViewportEnter = {() => setIsVisible(true)}
      onViewportLeave = {() => setIsVisible(false)}
    >
      <Wormhole isVisible={isVisible} scrollProgress={scaleZoom} scaleZoom={scaleZoom} />
    </motion.section>
  )
}
