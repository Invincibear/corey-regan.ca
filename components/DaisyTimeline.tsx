import DaisyTimelineEvent from "@/components/DaisyTimelineEvent";
import { TimelineEvent }  from "@/lib/TimelineEvents"

import "@/styles/timeline.css"


interface TimelineComponentProps {
  timelineEvents: TimelineEvent[]
}
export default function DaisyTimeline({ timelineEvents }: TimelineComponentProps) {
  let position: string = "timeline-end"

  return (
    <div id="timeline" className="flex justify-center items-center">
      <ul className="pt-20 max-w-8xl timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {timelineEvents.map(event => {
          position = (position === "timeline-end") ? "timeline-start md:text-end" : "timeline-end"

          return <DaisyTimelineEvent key={event.id} timelineEvent={event} position={position} />
        })}
      </ul>
    </div>
  )
}
