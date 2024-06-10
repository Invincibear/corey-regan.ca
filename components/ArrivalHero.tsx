"use client"

import {motion, useScroll, useTransform} from "framer-motion"
import { CircleChevronDown }           from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Typed                           from "typed.js"

import "@/styles/shimmer.css"
import "@/styles/arrival.css"


export default function ArrivalHero() {
  const typedWordsRef = useRef(null)
  const arrivalScrollDownRef = useRef(null)

  const [arrivalHeroVisible, setArrivalHeroVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: arrivalScrollDownRef,
  })

  // Initialize Typed.js animated typing
  useEffect(() => {
    const typed = new Typed(typedWordsRef.current, {
      strings: ['into the future'],

      autoInsertCss: true,
      contentType:   'html',
      cursorChar:    '...',
      loop:          false,
      loopCount:     Infinity,
      showCursor:    true,
      startDelay:    2000,
      typeSpeed:     90,

      onBegin(self: Typed) {
        if (!arrivalHeroVisible) self.stop()
      },
      onStringTyped(arrayPos: number, self: Typed) {
        self.cursor.classList.add('type-cursor-visible')
      },
    })

    if (arrivalHeroVisible) typed.start()

    // Destroy Typed instance during component unmount to stop animation
    // This also prevents duplicate '...' cursor
    return () => {
      typed.destroy()
    }
  }, [arrivalHeroVisible])

  return (
    <section id="arrivalHero" className="w-full h-screen bg-black">
      <div className="w-full h-screen flex items-center justify-center overflow-x-hidden">
        <div
          id="arrivalHeroTitle"
          className="flex flex-col gap-2 self-auto justify-self-end text-center sm:gap-4"
          style={{transform: "translateZ(0)"}}
        >
          <motion.h1
            className       = "w-full hero-heading-rich-text text-center font-bold text-secondary text-6xl pb-4"
            initial         = {{ opacity: 0, scale: 2 }}
            whileInView     = {{ opacity: 1, scale: 1 }}
            transition      = {{ duration: 3 }}
            viewport        = {{ once: true }}
            onViewportEnter = {() => setArrivalHeroVisible(true)}
            onViewportLeave = {() => setArrivalHeroVisible(false)}
          >
            <strong>Bringing your infrastructure</strong>
            <strong ref={typedWordsRef} className="typed-words font-bold"></strong>
          </motion.h1>
          <h2
            className="hero-heading-rich-text w-richtext font-bold tracking-tight text-secondary text-2xl sm:text-5xl lg:text-6xl"
          >
            <strong ref={typedWordsRef} className="typed-words font-bold"></strong>
          </h2>
        </div>
        <div className="scroll"></div>
      </div>
      <motion.div
        id          = "arrivalScrollDown"
        className   = "relative size-12 bottom-20 left-1/2 transform -translate-x-6"
        ref         = { arrivalScrollDownRef }
        style       = {{ opacity: scrollYProgress }}
      >
        <CircleChevronDown width={48} height={48} className="text-accent-foreground animate-bounce" />
      </motion.div>
    </section>
  )
}
