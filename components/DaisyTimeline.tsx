import DaisyTimelineEvent from "@/components/DaisyTimelineEvent"
import { TimelineEvent }  from "@/lib/TimelineEvents"
import { motion }         from "framer-motion"

import "@/styles/timeline.css"


interface TimelineComponentProps {
  timelineEvents: TimelineEvent[]
}
export default function DaisyTimeline({ timelineEvents }: TimelineComponentProps) {
  let position: string = "timeline-end"

  return (
    <section className="bg-accent-background pt-40">
      <motion.h3
        className   = "mb-20 text-5xl font-bold text-center text-accent-foreground"
        initial     = {{ opacity: 0, scale: 0 }}
        transition  = {{ duration: 3 }}
        viewport    = {{ once: true }}
        whileInView = {{ opacity: 1, scale: 1 }}
      >
        Work Experience
      </motion.h3>
      <div id="timeline" className="pb-40 flex justify-center items-center overflow-x-hidden">
          <ul className="max-w-8xl timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {timelineEvents.map(timelineEvent => {
              position = (position === "timeline-end")
                ? "timeline-start md:text-end"
                : "timeline-end"

              return <DaisyTimelineEvent key={timelineEvent.id} timelineEvent={timelineEvent} position={position} />
            })}
          </ul>
      </div>
    </section>
  )
}
