"use client"

import Icon              from "@/components/Icon"
import { TimelineEvent } from "@/lib/TimelineEvents"
import Image             from "next/image"
import Link              from "next/link"
import { motion, AnimatePresence } from "framer-motion"


interface DaisyTimelineEventProps {
  timelineEvent: TimelineEvent
  position:      string
}
export default function DaisyTimelineEvent({ timelineEvent, position = "timeline-start md:text-end" }: DaisyTimelineEventProps) {
  const variants = {
    hiddenFromLeft:  { opacity: 0, x: "-100%", y: 0 },
    hiddenFromRight: { opacity: 0, x: " 100%", y: 0 },
    enter:           { opacity: 1, x: 0,       y: 0 },
    exitToLeft:      { opacity: 0, x: "-100%", y: 0 },
    exitToRight:     { opacity: 0, x: " 100%", y: 0 },
  }

  const initial = (position === "timeline-end") ? "hiddenFromRight" : "hiddenFromLeft"
  const whileInView = (position === "timeline-end") ? "timeline-start md:text-end" : "timeline-end"

  return (
    <motion.li
      key         = {timelineEvent.id}
      initial     = {initial}
      whileInView = "enter"
      variants    = {variants}
      viewport    = {{ once: true }}
      className   = "overflow-hidden"
      transition  = {{
        duration: 0.5,
        type:     "linear"
      }}
    >
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
                src={`/timeline/${timelineEvent.logo.src}`}
                alt={timelineEvent.logo.alt ?? ""}
                width={timelineEvent.logo.width}
                height={timelineEvent.logo.height}
                loading="lazy"
              />
            </Link>
          </div>
        )}

        <div className="text-justify">{timelineEvent.description}</div>

        {timelineEvent.image && (
          <div className={`flex justify-${position === 'timeline-end' ? 'start' : 'end'} mt-4`}>
            <Link href={`/timeline/${timelineEvent.image.src}`}>
              <Image
                src={`/timeline/${timelineEvent.image.src}`}
                alt={timelineEvent.image.alt ?? ""}
                width={timelineEvent.image.width}
                height={timelineEvent.image.height}
                loading="lazy"
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
    </motion.li>
  )
}