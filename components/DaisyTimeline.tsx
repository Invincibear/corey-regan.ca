// noinspection CssUnresolvedCustomProperty

import DaisyTimelineEvent    from "@/components/DaisyTimelineEvent"
import { TimelineEvent }     from "@/lib/TimelineEvents"
import { motion }            from "framer-motion"
import { useEffect, useRef } from "react"

import "@/styles/timeline.css"


interface TimelineComponentProps {
  timelineEvents: TimelineEvent[]
}
export default function DaisyTimeline({ timelineEvents }: TimelineComponentProps) {
  let position: string = "timeline-end"

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!timelineRef.current) return

      const { clientX, clientY } = ev
      timelineRef.current.style.setProperty("--x", `${clientX}px`)
      timelineRef.current.style.setProperty("--y", `${clientY}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <>
      <section ref={timelineRef} id="timelineSection" className="bg-accent-background pt-40">
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
            {
              timelineEvents
                .filter(timelineEvent => process.env.NODE_ENV === "development" || timelineEvent.visible !== false)
                .map(timelineEvent => {
                  position = (position === "timeline-end")
                    ? "timeline-start md:text-end"
                    : "timeline-end"

                  return <DaisyTimelineEvent key={timelineEvent.id} timelineEvent={timelineEvent} position={position}/>
              })
            }
          </ul>
        </div>
      </section>

      <style jsx>{`
        #timelineSection {
          background-attachment: fixed;
          background-image: radial-gradient(
            circle farthest-side at var(--x, 100px) var(--y, 100px),
            #13131a 0%,
            transparent 75%
          );
        }
      `}</style>
    </>
  )
}
