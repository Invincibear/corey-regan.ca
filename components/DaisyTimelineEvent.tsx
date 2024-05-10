import Icon              from "@/components/Icon"
import { TimelineEvent } from "@/lib/TimelineEvents"


interface DaisyTimelineEventProps {
  timelineEvent: TimelineEvent
  position:      string
}
export default function DaisyTimelineEvent({ timelineEvent, position = "start" }: DaisyTimelineEventProps) {
  return (
    <li>
      <div className="timeline-middle">
        {<Icon name={timelineEvent.icon} />}
      </div>
      <div className={`timeline-${position} md:text-end mb-10`}>
        <time className="font-mono italic">{timelineEvent.date}</time>
        <div className="text-lg font-black">{timelineEvent.headline}</div>
        {timelineEvent.description}
      </div>
      <hr/>
    </li>
  )
}
