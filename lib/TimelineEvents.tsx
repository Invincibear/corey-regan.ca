import { ReactNode } from "react"
import {
  CalendarCheck,
  CalendarDays,
  CloudDownload,
  Gamepad2,
  Laptop,
  Landmark,
  Newspaper,
  PencilLine,
  RadioTower,
  RefreshCcwDot,
  Rss,
  ServerCog,
  TrendingUp,
} from "lucide-react"


type timelineEventImage = {
  alt?:   string
  src:    string
  width:  number
  height: number
}
export type TimelineEvent = {
  date:         string
  id:           string
  headline:     string | ReactNode
  description:  string | ReactNode
  highlighted?: boolean
  icon:         ReactNode
  image?:       timelineEventImage
  logo?:        timelineEventImage
  link?:        string
  role:         string
  tags:         string[]
}
const TimelineEvents: TimelineEvent[] = [
  {
    date:        "2024",
    id:          "paddle-python-sdk",
    headline:    <a href="https://github.com/PaddleHQ/paddle-python-sdk/commit/03d756dedec66a45a8a189ddbec92911fb39e64d" title="_blank">paddle-python-sdk</a>,
    description: (
      <>
        <p>While working on <a href="https://syncmycalendars.app/" target="_blank">SyncMyCalendars.app</a>, I decided to implement Paddle, a payment processor that competes with PayPal and Stripe. I took it upon myself to translate the PHP SDK into Python, adopting Pythonic coding practices.</p><br />
        <p>After Paddle noticed it, they purchased the SDK from me to use as their <a href="https://github.com/PaddleHQ/paddle-python-sdk/commit/e97b1d80811be941ede038634790eef7dd83baf1" target="_blank">official SDK</a>.</p><br />
        <p>It was incredibly rewarding and validating knowing my code passed a financial company&apos;s coding standards, considering the financial industry&apos;s strict regulatory environment.</p>
      </>
                 ),
    icon:        <Landmark />,
    logo:        {
      alt:    "Paddle",
      src:    "Paddle.svg",
      width:  200,
      height: 69,
    },
    link:        "https://github.com/PaddleHQ/paddle-python-sdk",
    role:        "Backend Engineer",
    tags:        ["Python", "API", "GitHub Actions"],
  },
  {
    date:        "2022 - 2023",
    id:          "skytap",
    headline:    "SkyTap",
    description: "I was responsible for writing Terraform code to port on-prem infra and apps to a cloud-native architecture, deployed to Azure using Terraform Cloud.",
    icon:        <CloudDownload />,
    logo:        {
      alt:    "SkyTap provides IBM hardware in Azure",
      src:    "skytap.png",
      width:  227,
      height: 52,
    },
    role:        "Site Reliability Engineer",
    tags:        ["Azure", "Terraform", "Kubernetes", "Ansible", "GitHub Actions", "BASH"],
  },
  {
    date:        "2022-2024",
    id:          "syncmycalendars",
    headline:    "SyncMyCalendars.app",
    description: "I architected, programmed, and deployed a SaaS app to selectively synchronize calendar events between Google and O365 calendar accounts and apply filters and transformations to copied events.",
    icon:        <CalendarCheck />,
    image:       {
      alt:    "SyncMyCalendars.app",
      src:    "syncmycalendars.app.png",
      width:  3825,
      height: 2790,
    },
    link:        "https://syncmycalendars.app",
    role:        "Full-Stack Engineer",
    tags:        ["GCP", "Azure", "Python", "Flask", "API", "React", "Next.JS", "TailwindCSS", "TypeScript", "Nginx", "Docker", "GitHub Actions", "HTML", "CSS3", "JavaScript", "Bootstrap"],
  },
  {
    date:        "2021 - 2022",
    id:          "freelancer",
    headline:    "Freelancer.com",
    description: "I was a member of a three-person team managing the AWS infra serving ~4 billion non-cached requests per week to ~55 million users worldwide. I was responsible for maintaining uptime, remediating outages, maintaining systems upgrades, upgrading a dozen Kubernetes clusters, and deploying robust scalable infrastructure.",
    icon:        <PencilLine />,
    logo:        {
      alt:    "Freelancer.com",
      src:    "freelancer.svg",
      width:  300,
      height: 72,
    },
    role:        "Site Reliability Engineer",
    tags:        ["AWS", "Terraform", "Puppet", "PHP", "Python", "Prometheus", "Elasticsearch", "RabbitMQ", "Varnish", "Redis", "BASH"],
  },
  {
    date:        "2021",
    id:          "gmetimeline",
    headline:    "GMETimeline.com",
    description: "The 2021 GameStop $GME stock sensation took over and I decided to chronicle events as they unfolded for future journalists to reference. The website consists of JSON data parsed with PHP, served using vanilla JS with CSS3 styling and animations.",
    icon:        <TrendingUp />,
    image:       {
      alt:    "GameStop's short squeeze, documented",
      src:    "gmetimeline.com.png",
      width:  3825,
      height: 1928,
    },
    link:        "https://gmetimeline.com",
    role:        "Full-Stack Engineer",
    tags:        ["Front-End", "PHP", "CSS3", "JavaScript", "HTML"],
  },
  {
    date:        "2019",
    id:          "warmap",
    headline:    "WarMapCalendar.com",
    description: "Inspired by Sam Oven's War Map Calendar, I turned the basic Excel spreadsheet into a fully-fledged SaaS app.",
    icon:        <CalendarDays />,
    image:       {
      alt:    "The War Map Calendar organizes your life and keeps you goal-oriented",
      src:    "warmapcalendar.com.png",
      width:  3840,
      height: 1928,
    },
    link:        "https://warmapcalendar.com",
    role:        "Full-Stack Engineer",
    tags:        ["JavaScript", "CSS3", "HTML", "PHP", "Nginx", "Bootstrap", "API"],
  },
  {
    date:        "2018",
    id:          "redipump",
    headline:    "RediPump.com",
    description: "I designed a Wordpress website and managed its deployment and updates.",
    icon:        <RefreshCcwDot />,
    image:       {
      alt:    "RediPump",
      src:    "redipump.com.png",
      width:  3817,
      height: 1932,
    },
    link:        "https://redipump.com",
    role:        "Front-End Engineer",
    tags:        ["Wordpress", "O365"],
  },
  {
    date:        "2018 - 2021",
    id:          "dynamichosting",
    headline:    "Dynamic Hosting",
    description: "As the primary engineer of a national web hosting company providing dedicated servers, co-located servers, virtual machines, virtual private servers, and shared web hosting in 3 coast-to-coast datacenters, I also provided L3 helpdesk support as-needed, programming support, and training for our team of junior systems administrators and helpdesk technicians.",
    icon:        <Rss />,
    logo:       {
      alt:    "Dynamic Hosting",
      src:    "dynamichosting-logo.png",
      width:  456,
      height: 90,
    },
    role:        "Sr. Systems Engineer",
    tags:        ["CentOS", "Virtuozzo", "Ansible", "BASH", "Plesk", "Wordpress", "PHP", "Cisco"],
  },
/*  {
    date:        "2016",
    id:          "sundeckssurrey",
    headline:    "SunDecksSurrey.ca: Front-End Engineer",
    description: "",
    icon:        <Home />,
    link:        "https://sundeckssurrey.ca",
    role:        "Front-End",
    tags:        ["Wordpress", "Marketing"],
  },*/
  {
    date:        "2016 - 2021",
    id:          "geared",
    headline:    "Geared Digital Marketing",
    description: "As a founder of Geared, I helped driving school and deck construction companies acquire more customers using digital marketing. I implemented a pay-per-call strategy, connecting prospective buyers with companies for a flat rate per call. With a one in three closing rate, the ROI for companies using my leads was worth the cost.",
    icon:        <Newspaper />,
    image:       {
      alt:    "Geared Digital Marketing homepage",
      src:    "geared.ca.png",
      width:  3825,
      height: 1928,
    },
    link:        "https://geared.ca",
    role:        "Front-End Engineer",
    tags:        ["Wordpress", "Marketing"],
  },
  {
    date:        "2015 - 2017",
    id:          "ies",
    headline:    "International Equipment Solutions",
    description: (
      <>
        <p>Primary engineer of 4 international sites (~150 users), also provided L3 helpdesk support. Part of a team supporting ~1000 users amongst ~20 sites.</p>
        <br />
        <p>Engineered company-wide systems imaging solution, automated ~2000 hours of help desk labor, integrated IT & HR systems, modernized various processes & assets, trained peers, documented existing and new systems.</p>
      </>
                 ),
    icon:        <ServerCog />,
    logo:       {
      alt:    "IES",
      src:    "ies.png",
      width:  284,
      height: 132,
    },
    // link:        "https://",
    role:        "Systems Administrator",
    tags:        ["Windows Server", "PowerShell"],
  },
  {
    date:        "2013 - 2015",
    id:          "terrabyte",
    headline:    "Tera-byte.com",
    description: "Working in the NOC of a datacenter provided colocation, ISP, and web hosting services, I was responsible for maintaining every node of the network from our upstream connection to our POPs to our end-users.",
    icon:        <RadioTower />,
    logo:       {
      alt:    "Tera-Byte logo",
      src:    "tera-byte.gif",
      width:  159,
      height: 102,
    },
    role:        "Network Administrator",
    tags:        ["Cisco", "Ubiquity", "Plesk", "PHP", "BASH", "CentOS"],
  },
  {
    date:        "2008 - 2012",
    id:          "detox",
    headline:    "Detox Game Servers: Programmer & Systems Engineer",
    description: "As a founder of a game server rental company, I was responsible for designing the website, custom order form, automating game server creation, and created a game server control panel for customers to manage their game servers.",
    icon:        <Gamepad2 />,
    role:        "Systems Engineer",
    tags:        ["HTML", "JavaScript", "CSS", "Hardware", "Windows Server"],
  },
  {
    date:        "2007 - 2008",
    id:          "dell",
    headline:    "Dell Canada",
    description: "At Dell I created a French Windows Vista website simulator to help phone support agents direct customers through the new UI. This was used by support agents in France and Canada.",
    icon:        <Laptop />,
    logo:       {
      alt:    "Windows Vista desktop",
      src:    "dell.svg",
      width:  200,
      height: 69,
    },
    role:        "Programmer",
    tags:        ["Hardware", "HTML", "JavaScript", "CSS", "Windows"],
  },
]

export default TimelineEvents
