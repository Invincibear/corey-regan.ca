"use client"

import Starfield from "@/components/Starfield"
import Typed     from "typed.js"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState }     from "react"

import "@/styles/shimmer.css"
import "@/styles/starfield.css"


export default function StarfieldHero() {
  const starfieldDivRef     = useRef(null)
  const starfieldSectionRef = useRef(null)
  const typedWordsRef       = useRef(null)

  const [starfieldVisible, setStarfieldVisible] = useState(true)

  // Initialize Typed.js animated typing
  useEffect(() => {
    const typed = new Typed(typedWordsRef.current, {
      strings: ['Site Reliability', 'DevOps', 'Full-Stack', 'Azure Cloud', 'AWS Cloud'],

      autoInsertCss: true,
      backDelay:     2000 ,
      backSpeed:     65,
      contentType:   'html',
      cursorChar:    '|',
      loop:          true,
      loopCount:     Infinity,
      showCursor:    true,
      typeSpeed:     90,

      onBegin(self: Typed) {
        if (!starfieldVisible) self.stop()
      }
    })

    if (starfieldVisible) typed.start()

    // Destroy Typed instance during component unmount to stop animation
    // This also prevents duplicate '|' cursor
    return () => {
      typed.destroy()
    }
  }, [starfieldVisible])

  const { scrollYProgress } = useScroll({})
  const opacity = useTransform(
    scrollYProgress,
    [0, .069],
    [1, 0] // Reduce opacity the further down user scrolls
  )
  const scale = useTransform(
    scrollYProgress,
    [0, .069],
    [1, 2] // Increase scale the further down user scrolls
  )

  const starfieldFixedPositionerOpacity = useTransform(
    scrollYProgress,
    [0, 0.069],
    [1, 0],
  )

  return (
    <>
      <motion.section
        id        = "starfieldHero"
        className = {`w-full h-screen bg-black overflow-hidden fixed top-0 ${!starfieldVisible ? "pointer-events-none" : ""}`}
        ref       = {starfieldSectionRef}
        style     = {{
          opacity:         opacity,
          scale:           scale,
          transformOrigin: "center",
        }}
      >
        <motion.div
          className = "w-full h-full bg-black"
          ref       = {starfieldDivRef}
          style     = {{
            position:        "relative",
            opacity:         opacity,
            scale:           scale,
            transformOrigin: "center",
          }}
        >
          <Starfield/>
          <div className="w-full h-screen flex items-center justify-center overflow-x-hidden">
            <div
              id="starfieldHeroTitle"
              className="flex flex-col gap-2 self-auto justify-self-end text-center sm:gap-4"
              style={{transform: "translateZ(0)"}}
            >
              <motion.h1
                className   = "hero-heading-rich-text text-center font-bold tracking-tighter text-8xl pb-4"
                initial     = {{ opacity:  0, scale: 0 }}
                whileInView = {{ opacity:  1, scale: 1 }}
                transition  = {{ duration: 3 }}
                viewport    = {{ once:     true }}
              >
                Corey
                <br/>
                Regan
              </motion.h1>
              <h2
                className="hero-heading-rich-text w-richtext font-bold tracking-tight text-secondary text-2xl sm:text-5xl lg:text-6xl">
                <div className="flex justify-center items-baseline">
                  <div className="w-120 text-right pr-3">
                    <strong ref={typedWordsRef} className="typed-words font-bold"></strong>
                  </div>
                  <div className="w-120 text-left pl-3">
                    <span className="font-bold shimmer">Engineer</span>
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.section>
      <motion.div
        id        = "starfieldFixedPositioner"
        className = {`w-screen h-screen top-0 sticky block xl:hidden ${!starfieldVisible ? "pointer-events-none" : ""}`}
        style     = {{
          opacity: starfieldFixedPositionerOpacity, // Needed to not block content after the starfield <section>
        }}
      />
      <motion.div
        id              = "starfieldHeroVisibilityTarget"
        className       = "bg-black w-full h-0.5"
        onViewportEnter = {() => setStarfieldVisible(true)}
        onViewportLeave = {() => setStarfieldVisible(false)}
      />
    </>
  )
}
