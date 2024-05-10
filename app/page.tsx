import CertificationCarousel  from "@/components/CertificationCarousel"
import LandingStarfield       from "@/components/LandingStarfield"
import DaisyTimeline          from "@/components/DaisyTimeline"
import TimelineEvents         from "@/lib/TimelineEvents"


export default function Home() {
  return (
    <>
      <LandingStarfield />
      <CertificationCarousel />
      <DaisyTimeline timelineEvents={TimelineEvents} />
    </>
  )
}
