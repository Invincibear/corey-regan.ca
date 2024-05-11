import CertificationCarousel from "@/components/CertificationCarousel"
import DaisyTimeline         from "@/components/DaisyTimeline"
import RecentBlogPosts       from "@/components/RecentBlogPosts";
import StarfieldHero         from "@/components/StarfieldHero"
import TimelineEvents        from "@/lib/TimelineEvents"


export default function Home() {
  return (
    <>
      <StarfieldHero />
      <CertificationCarousel />
      <DaisyTimeline timelineEvents={TimelineEvents} />
      <RecentBlogPosts />
    </>
  )
}
