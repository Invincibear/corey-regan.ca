import { ReactNode } from "react"
import {
  CalendarCheck,
  CalendarDays,
  CloudDownload,
  Gamepad2,
  Laptop,
  Landmark,
  Music,
  Newspaper,
  PencilLine,
  RadioTower,
  RefreshCcwDot,
  Rss,
  ServerCog,
  TrendingUp,
} from "lucide-react"


type timelineEventImage = {
  link?:  string
  src:    string
  width:  number
  height: number
  alt?:   string
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
  visible?:     boolean // default: true
}
const TimelineEvents: TimelineEvent[] = [
  {
    date:     "2025",
    id:       "alteranRevelator",
    icon:     <Music />,
    role:     "Lead DevOps Engineer",
    tags:     ["Azure", "Kubernetes", "Argo CD", "GitHub Actions", "Grafana", "Prometheus", "Alertmanager", "VPN", "Octopus Deploy", "Azure DevOps", "DNS", "Networking"],
    headline: "Alteran FTL Strategies Inc.",
    visible:  true,
    description: (
      <>
        <p>As the Lead DevOps Engineer, I was responsible for managing all infrastructure, supporting systems, and build pipelines.</p><br />

        <p>When I first approached this project, I assessed the current state of the infrastructure & systems, then provided the recommendation to;
          <ul className="list-disc pl-8">
            <li className="font-bold">Terraform all infra</li>
            <li>Use management and security groups to delegate permissions with the principles of least privilege</li>
            <li>Deploy fully-upgraded replacement Kubernetes clusters, enforcing IaC</li>
            <li>Containerize most VM workloads to run on Kubernetes</li>
            <li>Move app inter-communication over internal networks instead of public internet and utilize private DNS</li>
            <li>Configure Argo CD to automatically deploy our apps</li>
          </ul>
        </p><br />

        <p>I replaced multiple VPNs with a single unified VPN, which required many VM migrations to non-overlapping VNETs in private IP spaces to peer with the new VPN.</p><br />

        <p>I rewrote many outdated & failing GitHub Actions pipelines and upgraded & reconfigured Azure DevOps/TeamCity/Octopus Deploy.</p><br />

        <p>I Upgraded and revamped our monitoring & alerting strategy using Prometheus, Grafana, Alertmanager, and deployed a customer-facing status page.</p>
      </>
    ),
    logo: {
      src:    "alteran.png",
      width:  198,
      height: 42,
      alt:    "Alteran",
    },
  },
  {
    date:     "2024",
    id:       "paddle-python-sdk",
    icon:     <Landmark />,
    link:     "https://github.com/PaddleHQ/paddle-python-sdk",
    role:     "Backend Engineer",
    tags:     ["Python", "API", "GitHub Actions"],
    headline: <a href="https://github.com/PaddleHQ/paddle-python-sdk/commit/03d756dedec66a45a8a189ddbec92911fb39e64d" title="_blank">paddle-python-sdk</a>,
    description: (
      <>
        <p>While working on <a href="https://syncmycalendars.app/" target="_blank">SyncMyCalendars.app</a>, I decided to implement Paddle, a payment processor that competes with PayPal and Stripe. I took it upon myself to translate the PHP SDK into Python, adopting Pythonic coding best practices.</p><br />

        <p>After Paddle noticed it, they purchased the SDK from me to use as their <a href="https://github.com/PaddleHQ/paddle-python-sdk/commit/e97b1d80811be941ede038634790eef7dd83baf1" target="_blank">official SDK</a>.</p><br />

        <p>It was incredibly rewarding and validating knowing my code passed a financial company&apos;s coding standards, considering the financial industry&apos;s strict regulatory environment.</p>
      </>
    ),
    logo: {
      src:    "Paddle.svg",
      width:  200,
      height: 69,
      alt:    "Paddle",
    },
  },
  {
    date:        "2022 - 2023",
    id:          "skytap",
    headline:    "SkyTap",
    description: "I architected, programmed, and deployed Terraform code to port on-prem infra to a cloud-native architecture, deployed to Azure using Terraform Cloud.",
    icon:        <CloudDownload />,
    role:        "Site Reliability Engineer",
    tags:        ["Azure", "Terraform", "Kubernetes", "Ansible", "GitHub Actions", "Bash"],
    logo:        {
      src:    "skytap.png",
      width:  227,
      height: 52,
      alt:    "SkyTap provides IBM hardware in Azure",
    },
  },
  {
    date:        "2022 - present",
    id:          "syncmycalendars",
    headline:    "SyncMyCalendars.app",
    description: "I architected, programmed, and deployed a SaaS app to selectively synchronize calendar events between Google and O365 calendar accounts and optionally apply filters and transformations to copied events.",
    icon:        <CalendarCheck />,
    link:        "https://syncmycalendars.app",
    role:        "Full-Stack Engineer",
    tags:        ["GCP", "Azure", "Python", "Flask", "API", "React", "Next.JS", "TailwindCSS", "TypeScript", "Nginx", "Docker", "GitHub Actions", "HTML", "CSS3", "JavaScript", "Bootstrap"],
    image:       {
      link:   "https://syncmycalendars.app",
      src:    "syncmycalendars.app.png",
      width:  3825,
      height: 2790,
      alt:    "SyncMyCalendars.app",
    },
  },
  {
    date:        "2021 - 2022",
    id:          "freelancer",
    headline:    "Freelancer.com",
    description: (
      <>
        <p>I was a member of a three-person team managing the AWS infra serving ~4 billion non-cached requests per week to ~55 million users worldwide. I was responsible for maintaining uptime, remediating outages, maintaining systems upgrades, upgrading a dozen Kubernetes clusters, and deploying robust scalable infrastructure.</p><br />
      </>
    ),
    icon:        <PencilLine />,
    role:        "Site Reliability Engineer",
    tags:        ["AWS", "Terraform", "Puppet", "PHP", "Python", "Prometheus", "Elasticsearch", "RabbitMQ", "Varnish", "Redis", "Bash", "DNS"],
    logo:        {
      src:    "freelancer.svg",
      alt:    "Freelancer.com",
      width:  300,
      height: 72,
    },
  },
  {
    date:        "2021",
    id:          "gmetimeline",
    headline:    "GMETimeline.com",
    description: "The 2021 GameStop $GME stock sensation took over and I decided to chronicle events as they unfolded for future journalists to reference. The website consists of JSON data parsed with PHP, served using vanilla JS with CSS3 styling and animations.",
    icon:        <TrendingUp />,
    link:        "https://gmetimeline.com",
    role:        "Full-Stack Engineer",
    tags:        ["Front-End", "PHP", "CSS3", "JavaScript", "HTML"],
    image:       {
      link:   "https://gmetimeline.com",
      src:    "gmetimeline.com.png",
      width:  3825,
      height: 1928,
      alt:    "GameStop's short squeeze, documented",
    },
  },
  {
    date:        "2019",
    id:          "warmap",
    headline:    "WarMapCalendar.com",
    description: "Inspired by Sam Oven's War Map Calendar, I turned his basic Excel spreadsheet into a fully-fledged SaaS app. This app enables you to set long-term goals and break them down into daily actionable tasks.",
    icon:        <CalendarDays />,
    link:        "https://warmapcalendar.com",
    role:        "Full-Stack Engineer",
    tags:        ["JavaScript", "CSS3", "HTML", "PHP", "Nginx", "Bootstrap", "API"],
    image:       {
      link:   "https://warmapcalendar.com",
      src:    "warmapcalendar.com.png",
      width:  3840,
      height: 1928,
      alt:    "The War Map Calendar organizes your life and keeps you goal-oriented",
    },
  },
  {
    date:        "2018",
    id:          "redipump",
    headline:    "RediPump.com",
    description: "I designed a WordPress website and managed its deployment and updates.",
    icon:        <RefreshCcwDot />,
    link:        "https://redipump.com",
    role:        "WordPress Designer",
    tags:        ["WordPress", "O365"],
    image:       {
      link:   "https://redipump.com",
      src:    "redipump.com.png",
      width:  3817,
      height: 1932,
      alt:    "RediPump",
    },
  },
  {
    date:        "2018 - 2021",
    id:          "dynamichosting",
    headline:    "Dynamic Hosting",
    description: "As the primary engineer of a national web hosting company providing dedicated servers, co-located servers, virtual machines, virtual private servers, and shared web hosting in three coast-to-coast datacenters, I was responsible for the budget, architecture, deployment, and maintenance of all technical aspects of the company. I also provided L3 helpdesk support as-needed, programming support, and training for our team of junior systems administrators and helpdesk technicians.",
    icon:        <Rss />,
    role:        "Sr. Systems Engineer",
    tags:        ["CentOS", "Virtuozzo", "Ansible", "Bash", "Plesk", "WordPress", "PHP", "Cisco", "Networking", "Datacenter", "Hardware", "DNS"],
    logo:        {
      src:    "dynamichosting-logo.png",
      width:  456,
      height: 90,
      alt:    "Dynamic Hosting",
    },
  },
/*  {
    date:        "2016",
    id:          "sundeckssurrey",
    headline:    "SunDecksSurrey.ca: WordPress Designer",
    description: "I helped deck construction companies acquire more customers using digital marketing via Google and Craigslist ads. I implemented a pay-per-call strategy, connecting prospective buyers with intent to purchase to decking companies in their region, charging decking companies a flat per-lead rate. With a one in three closing rate, it was a no-brainer for decking companies.",
    icon:        <Home />,
    link:        "https://sundeckssurrey.ca",
    role:        "Front-End",
    tags:        ["WordPress", "Marketing"],
  },*/
  {
    date:        "2016 - 2021",
    id:          "geared",
    headline:    "Geared Digital Marketing",
    description: "As a founder of Geared, I helped driving school companies acquire more customers using digital marketing via Google ads, website modification, and custom marketing campaigns. My services increased their average ROI by ~$150/student.",
    icon:        <Newspaper />,
    link:        "https://geared.ca",
    role:        "WordPress Engineer",
    tags:        ["WordPress", "Marketing"],
    image:       {
      alt:    "Geared Digital Marketing homepage",
      src:    "geared.ca.png",
      width:  3825,
      height: 1928,
    },
  },
  {
    date:        "2015 - 2017",
    id:          "ies",
    headline:    "International Equipment Solutions",
    icon:        <ServerCog />,
    role:        "Systems Administrator",
    tags:        ["Windows Server", "PowerShell", "Datacenter", "Networking", "Hardware", "DNS"],
    description: (
      <>
        <p>Primary engineer of 4 international sites (~150 users), also provided L3 helpdesk support. Part of a team supporting ~1000 users amongst ~20 sites.</p><br />

        <p>Engineered company-wide systems imaging solution, automated ~2000 hours of help desk labor, integrated IT & HR systems, modernized various processes & assets, trained peers, documented existing and new systems.</p>
      </>
    ),
    logo: {
      alt:    "IES",
      src:    "ies.png",
      width:  284,
      height: 132,
    },
  },
  {
    date:        "2013 - 2015",
    id:          "terrabyte",
    headline:    "Tera-byte.com",
    description: "Working in the NOC of a datacenter provided colocation, ISP, and web hosting services, I was responsible for maintaining every node of the network from our upstream connection to our POPs to our end-users.",
    icon:        <RadioTower />,
    role:        "Network Administrator",
    tags:        ["Cisco", "Ubiquity", "Plesk", "PHP", "Bash", "CentOS", "Networking", "Hardware", "Datacenter", "DNS"],
    logo:        {
      alt:    "Tera-Byte logo",
      src:    "tera-byte.gif",
      width:  159,
      height: 102,
    },
  },
  {
    date:        "2008 - 2012",
    id:          "detox",
    headline:    "Detox Game Servers",
    description: "As a founder of a game server rental company, I was responsible for designing the website, custom order form, automating dedicated game server creation, and created a game server control panel for customers to manage their game servers.",
    icon:        <Gamepad2 />,
    role:        "Systems Engineer",
    tags:        ["HTML", "JavaScript", "CSS", "Hardware", "Windows Server", "SUSE Linux", "Game Servers", "Networking", "Datacenter", "DNS"],
  },
  {
    date:        "2007 - 2008",
    id:          "dell",
    headline:    "Dell Canada",
    description: "At Dell I created a French Windows Vista website simulator to help phone support agents direct customers through the new UI. This was used by support agents in France and Canada.",
    icon:        <Laptop />,
    role:        "Frontend Engineer",
    tags:        ["Hardware", "HTML", "JavaScript", "CSS", "Windows"],
    logo:        {
      alt:    "Windows Vista desktop",
      src:    "dell.svg",
      width:  200,
      height: 69,
    },
  },
]

export default TimelineEvents
