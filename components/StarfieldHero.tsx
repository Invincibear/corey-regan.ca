"use client"

import Starfield from "@/components/Starfield"
import Typed     from "typed.js"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef }               from "react"

import "@/styles/shimmer.css"
import "@/styles/starfield.css"


export default function StarfieldHero() {
  const divRef        = useRef(null)
  const sectionRef    = useRef(null)
  const typedWordsRef = useRef(null)

  // Initialize Typed.js animated typing
  useEffect(() => {
    const typed = new Typed(typedWordsRef.current, {
      strings:       ['Site Reliability', 'DevOps', 'Full-Stack', 'Azure Cloud', 'AWS Cloud'],
      typeSpeed:     90,
      backSpeed:     65,
      backDelay:     2000 ,
      loop:          true,
      loopCount:     Infinity,
      showCursor:    true,
      cursorChar:    '|',
      autoInsertCss: true,
      contentType:   'html',
    })

    // Destroy Typed instance during component unmount to stop animation
    // This also prevents duplicate '|' cursor
    return () => {
      typed.destroy()
    }
  }, [])

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

  return (
    <motion.section
      className = "w-full h-screen bg-black overflow-hidden fixed top-0"
      ref       = {sectionRef}
      style     = {{
        opacity,
        scale,
        transformOrigin: "center",
      }}
    >
      <motion.div
        className = "w-full h-full bg-black"
        id        = "hero"
        ref       = {divRef}
        style     = {{
          position: "relative",
          opacity,
          scale,
          transformOrigin: "center",
        }}
      >
        <Starfield />
        <div className="w-full h-screen flex items-center justify-center overflow-x-hidden">
          <div
            id        = "hero-title"
            className = "flex flex-col gap-2 self-auto justify-self-end text-center sm:gap-4"
            style     = {{ transform: "translateZ(0)" }}
          >
            <motion.h1
              className   = "hero-heading-rich-text text-center font-bold tracking-tighter text-8xl pb-4"
              initial     = {{ opacity: 0, scale: 0 }}
              transition  = {{ duration: 3 }}
              viewport    = {{ once: true }}
              whileInView = {{ opacity: 1, scale: 1 }}
            >
              Corey
              <br/>
              Regan
            </motion.h1>
            <h2 className="hero-heading-rich-text w-richtext font-bold tracking-tight text-secondary text-2xl sm:text-5xl lg:text-6xl">
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
  )
}
