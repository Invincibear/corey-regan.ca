"use client"

import WormholeCurved                                 from "@/components/WormholeCurved"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import {useEffect, useState, useRef}                  from "react"


//
// Wormhole brought to you in part by: 
// https://github.com/jesuisundev/acrossthemultiverse/
//
export default function WormholeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const [scrollPoints, setScrollPoints] = useState({
    viewHeight:           0,
    bodyHeight:           0,
    wormholeSectionStart: 0,
    wormholeSectionEnd:   0,
  })

  useEffect(() => {
    const updateScrollPoints = () => {
      if (sectionRef.current) {
        const viewHeight = window.innerHeight
        const bodyHeight = document.body.scrollHeight

        const wormholeSection = sectionRef.current.getBoundingClientRect()
        const wormholeSectionStart = wormholeSection.top + window.scrollY
        const wormholeSectionEnd = wormholeSectionStart + wormholeSection.height - viewHeight

        setScrollPoints({viewHeight, bodyHeight, wormholeSectionStart, wormholeSectionEnd})
      }
    }

    // Update scroll points initially and on window resize
    updateScrollPoints()
    window.addEventListener('resize', updateScrollPoints)
    return () => window.removeEventListener('resize', updateScrollPoints)
  }, [sectionRef.current])

  // useEffect(() => {
  //   console.debug(scrollPoints)
  // }, [scrollPoints])

  const {scrollYProgress} = useScroll({
    offset: ["start start", "end end"],
  })

  const wormholeSectionOpacity = useTransform(
    scrollYProgress,
     [
       0,
       0.0420,
       0.1,
       1
     ],
    [
      0,
      0,
      1,
      1
    ],
  )
  const wormholeDivOpacity = useTransform(
    scrollYProgress,
     [
       0,
       0.0420,
       0.1,
       (scrollPoints.wormholeSectionEnd - scrollPoints.viewHeight)          / scrollPoints.bodyHeight,
       (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight * 1.25)) / scrollPoints.bodyHeight,
     ],
    [
      0,
      0,
      1,
      1,
      0,
    ],
  )

  const whiteDivOpacity = useTransform(
    scrollYProgress,
     [
       (scrollPoints.wormholeSectionEnd - (scrollPoints.viewHeight / 2)) / scrollPoints.bodyHeight,
       (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight / 1.5)) / scrollPoints.bodyHeight,
       1,
     ],
    [
      0,
      1,
      1,
    ],
  )
  const whiteDivScale = useTransform(
    scrollYProgress,
     [
       (scrollPoints.wormholeSectionEnd - (scrollPoints.viewHeight / 2)) / scrollPoints.bodyHeight,
       (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight / 5)) / scrollPoints.bodyHeight,
       1,
     ],
    [
      0,
      1,
      1,
    ],
  )
  const whiteDivBorderRadius = useTransform(
    scrollYProgress,
    [
      0,
       scrollPoints.wormholeSectionEnd                                  / scrollPoints.bodyHeight,
      (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight / 5)) / scrollPoints.bodyHeight,
    ],
    [
      "100%",
      "100%",
      "0%",
    ],
  )
  const whiteDivWidth = useTransform(
    scrollYProgress,
    [
      0,
      (scrollPoints.wormholeSectionEnd - (scrollPoints.viewHeight / 2)) / scrollPoints.bodyHeight,
      (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight / 5)) / scrollPoints.bodyHeight,
    ],
    [
      "0%",
      "0%",
      "100%",
    ],
  )
  const whiteDivHeight = useTransform(
    scrollYProgress,
    [
      0,
      scrollPoints.wormholeSectionEnd                                   / scrollPoints.bodyHeight,
      (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight * 2)) / scrollPoints.bodyHeight,
    ],
    [
      "0%",
      "0%",
      "100%",
    ],
  )
  const whiteDivTopPosition = useTransform(
    scrollYProgress,
    [
      0,
      scrollPoints.wormholeSectionEnd                                   / scrollPoints.bodyHeight,
      (scrollPoints.wormholeSectionEnd + (scrollPoints.viewHeight / 5)) / scrollPoints.bodyHeight,
    ],
    [
      "0%",
      "48%",
      "0%",
    ],
  )

  return (
    <motion.section
      id="wormhole-hero"
      className="bg-black w-full h-1000vh relative top-0 z-10" //  bg-pink-500
      ref={sectionRef}
      style={{opacity: wormholeSectionOpacity}}
    >
      <motion.div
        className="bg-white max-w-full max-h-screen sticky z-20 mx-auto"
        style={{
          borderRadius: whiteDivBorderRadius,
          opacity: whiteDivOpacity,
          scale: whiteDivScale,
          transformOrigin: "center",
          width: whiteDivWidth,
          height: whiteDivHeight,
          top: whiteDivTopPosition,
        }}
      >
    </motion.div>
    <motion.div
      className="w-screen h-screen top-0 sticky"
      ref={divRef}
      style={{opacity: wormholeDivOpacity}}
    >
      <WormholeCurved/>
    </motion.div>
  </motion.section>
  )
}
