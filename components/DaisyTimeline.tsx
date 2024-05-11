import DaisyTimelineEvent from "@/components/DaisyTimelineEvent"
import { TimelineEvent }  from "@/lib/TimelineEvents"

import "@/styles/timeline.css"


interface TimelineComponentProps {
  timelineEvents: TimelineEvent[]
}
export default function DaisyTimeline({ timelineEvents }: TimelineComponentProps) {
  let position: string = "timeline-end"

  return (
    <section className="bg-accent-background">
      <h3 className="mb-20 text-5xl font-bold text-center">Work Experience</h3>
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
