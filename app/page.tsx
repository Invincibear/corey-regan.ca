"use client"

import ArrivalHero           from "@/components/ArrivalHero"
import CertificationCarousel from "@/components/CertificationCarousel"
import DaisyTimeline         from "@/components/DaisyTimeline"
import RecentBlogPosts       from "@/components/RecentBlogPosts"
import StarfieldHero         from "@/components/StarfieldHero"
import WormholeHero          from "@/components/WormholeHero"
import TimelineEvents        from "@/lib/TimelineEvents"


export default function Home() {
  return (
    <>
      <WormholeHero/>
      <StarfieldHero/>
      <ArrivalHero/>
      <CertificationCarousel/>
      <DaisyTimeline timelineEvents={TimelineEvents}/>
      <RecentBlogPosts/>
    </>
  )
}
