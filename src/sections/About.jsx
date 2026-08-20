import profilePic from '../assets/profile-pic.jpeg'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const revealRef = useReveal()

  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div
          ref={revealRef}
          className="about-glass rounded-[40px] p-8 md:p-12 relative overflow-hidden reveal"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-holoCyan/20 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center relative z-10">
            <div className="relative flex justify-center">
              <div className="w-64 h-64 rounded-full p-1 bg-gradient-to-br from-holoCyan/50 to-transparent relative">
                <div className="absolute inset-0 rounded-full border border-holoCyan/30 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]"></div>

                <img
                  src={profilePic}
                  alt="Saquib Sarfaraz - Full Stack Developer"
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border-4 border-[#1a1c25]"
                />

                <div className="absolute -inset-4 bg-holoCyan/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-4xl font-bold mb-6 text-white">
                About Me
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-1 space-y-4">
                I’m Saquib Sarfaraz, a passionate learner and creative
                problem-solver with a focus on Web Development, UI/UX Design,
                and Graphic Designing. Currently pursuing BTech in Computer
                Science Engineering, I enjoy blending technical skills with
                design thinking to craft digital experiences that are not only
                functional but also visually appealing.
                <br /> <br /> My development journey began with HTML, CSS, and
                JavaScript, where I learned to build responsive and interactive
                websites. Alongside coding, I discovered my creative side in
                graphic designing with Canva and gradually expanded into UI/UX
                design with Figma, where I create wireframes, prototypes, and
                user-friendly interfaces.
                <br />
                <br /> I believe in the power of design and technology working
                together. Whether it’s a clean website layout, a thoughtful user
                experience, or engaging graphics, my goal is to create solutions
                that leave an impact. I’m constantly learning, experimenting,
                and exploring new ways to grow as a developer and designer.
              </p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'UI/UX Design',
                    'Frontend Development',
                    'Creative Coding',
                    '3D Modeling',
                    'Git & GitHub',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-holoCyan/30 bg-holoCyan/5 text-holoCyan text-sm shadow-[0_0_10px_rgba(56,189,248,0.1)] hover:shadow-neon transition-shadow cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Latest Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'HTML5',
                    'CSS3',
                    'JavaScript (ES6+)',
                    'Tailwind CSS',
                    'React',
                    'Node.js',
                    'Express',
                    'MongoDB',
                    'Figma',
                    'Git/GitHub',
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full border border-holoCyan/30 bg-holoCyan/5 text-holoCyan text-sm shadow-[0_0_10px_rgba(56,189,248,0.1)] hover:shadow-neon transition-shadow cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  My Journey
                </h3>
                <div className="flex justify-between items-center relative">
                  <div className="absolute top-1.5 left-0 w-full h-0.5 bg-white/10 z-0"></div>

                  <div className="relative z-10 text-center group">
                    <div className="w-3 h-3 bg-void border-2 border-gray-500 rounded-full mx-auto mb-2 group-hover:border-holoCyan group-hover:bg-holoCyan transition-colors"></div>
                    <div className="text-xs text-gray-400">2023</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">
                      Started Coding
                    </div>
                  </div>
                  <div className="relative z-10 text-center group">
                    <div className="w-3 h-3 bg-void border-2 border-gray-500 rounded-full mx-auto mb-2 group-hover:border-holoCyan group-hover:bg-holoCyan transition-colors"></div>
                    <div className="text-xs text-gray-400">2024</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">
                      Web Intern
                    </div>
                  </div>
                  <div className="relative z-10 text-center group">
                    <div className="w-3 h-3 bg-void border-2 border-gray-500 rounded-full mx-auto mb-2 group-hover:border-holoCyan group-hover:bg-holoCyan transition-colors"></div>
                    <div className="text-xs text-gray-400">2025</div>
                    <div className="text-[10px] text-gray-500 uppercase mt-1">
                      Campus Mantri
                    </div>
                  </div>
                  <div className="relative z-10 text-center group">
                    <div className="w-3 h-3 bg-holoCyan border-2 border-holoCyan rounded-full mx-auto mb-2 shadow-neon"></div>
                    <div className="text-xs text-white font-bold">2026</div>
                    <div className="text-[10px] text-holoCyan uppercase mt-1">
                      Full Stack
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center relative px-8 py-3 rounded-full border border-holoCyan/50 text-white font-medium overflow-hidden group shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-holoCyan/20 to-electricBlue/20 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">Contact Me</span>
                </a>
                <a
                  href="#"
                  className="px-6 py-3 rounded-full border border-white/10 text-gray-400 text-sm hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
                >
                  Back to Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

