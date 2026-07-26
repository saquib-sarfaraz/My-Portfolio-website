export const wonderkidsInternship = {
  isCurrent: true,
  id: 'wonderkids-internship-2026',
  title: "WonderKids Club",
  subtitle: "Full Stack Developer Intern • June 2026 – August 2026 (Current)",
  company: "WonderKids Club",
  role: "Full Stack Developer Intern",
  statusBadge: "CURRENT",
  period: "June 2026 – August 2026",
  location: "Remote",
  type: "Industry Internship",
  highlightBadge: "CURRENT",
  isPinned: true,
  ongoingSummary: "Developing production-ready educational web applications, interactive learning games, and full-stack features while collaborating directly with the founder.",
  impactBullets: [
    "Developed production-ready educational web applications and interactive learning games.",
    "Built responsive interfaces using HTML, CSS, and JavaScript.",
    "Worked with PHP and Python for backend functionality and platform features.",
    "Collaborated directly with the founder to implement production-ready educational experiences.",
    "Improved UI responsiveness, animations, and cross-device compatibility.",
    "Contributed to real-world product development for a live educational platform."
  ],
  techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "Python", "Git"]
};

export const resumeExperienceData = [
  wonderkidsInternship,
  {
    id: 'pizeonfly-internship-2024',
    year: '2024',
    title: 'Pizeonfly Pvt Ltd',
    role: 'Web Developer Intern',
    company: 'Pizeonfly Pvt Ltd',
    type: 'Industry Internship',
    highlightBadge: 'Verified Internship',
    period: "Sep 2024 – Oct 2024",
    location: 'New Delhi, India',
    isCurrent: false,
    impactBullets: [
      "Developed full-stack features using React.js frontend and Node.js/Express.js backend; improved performance and stability across production modules.",
      "Implemented auth flows, integrated REST APIs, and resolved cross-browser + backend issues in live environment.",
      "Supported end-to-end deployment on Vercel/Render and resolved production-level frontend and backend bottlenecks."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "REST APIs", "JWT Auth", "Google OAuth", "Vercel", "Render"]
  },
  {
    id: 'gfg-campus-mantri-2025',
    year: '2025',
    title: 'GeeksforGeeks',
    role: 'Campus Mantri',
    company: 'GeeksforGeeks',
    type: 'Community Leadership',
    highlightBadge: 'Campus Lead',
    period: '2025 – 2026',
    location: 'Jamia Hamdard University',
    isCurrent: false,
    impactBullets: [
      "Fostered a thriving technical culture at Jamia Hamdard by connecting 200+ students with coding competitions and workshops.",
      "Organized peer learning sessions, hackathon prep groups, and technical resource guides.",
      "Spearheaded student engagement programs bridging academic learning with industry developer practices."
    ],
    techStack: ["Community Leadership", "Event Strategy", "Public Speaking", "Mentorship"]
  },
  {
    id: 'nsdc-leadership-2024',
    year: '2024',
    title: 'NSDC',
    role: 'Co-Chairperson',
    company: 'NSDC Student Chapter',
    type: 'Leadership',
    highlightBadge: 'Executive Lead',
    period: '2024 – 2025',
    location: 'Jamia Hamdard',
    isCurrent: false,
    impactBullets: [
      "Co-headed skill development initiatives and technical workshops aligned with national tech frameworks.",
      "Managed student committees, speaker invitations, and technical symposiums.",
      "Fostered industry skill building across web development and software engineering disciplines."
    ],
    techStack: ["Skill Development", "Executive Leadership", "Event Coordination"]
  },
  {
    id: 'ignite-society-2023',
    year: '2023',
    title: 'Ignite Society',
    role: 'Joint Secretary',
    company: 'Ignite Society & GDSC',
    type: 'Leadership',
    highlightBadge: 'Society Lead',
    period: '2023 – 2024',
    location: 'Jamia Hamdard',
    isCurrent: false,
    impactBullets: [
      "Served as Joint Secretary of Ignite Society, overseeing strategic direction, hackathon planning, and event execution.",
      "Led initiatives bridging students with industry professionals through interactive guest talks and tech expos.",
      "Coordinated cross-functional student teams across design, logistics, and technical execution for annual tech fests."
    ],
    techStack: ["Team Management", "Event Planning", "UI/UX Coordination", "Strategic Planning"]
  }
];

export const marvelTimelineData = resumeExperienceData;
export const baseExperienceData = resumeExperienceData;

export const getExperienceTimeline = () => {
  return resumeExperienceData;
};
