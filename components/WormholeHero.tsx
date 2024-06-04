"use client"

import WormholeCurved                      from "@/components/WormholeCurved"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef }     from "react"


//
// Wormhole brought to you in part by: 
// https://github.com/jesuisundev/acrossthemultiverse/
//
export default function WormholeHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const divRef = useRef<HTMLDivElement | null>(null)
  const isAutoScrolling = useRef(false)
  const hasAutoScrolled = useRef(false)

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

  const scrollToTarget = () => {
    if (hasAutoScrolled.current) return

    const targetPosition = (scrollPoints.wormholeSectionEnd + scrollPoints.viewHeight) ?? 0
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    const duration = 12 * 1000
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const increment = Math.min(progress / duration, 1)
      window.scrollTo(0, startPosition + distance * increment)

      if (progress < duration) {
        window.requestAnimationFrame(step)
      } else {
        console.debug('we reached the end of our autoscroll')
        isAutoScrolling.current = false // Reset flag once scrolling is complete
        hasAutoScrolled.current = true  // But note that we have scrolled
      }
    }

    window.requestAnimationFrame(step)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isAutoScrolling.current &&
        !hasAutoScrolled.current &&
        window.scrollY > scrollPoints.viewHeight &&
        window.scrollY <= scrollPoints.wormholeSectionEnd
      ) {
        // We should have scrolled past one view height but not past the entire wormhole <section>
        isAutoScrolling.current = true // Set flag to true to prevent further auto-scrolls

        const autoScroll = setTimeout(() => scrollToTarget(), 200)
        return () => clearTimeout(autoScroll)
      } else if (isAutoScrolling.current) {
        // Actively auto-scrolling
      } else if (hasAutoScrolled.current) {
        // Already auto-scrolled, not auto-scrolling again
      } else {
        // Something else is up, should probably log this to console
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollYProgress, scrollPoints])

  return (
    <motion.section
      id="wormhole-hero"
      className="bg-black w-full h-1000vh relative top-0 z-10 hidden xl:block" // hide on small screens
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
