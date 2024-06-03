"use client"

import WormholeCurved from "@/components/WormholeCurved"
import {MutableRefObject, useRef} from "react"

import { motion, useAnimation, useScroll, useSpring, useTransform } from "framer-motion"


// https://github.com/jesuisundev/acrossthemultiverse/
export default function WormholeHero(scrollContainer: MutableRefObject<any>) {
  // Reference HTML elements
  const sectionRef = useRef(null)
  const divRef = useRef(null)

  const {scrollYProgress} = useScroll({
    target:    sectionRef.current,
    container: scrollContainer,
    offset:    ["start start", "end end"],
  })
  const scaleZoom = useSpring(scrollYProgress, {bounce: 0}) // 0 bounce prevents unintentional backwards movement
  const controls = useAnimation()
  const wormholeSectionOpacity = useTransform(
    scrollYProgress,
     [0, 0.0420, 0.1, 1],
    [0, 0,      1,   1],
  )
  const wormholeDivOpacity = useTransform(
    scrollYProgress,
    // [0, 0.0420, 0.1, 0.18, 0.20],
    // [0, 0,      1,   1,    0],
     [0, 0.0420, 0.1, 0.48, 0.52],
    [0, 0,      1,   1,    0],
  )
  const whiteDivOpacity = useTransform(
    scrollYProgress,
     [0.48, 0.54, 1],
    [0,    1,    1],
  )
  const whiteDivScale = useTransform(
    scrollYProgress,
     [0.48, 0.52, 1],
    [0,    1,    1],
  )
  const whiteDivBorderRadius = useTransform(
    scrollYProgress,
     [0.48,  0.50,  0.52],
    ["50%", "50%", "0%"],
  )

  return (
    <>
      <motion.section
        id="wormhole-hero"
        className="bg-black w-full h-1000vh relative top-0 z-10" //  bg-pink-500
        ref={sectionRef}
        style={{opacity: wormholeSectionOpacity}}
      >
        <motion.div
          className="bg-white w-full h-screen sticky top-0 z-20"
          style={{
            borderRadius:    whiteDivBorderRadius,
            opacity:         whiteDivOpacity,
            scale:           whiteDivScale,
            transformOrigin: "center",
          }}
        />
        <motion.div
          animate={controls}
          className="w-screen h-screen top-0 sticky"
          ref={divRef}
          style={{opacity: wormholeDivOpacity}}
        >
          <WormholeCurved scrollProgress={scaleZoom}/>
        </motion.div>
      </motion.section>
    </>
  )
}
