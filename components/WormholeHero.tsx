"use client"

import Wormhole from "@/components/Wormhole"
import WormholeCurved from "@/components/WormholeCurved"
import { useEffect, useRef, useState } from "react"

import { motion, useAnimation, useScroll, useSpring, useTransform } from "framer-motion"


export default function WormholeHero() {
  // Reference HTML elements
  const sectionRef = useRef(null)
  const divRef = useRef(null)

  // Zoom properties
  const zoomInitialSpeed = 5   // 0.3
  const zoomFullyInViewSpeed = 3 //.3  // 2.69
  const [zoomScrollSpeed, setZoomScrollSpeed] = useState(zoomInitialSpeed)

  // Visibility properties
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isWormholeFullyVisible, setIsWormholeFullyVisible] = useState(false)

  // Scrolling properties
  const { scrollYProgress } = useScroll({
    // target:    divRef.current,
    // container: sectionRef.current,
    // target:    sectionRef.current,
    // container: divRef.current,
    // offset:    ["end end", "end start"],
  })
  const { scrollY } = useScroll()
  const scaleZoom = useSpring(scrollYProgress, { bounce: 0 }) // 0 bounce prevents unintentional backwards movement
  const controls = useAnimation();

  const checkIfFullyVisible = () => {
    console.log(scrollYProgress)
  }


  // Calculates if the wormhole is fully in-view, and if it is then increase the zoom-in speed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) { // Check if fully visible
          console.debug("calling setIsFullyVisible(true)")
          setIsWormholeFullyVisible(true)
          console.debug("calling setZoomScrollSpeed(zoomFullyInViewSpeed)")
          setZoomScrollSpeed(zoomFullyInViewSpeed)
          console.debug("zoomScrollSpeed is set to: ", zoomScrollSpeed)

          controls.start({
            // opacity: 1,
            // transition: { duration: 0.5 },
          })
        } else {
          console.debug("calling setIsFullyVisible(false)")
          setIsWormholeFullyVisible(false)
          console.debug("calling setZoomScrollSpeed(zoomInitialSpeed)")
          setZoomScrollSpeed(zoomInitialSpeed)
          console.debug("zoomScrollSpeed is set to: ", zoomScrollSpeed)

          controls.start({
            // opacity: 0.5,
            // transition: { duration: 0.5 },
          })
        }
      },
      {
        root: null, // Assuming the viewport
        rootMargin: '0px',
        threshold: 1.0 // 1.0 means completely inside the viewport
      }
    )

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    }
  }, [controls]) // Only rerun when controls changes


  useEffect(() => {
    console.debug("zoomScrollSpeed updated to: ", zoomScrollSpeed);
    // Any logic that depends on the updated value of zoomScrollSpeed
  }, [zoomScrollSpeed]) // Only rerun when zoomScrollSpeed changes


  return (
    <motion.section
      id              = "wormhole-hero"
      className       = "w-full bg-pink-500 h-500vh"
      ref             = {sectionRef}
      // onScroll        = {checkIfFullyVisible}
      onViewportEnter = {() => setIsSectionVisible(true)}
      onViewportLeave = {() => setIsSectionVisible(false)}
    >
      <motion.div
        animate   = {controls}
        // className = "w-full h-full top-0"
        className = "size-96 top-0 sticky h-screen"
        ref       = {divRef}
      >
{/*        <Wormhole
          isVisible       = {isSectionVisible}
          scrollProgress  = {scaleZoom}
          zoomScrollSpeed = {zoomScrollSpeed}
        />*/}
        <WormholeCurved
          isVisible       = {isSectionVisible}
          scrollProgress  = {scaleZoom}
          zoomScrollSpeed = {zoomScrollSpeed}
        />
      </motion.div>
    </motion.section>
  )
}
