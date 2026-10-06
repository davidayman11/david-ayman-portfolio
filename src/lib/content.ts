/**
 * Portfolio content. Edit this file to update the site.
 * Facts follow David Ayman Mahrous's CV. Do not add roles,
 * projects, or metrics that are not listed there.
 */

export const profile = {
  name: "David Ayman Mahrous",
  shortName: "David Ayman",
  title: "Software Engineer",
  focus: "Mobile Developer",
  location: "Cairo, Egypt",
  email: "davidayman2004@gmail.com",
  phoneDisplay: "+20 120 077 9554",
  phoneHref: "tel:+201200779554",
  github: "https://github.com/davidayman11",
  githubHandle: "davidayman11",
  linkedin: "https://www.linkedin.com/in/david-ayman-206421319",
  linkedinHandle: "david-ayman",
  cvPath: "/david-ayman-mahrous-cv.pdf",
} as const;

export const seo = {
  title: "David Ayman Mahrous — Software Engineer",
  description:
    "David Ayman Mahrous is a software engineer in Cairo building Flutter mobile products for bookings, orders, inventory, attendance, and healthcare, with Clean Architecture and REST APIs.",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const heroFacts = [
  {
    label: "Now",
    value: "Pay Band Solutions",
    detail: "Part-time software developer",
  },
  {
    label: "Focus",
    value: "Flutter",
    detail: "Clean Architecture · REST · Firebase",
  },
  {
    label: "Based",
    value: "Cairo",
    detail: "Egypt",
  },
] as const;

export const about = {
  paragraphs: [
    "I am a software engineer in Cairo. I build mobile products in Flutter and Dart: Bloc and Cubit for state, REST APIs or Firebase for data, and Clean Architecture when the product has to keep growing.",
    "The work is operational. Booking, food orders, warehouse stock, scout attendance, and hospital workflows. I am a part-time software developer at Pay Band Solutions, and I am completing a computer science degree on the Mobile Development track at the Higher Technological Institute.",
    "A back-end diploma in PHP and Laravel sits under the mobile work: authentication, MySQL, MVC, and deployment. I used that foundation for a scout reservation site that generates a QR code and delivers it over WhatsApp.",
  ],
  notes: [
    { label: "Degree", value: "Computer Science, in progress" },
    { label: "Track", value: "Mobile Development" },
    { label: "Since", value: "2022" },
    { label: "Current team", value: "Pay Band Solutions" },
  ],
} as const;

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
  points: string[];
  technologies: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Part-time Software Developer",
    company: "Pay Band Solutions",
    period: "Mar 2026 — Present",
    current: true,
    summary:
      "Mobile development in Flutter, with the weight on scalable apps, API integration, and code that stays clean under real use.",
    points: [
      "Build Flutter applications with a focus on structure that can scale.",
      "Integrate APIs into the product and keep features straightforward to use.",
      "Improve app performance while maintaining efficient, readable code.",
    ],
    technologies: ["Flutter", "Dart", "REST APIs"],
  },
  {
    role: "Sourcing Intern",
    company: "Majid Al Futtaim",
    period: "Jul 2024 — Sep 2024",
    location: "Cairo, Egypt",
    summary:
      "A procurement internship: supplier research, sourcing records, and the documents a buying team uses to request quotes and proposals.",
    points: [
      "Researched, evaluated, and compared suppliers to support procurement decisions.",
      "Updated supplier databases so sourcing information stayed reliable.",
      "Helped prepare and issue requests for quotation and requests for proposal.",
      "Handled documentation and joined process-improvement work with the procurement team.",
    ],
    technologies: [],
  },
];

export type Project = {
  name: string;
  period: string;
  kind: string;
  role: string;
  summary: string;
  problem: string;
  contribution: string;
  functionality: string[];
  stack: string[];
  featured: boolean;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Nezoola",
    period: "Mar 2026 — Present",
    kind: "Mobile product",
    role: "Developer",
    summary:
      "A Flutter app for booking activities and events. Clean Architecture keeps the structure scalable, and the interface follows Figma.",
    problem:
      "The product needs a mobile path for browsing activities and events and completing a booking.",
    contribution:
      "Built the app on Clean Architecture, integrated RESTful APIs for data and booking operations, and implemented the UI from Figma designs.",
    functionality: [
      "Activity and event booking",
      "API-backed data handling",
      "Interface built from Figma",
    ],
    stack: ["Flutter", "Dart", "Clean Architecture", "REST APIs", "Figma"],
    featured: true,
  },
  {
    name: "Luci'z",
    period: "May 2026 — Present",
    kind: "Mobile product",
    role: "Developer",
    summary:
      "A Flutter app for a burger store. Customers browse the menu, open a product, customize the order, and place it.",
    problem:
      "The store needs a clear mobile flow from the menu to a customized, placed order.",
    contribution:
      "Developed the Flutter app, connected APIs for dynamic data, and implemented the Figma UI with attention to performance and ease of use.",
    functionality: [
      "Menu browsing and product details",
      "Order customization",
      "Order placement",
      "API-driven content",
      "UI implemented from Figma",
    ],
    stack: ["Flutter", "Dart", "REST APIs", "Figma"],
    featured: true,
    links: [
      {
        label: "View code",
        href: "https://github.com/davidayman11/luciz",
      },
    ],
  },
  {
    name: "Hospital Management System",
    period: "Sep 2025 — Present",
    kind: "Graduation project",
    role: "Developer",
    summary:
      "A hospital management app in Flutter. Clean Architecture holds the structure; REST APIs carry patient data, appointments, and operations.",
    problem:
      "Healthcare staff need one mobile system for patient records, appointments, and day-to-day operations.",
    contribution:
      "Implemented Clean Architecture for a scalable codebase, integrated the REST APIs, and built a straightforward interface for clinical workflows.",
    functionality: [
      "Patient data management",
      "Appointments",
      "Operational flows through REST APIs",
    ],
    stack: ["Flutter", "Dart", "Clean Architecture", "REST APIs"],
    featured: true,
  },
  {
    name: "Brand Match",
    period: "Dec 2024 — May 2025",
    kind: "Warehouse and sales",
    role: "Developer",
    summary:
      "A Flutter app for suppliers and sales teams. A live dashboard covers inventory, orders, and sales reports, with access split by role.",
    problem:
      "Warehouse and sales teams need a shared, current view of stock, orders, and sales, without sharing the same permissions.",
    contribution:
      "Created the app with Bloc, integrated Firebase for authentication, cloud data storage, and real-time sync, and designed a responsive interface around those workflows.",
    functionality: [
      "Real-time inventory dashboard",
      "Order tracking",
      "Sales reports",
      "Role-based access",
      "Firebase authentication and live synchronization",
    ],
    stack: ["Flutter", "Dart", "Bloc", "Firebase"],
    featured: true,
  },
  {
    name: "Church Scout Group Management",
    period: "Apr 2025 — Mar 2026",
    kind: "Operations",
    role: "Developer",
    summary:
      "A Flutter app for a church scout group. It loads members from a REST API, records attendance by team, and shows each team on a dashboard.",
    problem:
      "The group needs member records, attendance across scout teams, and a view of how each team is doing.",
    contribution:
      "Built the app with Cubit, connected the member API, and focused the interface on live updates, team attendance, and a structure that can scale.",
    functionality: [
      "Member data from a REST API",
      "Attendance for different scout teams",
      "Dashboards with per-team analytics",
      "Real-time data updates",
    ],
    stack: ["Flutter", "Dart", "Cubit", "REST APIs"],
    featured: false,
  },
  {
    name: "Attendance Tracker",
    period: "Apr 2024 — May 2024",
    kind: "Church operations",
    role: "Developer",
    summary:
      "Attendance for a church organization. Members and admins sign in through Firebase, check in and out, and external records sync over a REST API.",
    problem:
      "The organization needs reliable event check-in, a history of attendance, and different access for members and admins.",
    contribution:
      "Developed the Flutter app with Bloc, integrated Firebase authentication and real-time storage, and connected a REST API for external records.",
    functionality: [
      "Check-in and check-out",
      "Attendance history",
      "Role-based access for members and admins",
      "Firebase authentication and real-time data",
      "REST sync for external records",
    ],
    stack: ["Flutter", "Dart", "Bloc", "Firebase", "REST APIs"],
    featured: false,
  },
  {
    name: "Scouts Event Reservation",
    period: "Aug 2024 — Sep 2024",
    kind: "Web application",
    role: "Developer",
    summary:
      "A responsive reservation site for scout events. Registration creates a unique QR code and sends it to the person on WhatsApp.",
    problem:
      "Event entry needs a registration that becomes a unique pass, delivered without a manual handoff.",
    contribution:
      "Built the PHP and MySQL backend, QR generation, and the WhatsApp messaging integration, with Bootstrap for the responsive interface.",
    functionality: [
      "Event registration",
      "Unique QR code per registered user",
      "Delivery through a WhatsApp messaging API",
      "Responsive layout",
    ],
    stack: ["PHP", "MySQL", "Bootstrap", "WhatsApp API"],
    featured: false,
  },
  {
    name: "Camp Spot",
    period: "Nov 2022 — Feb 2023",
    kind: "Mobile",
    role: "Developer",
    summary:
      "A Flutter catalog of camp areas for scouting and outdoor activities, with Firebase authentication and live data.",
    problem:
      "Scouts need camp spots grouped clearly, with enough detail on each place to choose one.",
    contribution:
      "Developed the app with Cubit and Firebase, and organized it as modules so the catalog could stay maintainable and responsive.",
    functionality: [
      "Categorized camp listings",
      "Detailed spot information",
      "Firebase authentication",
      "Real-time storage and cloud data",
      "Responsive interface",
    ],
    stack: ["Flutter", "Dart", "Cubit", "Firebase"],
    featured: false,
  },
];

export const approach = [
  {
    index: "01",
    title: "Structure that can take another feature",
    body: "Hospital Management and Nezoola use Clean Architecture. Camp Spot is split into modules for the same reason: the next screen should not require rewriting the last one.",
  },
  {
    index: "02",
    title: "State with one owner",
    body: "Bloc runs Attendance Tracker and Brand Match. Cubit runs Camp Spot and the scout group app. Training also covered Provider and setState. The interface reads from that state.",
  },
  {
    index: "03",
    title: "The API is part of the product",
    body: "Bookings, patient records, appointments, members, and orders come through REST. Firebase covers authentication and live data where the product needs it. The scout reservation site pairs PHP and MySQL with a WhatsApp messaging API.",
  },
  {
    index: "04",
    title: "Interfaces for a specific job",
    body: "Role-based access for members, admins, suppliers, and sales. Dashboards for inventory, sales, and scout teams. Nezoola and Luci'z are implemented from Figma, with the same attention to responsive layout and performance as the rest of the mobile work.",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Dart",
      "PHP",
      "JavaScript",
      "Python",
      "Java",
      "C#",
      "C++",
      "C",
    ],
  },
  {
    label: "Mobile",
    items: ["Flutter", "Bloc", "Cubit", "Clean Architecture"],
  },
  {
    label: "Backend",
    items: ["Laravel", "PHP", "REST APIs", "MVC", "Eloquent", "Blade"],
  },
  {
    label: "Data",
    items: ["Firebase", "MySQL", "SQL Server", "MongoDB"],
  },
  {
    label: "Practice",
    items: ["OOP", "Data structures", "Agile", "SDLC", "Authentication"],
  },
  {
    label: "Tools",
    items: ["Git", "Figma", "Bootstrap", "macOS", "Windows", "Linux (Ubuntu)"],
  },
];

export const skillNote =
  "Firebase on shipped apps covers authentication, real-time data, and cloud data storage. Flutter training also included Provider, Firestore, and Cloud Functions. Figma here means implementing a design, which is how Nezoola and Luci'z were built.";

export const education = [
  {
    period: "Sep 2022 — Present",
    title: "Bachelor's degree, Computer Science",
    place: "Higher Technological Institute",
    location: "Cairo, Egypt",
    detail:
      "Faculty of Computer Science, Mobile Development track. Still in progress.",
  },
  {
    period: "Jun 2024 — Nov 2024",
    title: "Back-end diploma",
    place: "Route Academy",
    location: "Cairo, Egypt",
    detail:
      "PHP and Laravel: REST APIs, MySQL, authentication and authorization, MVC, Eloquent, Blade, routing, middleware, Artisan, Git, and deployment workflows.",
  },
  {
    period: "Sep 2022 — Feb 2023",
    title: "Flutter and Dart courses",
    place: "Udemy",
    location: "Cairo, Egypt",
    detail:
      "UI, state management with setState, Provider, and Bloc, REST integration, Firebase Authentication, Firestore, and Cloud Functions, and deployment for Android and iOS. Course projects covered responsive layout, performance, and app architecture.",
  },
  {
    period: "Sep 2007 — Jun 2022",
    title: "Mainstream high school",
    place: "English School in Cairo",
    location: "Cairo, Egypt",
    detail: "Completed secondary school in Cairo.",
  },
];
