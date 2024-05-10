import dynamicIconImports from "lucide-react/dynamicIconImports"


export type TimelineEvent = {
  date:         string
  description:  string
  headline:     string
  highlighted?: boolean
  icon:         keyof typeof dynamicIconImports
  link?:        string
  tags:         string[]
}
const TimelineEvents: TimelineEvent[] = [
  {
    date:        "2024",
    description: "description about my newest event goes here",
    headline:    "newest event",
    icon:        "circle-check",
    tags:        ["tag1", "newest"],
  },
  {
    date:        "2024",
    description: "another description here",
    headline:    "oldest event",
    icon:        "circle-check",
    tags:        ["tag2", "oldest"],
  }
]

export default TimelineEvents
