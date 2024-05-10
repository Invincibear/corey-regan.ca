import CertificationCarousel from "@/components/CertificationCarousel"
import DaisyTimeline         from "@/components/DaisyTimeline"
import LandingStarfield      from "@/components/LandingStarfield"
import TimelineEvents        from "@/lib/TimelineEvents"


export default function Home() {
  return (
    <>
      <LandingStarfield />
      <CertificationCarousel />
      <DaisyTimeline timelineEvents={TimelineEvents} />
    </>
  )
}
