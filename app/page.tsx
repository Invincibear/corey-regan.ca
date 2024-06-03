"use client"

import CertificationCarousel from "@/components/CertificationCarousel"
import DaisyTimeline         from "@/components/DaisyTimeline"
import RecentBlogPosts       from "@/components/RecentBlogPosts"
import StarfieldHero         from "@/components/StarfieldHero"
import WormholeHero          from "@/components/WormholeHero"
import TimelineEvents        from "@/lib/TimelineEvents"

import {useRef} from "react"


export default function Home() {
  const scrollContainer = useRef(null)
  
  return (
    <>
      <div id="scrollcontainer" ref={scrollContainer}>
        <WormholeHero />
        <StarfieldHero />
      </div>
      <CertificationCarousel />
      <DaisyTimeline timelineEvents={TimelineEvents} />
      <RecentBlogPosts />
    </>
  )
}
