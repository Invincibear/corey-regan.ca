import Icon              from "@/components/Icon"
import { TimelineEvent } from "@/lib/TimelineEvents"
import Image             from "next/image"
import Link              from "next/link"


interface DaisyTimelineEventProps {
  timelineEvent: TimelineEvent
  position:      string
}
export default function DaisyTimelineEvent({ timelineEvent, position = "start" }: DaisyTimelineEventProps) {
  return (
    <li>
      <div className="timeline-middle px-4 mb-2">
        {<Icon name={timelineEvent.icon}/>}
      </div>
      <div className={`${position} mb-10 pt-1`}>
        <time className="font-mono italic">
          {timelineEvent.date}
        </time>
        <br/>

        <h4 className="text-xl font-black font-inter">
          {timelineEvent.headline}
        </h4>
        <h5 className="text-lg font-black font-inter">
          {timelineEvent.role}
        </h5>

        {timelineEvent.logo && (
          <div className={`flex justify-${position === 'timeline-end' ? 'start' : 'end'} my-2`}>
            <Link href={`/timeline/${timelineEvent.logo.src}`}>
              <Image
                src     = {`/timeline/${timelineEvent.logo.src}`}
                alt     = {timelineEvent.logo.alt ?? ""}
                width   = {timelineEvent.logo.width}
                height  = {timelineEvent.logo.height}
                loading = "lazy"
              />
            </Link>
          </div>
        )}

        <div className="text-justify">{timelineEvent.description}</div>

        {timelineEvent.image && (
          <div className={`flex justify-${position === 'timeline-end' ? 'start' : 'end'} mt-4`}>
            <Link href={`/timeline/${timelineEvent.image.src}`}>
              <Image
                src     = {`/timeline/${timelineEvent.image.src}`}
                alt     = {timelineEvent.image.alt ?? ""}
                width   = {timelineEvent.image.width}
                height  = {timelineEvent.image.height}
                loading = "lazy"
              />
            </Link>
          </div>
        )}

        <div className="mt-2 text-xs font-muted">
          {timelineEvent.tags
            // .toSorted()
            .map(tag => `#${tag}`)
            .toString()
            .replaceAll(',', ', ')
          }
        </div>

        {timelineEvent.link && (
          <div>
            <Link href={timelineEvent.link} target="_blank" className="text-xs">{timelineEvent.link}</Link>
          </div>
        )}
      </div>
      <hr/>
    </li>
  )
}
