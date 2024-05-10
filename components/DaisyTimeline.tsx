import DaisyTimelineEvent from "@/components/DaisyTimelineEvent";
import { TimelineEvent }  from "@/lib/TimelineEvents"

interface TimelineComponentProps {
  timelineEvents: TimelineEvent[]
}
export default function DaisyTimeline({ timelineEvents }: TimelineComponentProps) {
  let position: string = "end"

  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {timelineEvents.map(event => {
        position = (position === "start") ? "end" : "start"

        return <DaisyTimelineEvent timelineEvent={event} position={position} />
      })}
    </ul>
  )
}
