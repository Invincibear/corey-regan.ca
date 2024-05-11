"use client"

import Starfield             from "@/components/Starfield"
import { motion }            from "framer-motion"
import { useRef, useEffect } from "react"
import Typed                 from "typed.js"

import "@/styles/starfield.css"
import "@/styles/shimmer.css"


export default function LandingStarfield() {
  const typedWordsRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedWordsRef.current, {
      strings:       ['Site Reliability', 'DevOps', 'Full-Stack', 'AWS Infra', 'Azure Infra'],
      typeSpeed:     90,
      backSpeed:     50,
      backDelay:     1350,
      loop:          true,
      loopCount:     Infinity,
      showCursor:    true,
      cursorChar:    '|',
      autoInsertCss: true,
      contentType:   'html',
    })

    return () => {
      // Destroy Typed instance during component unmount to stop animation
      // Also prevents duplicate cursor '|'
      typed.destroy();
    }
  }, []);

  return (
    <section id="splash" className="relative w-full h-screen bg-black">
      <Starfield />
      <div className="relative w-full h-screen flex items-center justify-center overflow-x-hidden">
        <div
          id        = "splash-title"
          className = "flex flex-col gap-2 self-auto justify-self-end text-center sm:gap-4"
          style     = {{ transform: "translateZ(0)" }}
        >
          <motion.h1
            initial     = {{ opacity: 0 }}
            whileInView = {{ opacity: 1 }}
            transition  = {{ duration: 5 }}
            className   = "hero-heading-rich-text text-center font-bold tracking-tighter text-8xl pb-4"
          >
            Corey
            <br />
            Regan
          </motion.h1>
          <h2 className="hero-heading-rich-text w-richtext font-bold tracking-tight text-secondary text-5xl xl:text-6xl">
            <div className="flex justify-center items-baseline">
              <div className="w-120 text-right">
                <strong ref={typedWordsRef} className="typed-words font-bold"></strong>
              </div>
              <div className="w-120 text-left">
                <span className="font-bold shimmer">Engineer</span>
              </div>
            </div>
          </h2>
        </div>
      </div>
    </section>
  )
}
