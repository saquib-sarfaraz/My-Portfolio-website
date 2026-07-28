import fs from 'fs';
import path from 'path';

function getApiKey() {
  if (process.env.XAI_API_KEY) return process.env.XAI_API_KEY;
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;

  // Try reading directly from .env.local or .env in project root during Node dev
  try {
    const rootDir = process.cwd();
    const envPaths = [path.join(rootDir, '.env.local'), path.join(rootDir, '.env')];
    for (const p of envPaths) {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8');
        const match = content.match(/(?:XAI_API_KEY|GROQ_API_KEY)\s*=\s*([^\s#]+)/);
        if (match && match[1]) {
          const val = match[1].trim().replace(/^["']|["']$/g, '');
          if (val) return val;
        }
      }
    }
  } catch (e) {
    // Ignore fs errors in production serverless environments
  }
  return null;
}

// In-memory cache & rate limiting maps for serverless process instance
const responseCache = new Map();
const rateLimitMap = new Map();

// Helper to clean up cache entries older than 5 minutes
const CACHE_TTL_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 30; // 30 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip) || { count: 0, resetTime: now + 60000 };

  if (now > userRecord.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (userRecord.count >= RATE_LIMIT_MAX) {
    return true;
  }

  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);
  return false;
}

// ⚡ STATIC PROFILE DATA FOR INSTANT PRE-LLM RESPONSE
const PORTFOLIO_PROFILE = {
  name: "Saquib Sarfaraz",
  title: "Full Stack Developer",
  education: "B.Tech Computer Science Engineering student at Jamia Hamdard, New Delhi (2023 - 2027)",
  location: "New Delhi, India (Open to Remote & Relocation)",
  email: "saquibsarfaraz47@gmail.com",
  github: "https://github.com/saquib-sarfaraz",
  linkedin: "https://www.linkedin.com/in/saquib-sarfaraz-1691b9292/",
  instagram: "https://www.instagram.com/saquib.sarfaraz?igsh=MTB0ZWdlbWZnMTQ1dA==",
  website: "https://saquib-sarfaraz.vercel.app",
  resume: "/saquib-cv.pdf",
  currentInternship: "Full Stack Developer Intern at WonderKids Club (June 2026 – August 2026)",
  flagshipSaaS: "InCampus (https://incampus.online)",
  aiSaaS: "AI Spend Audit (https://ai-audit-lilac.vercel.app)"
};

// ⚡ INSTANT STATIC RESPONSE ROUTER (0 Token Cost, 100% Accurate)
function checkStaticQuery(query) {
  const q = (query || '').toLowerCase().trim();

  // 1. LinkedIn query
  if (q.includes('linkedin')) {
    return {
      message: `You can connect with Saquib on **LinkedIn**:\n\n💼 [LinkedIn Profile](${PORTFOLIO_PROFILE.linkedin})\n\nFeel free to send a connection request or message!`,
      sources: ['Contact', 'LinkedIn'],
      actions: [
        { type: 'external', url: PORTFOLIO_PROFILE.linkedin, label: 'Open LinkedIn Profile' },
        { type: 'external', url: `mailto:${PORTFOLIO_PROFILE.email}`, label: 'Send Direct Email' }
      ]
    };
  }

  // 2. GitHub query
  if (q.includes('github') || q.includes('repo') || q.includes('repositories')) {
    return {
      message: `Explore Saquib's open-source projects, repositories, and active code commits on **GitHub**:\n\n💻 [GitHub Profile](${PORTFOLIO_PROFILE.github})`,
      sources: ['Contact', 'GitHub'],
      actions: [
        { type: 'external', url: PORTFOLIO_PROFILE.github, label: 'Open GitHub Profile' },
        { type: 'scroll', target: 'projects', label: 'View Portfolio Projects' }
      ]
    };
  }

  // 3. Instagram query
  if (q.includes('instagram') || q.includes('insta')) {
    return {
      message: `Follow Saquib on **Instagram**:\n\n📷 [Instagram Profile](${PORTFOLIO_PROFILE.instagram})`,
      sources: ['Contact', 'Instagram'],
      actions: [
        { type: 'external', url: PORTFOLIO_PROFILE.instagram, label: 'Open Instagram Profile' }
      ]
    };
  }

  // 4. Contact / How to reach query
  if (q.includes('contact') || q.includes('reach') || q.includes('touch') || q.includes('email') || q.includes('mail') || q.includes('phone') || q.includes('social')) {
    return {
      message: `Here is how you can directly contact and connect with **Saquib Sarfaraz**:\n\n📧 **Email**: [${PORTFOLIO_PROFILE.email}](mailto:${PORTFOLIO_PROFILE.email})\n💼 **LinkedIn**: [linkedin.com/in/saquib-sarfaraz](https://www.linkedin.com/in/saquib-sarfaraz-1691b9292/)\n💻 **GitHub**: [github.com/saquib-sarfaraz](https://github.com/saquib-sarfaraz)\n📷 **Instagram**: [instagram.com/saquib.sarfaraz](https://www.instagram.com/saquib.sarfaraz?igsh=MTB0ZWdlbWZnMTQ1dA==)\n📍 **Location**: ${PORTFOLIO_PROFILE.location}`,
      sources: ['Contact', 'Socials'],
      actions: [
        { type: 'external', url: `mailto:${PORTFOLIO_PROFILE.email}`, label: 'Send Direct Email' },
        { type: 'external', url: PORTFOLIO_PROFILE.linkedin, label: 'Open LinkedIn' },
        { type: 'external', url: PORTFOLIO_PROFILE.github, label: 'Open GitHub' },
        { type: 'scroll', target: 'contact', label: 'Go to Contact Form' }
      ]
    };
  }

  // 5. Resume / CV query
  if (q.includes('resume') || q.includes('cv') || q.includes('download resume')) {
    return {
      message: `View and download Saquib's official resume PDF:\n\n📄 [Download Resume PDF](${PORTFOLIO_PROFILE.resume})\n\nIt details his education at Jamia Hamdard, WonderKids Club internship, full-stack technologies, and production SaaS projects.`,
      sources: ['Resume'],
      actions: [
        { type: 'resume', url: PORTFOLIO_PROFILE.resume, label: 'Download Resume PDF' },
        { type: 'scroll', target: 'experience', label: 'View Experience' }
      ]
    };
  }

  // 6. Projects location query
  if (q.includes('where can i see your projects') || q.includes('see your projects') || q.includes('show projects')) {
    return {
      message: `You can explore all of Saquib's live projects directly on this portfolio:\n\n🚀 **InCampus SaaS**: Live university social network at [incampus.online](https://incampus.online)\n💡 **AI Spend Audit**: Groq AI SaaS subscription optimizer live at [ai-audit-lilac.vercel.app](https://ai-audit-lilac.vercel.app)\n🎮 **XYXO Game**: Realtime multiplayer game in the Play Zone`,
      sources: ['Projects'],
      actions: [
        { type: 'scroll', target: 'projects', label: 'Explore Projects Section' },
        { type: 'external', url: 'https://incampus.online', label: 'Visit InCampus' },
        { type: 'external', url: 'https://ai-audit-lilac.vercel.app', label: 'Visit AI Spend Audit' }
      ]
    };
  }

  return null;
}

export default async function handler(req, res) {
  // CORS & Method Check
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Send POST request.' });
  }

  // 1. IP Rate Limiting Protection
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'global';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute before asking again.' });
  }

  const { messages = [], retrievedContext = null, query = '' } = req.body || {};

  // 2. Input Validation
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  const trimmedQuery = query.trim();

  // ⚡ 3. INSTANT STATIC PRE-LLM CHECK
  const staticResult = checkStaticQuery(trimmedQuery);
  if (staticResult) {
    console.log("Serving instant pre-LLM static profile answer for:", trimmedQuery);
    return res.status(200).json({
      fallback: false,
      staticMatch: true,
      sources: staticResult.sources,
      actions: staticResult.actions,
      message: staticResult.message
    });
  }

  const cacheKey = trimmedQuery.toLowerCase();

  // 4. Cache Check (Returns instant response for repeated questions within 5 minutes)
  const cached = responseCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    console.log("Serving cached AI response for:", cacheKey);
    return res.status(200).json({
      fallback: false,
      cached: true,
      sources: cached.sources,
      actions: cached.actions,
      message: cached.message
    });
  }

  const apiKey = getApiKey();
  console.log("API KEY STATUS:", apiKey ? `FOUND (${apiKey.substring(0, 7)}...)` : "MISSING");

  // 5. Structured Portfolio Context with 12,000 char size limit
  const contextCapped = JSON.stringify(retrievedContext || {}).slice(0, 12000);

  // ⚡ INJECTED PORTFOLIO OWNER PROFILE INTO SYSTEM PROMPT
  const systemPrompt = `You are Saquib AI, an intelligent conversational guide for Saquib Sarfaraz's portfolio (Saquib OS).
Your purpose is to answer questions about Saquib Sarfaraz. You speak naturally as Saquib in the first person ("I", "my flagship project", "my internship").

# PORTFOLIO OWNER PROFILE (STATIC FACTS - ALWAYS ALWAYS USE THIS DATA):
- Name: ${PORTFOLIO_PROFILE.name}
- Title: ${PORTFOLIO_PROFILE.title}
- Education: ${PORTFOLIO_PROFILE.education}
- Location: ${PORTFOLIO_PROFILE.location}
- Direct Email: ${PORTFOLIO_PROFILE.email}
- LinkedIn: ${PORTFOLIO_PROFILE.linkedin}
- GitHub: ${PORTFOLIO_PROFILE.github}
- Instagram: ${PORTFOLIO_PROFILE.instagram}
- Official Website: ${PORTFOLIO_PROFILE.website}
- Resume PDF Download: ${PORTFOLIO_PROFILE.resume}
- Active Internship: ${PORTFOLIO_PROFILE.currentInternship}
- Flagship SaaS Product: ${PORTFOLIO_PROFILE.flagshipSaaS}
- AI SaaS Product: ${PORTFOLIO_PROFILE.aiSaaS}

# RETRIEVED KNOWLEDGE CONTEXT:
${contextCapped}

# STRICT CONVERSATIONAL RULES:
1. If the user asks for LinkedIn, GitHub, Instagram, Email, Contact details, Resume, Website, or Projects, ALWAYS provide the exact URLs/links from the PORTFOLIO OWNER PROFILE above. NEVER say "I don't have that information".
2. Answer the user's question directly and immediately.
3. DO NOT repeatedly introduce yourself. DO NOT start responses with "Hi! I'm Saquib Sarfaraz" unless the user explicitly asks "Who are you?" or "Tell me about yourself".
4. DO NOT answer like a resume or CV. NEVER write formal headings like "Production Track Record:", "Industry Ready:", or "Why Hire Saquib:".
5. Write fluid, natural, human paragraphs like a real engineer having a conversation with a recruiter.
6. Avoid repeating information from previous messages in the conversation.
7. If asked general knowledge questions completely unrelated to Saquib Sarfaraz (e.g., "Who is Elon Musk?"), respond EXACTLY with:
"I'm designed to answer questions about Saquib Sarfaraz, including my projects, experience, skills, achievements, and portfolio. I can't answer general knowledge questions."`;

  if (!apiKey) {
    console.warn("WARNING: No process.env.XAI_API_KEY or process.env.GROQ_API_KEY found.");
    return res.status(200).json({
      fallback: true,
      sources: retrievedContext?.sources || ['About', 'Projects'],
      actions: retrievedContext?.actions || [],
      message: generateFallbackReply(trimmedQuery, retrievedContext)
    });
  }

  // 6. AbortController 20-Second Request Timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    // 7. Strict Message History Sanitization (sending only role & content)
    const cleanedHistory = messages
      .slice(-8)
      .filter((m) => m && m.role && m.content)
      .map(({ role, content }) => ({
        role: role === 'assistant' ? 'assistant' : 'user',
        content: String(content)
      }));

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...cleanedHistory,
      { role: 'user', content: trimmedQuery }
    ];

    // Detect Groq vs xAI API endpoint based on key prefix
    const isGroq = apiKey.startsWith('gsk_');
    const apiEndpoint = isGroq
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions';
    const apiModel = isGroq ? 'llama-3.3-70b-versatile' : 'grok-beta';

    console.log("Calling LLM API Endpoint:", apiEndpoint, "Model:", apiModel);

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: apiModel,
        messages: formattedMessages,
        temperature: 0.3,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log("LLM API HTTP Status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("LLM API Error Response Body:", response.status, errText);

      return res.status(response.status).json({
        fallback: true,
        error: process.env.NODE_ENV === 'development' ? errText : 'AI service temporarily unavailable.',
        sources: retrievedContext?.sources || ['Portfolio Data'],
        actions: retrievedContext?.actions || [],
        message: generateFallbackReply(trimmedQuery, retrievedContext)
      });
    }

    const data = await response.json();
    const replyText = data?.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response right now.';

    // Cache successful response for repeated queries
    responseCache.set(cacheKey, {
      message: replyText,
      sources: retrievedContext?.sources || ['Portfolio Data'],
      actions: retrievedContext?.actions || [],
      timestamp: Date.now()
    });

    return res.status(200).json({
      fallback: false,
      sources: retrievedContext?.sources || ['Portfolio Data'],
      actions: retrievedContext?.actions || [],
      message: replyText
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('LLM API Exception:', error);
    const isTimeout = error.name === 'AbortError';

    return res.status(isTimeout ? 504 : 500).json({
      fallback: true,
      error: isTimeout ? 'Request timed out after 20 seconds.' : 'AI service temporarily unavailable.',
      sources: retrievedContext?.sources || ['Portfolio Data'],
      actions: retrievedContext?.actions || [],
      message: generateFallbackReply(trimmedQuery, retrievedContext)
    });
  }
}

// Local smart generator when API is loading or offline
function generateFallbackReply(query, context) {
  const q = (query || '').toLowerCase().trim();

  // Instant static fallback check
  const staticMatch = checkStaticQuery(q);
  if (staticMatch) {
    return staticMatch.message;
  }

  // General knowledge refusal check
  const generalKnowledgeKeywords = ['elon musk', 'who is', 'capital of', 'weather', 'recipe', 'president', 'movie', 'song', 'crypto', 'bitcoin'];
  const isGeneralQuery = generalKnowledgeKeywords.some((kw) => q.includes(kw)) && !q.includes('saquib') && !q.includes('incampus') && !q.includes('wonderkids');

  if (isGeneralQuery) {
    return `I'm designed to answer questions about **Saquib Sarfaraz**, including my projects, experience, skills, achievements, and portfolio. I can't answer general knowledge questions.`;
  }

  if (q.includes('hardest part') || q.includes('challenging') || q.includes('difficulty') || q.includes('obstacle')) {
    return `The most challenging part of building **InCampus** was architecting the real-time messaging system. I had to manage Socket.io connection heartbeats, user presence indicators, authentication token auto-rotations, and message delivery while keeping latency under 100ms.\n\nIt pushed me to think deeply about multi-tenant MongoDB aggregation pipelines, weighted feed indexing, and system scalability rather than just making it work on localhost.`;
  }

  if (q.includes('best project') || q.includes('strongest project') || q.includes('incampus')) {
    return `If I had to pick one project that best represents my skills, it would be **InCampus** (Live at [incampus.online](https://incampus.online)).\n\nInCampus is a private campus social platform that I built to make it easier for university students to connect, communicate, and share updates within their college community. It includes secure OAuth identity verification, real-time 1-to-1 messaging with sub-100ms latency, media uploads, and isolated campus feeds.\n\nThrough this project, I gained deep hands-on experience with React 19, Node.js, Express, MongoDB Atlas aggregation pipelines, JWT authentication, Socket.io, Cloudinary CDN, and production deployment workflows.`;
  }

  if (q.includes('ai') || q.includes('spend') || q.includes('audit')) {
    return `I built **AI Spend Audit** (Live at [ai-audit-lilac.vercel.app](https://ai-audit-lilac.vercel.app)) to solve a real problem development teams face: tracking and optimizing overlapping AI tool subscriptions.\n\nThe platform integrates the Groq AI LLM engine to automatically analyze subscription data, identify seat redundancies, recommend cost-saving optimizations, and generate shareable audit reports.`;
  }

  if (q.includes('wonderkids') || q.includes('intern') || q.includes('experience') || q.includes('work')) {
    return `I'm currently working as a **Full Stack Developer Intern at WonderKids Club**, where I collaborate directly with the founder to build production educational web applications, interactive simulation engines, and full-stack platform features.\n\nPreviously, I was a Web Developer Intern at **Pizeonfly Pvt Ltd**, where I developed full-stack modules with React.js and Node.js/Express, integrated REST APIs, and managed end-to-end deployments on Vercel and Render.`;
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `I work primarily across modern full-stack web technologies:\n\n- **Frontend**: React.js, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5 & CSS3\n- **Backend & Systems**: Node.js, Express.js, Socket.io, PHP, Python\n- **Databases & Infrastructure**: MongoDB Atlas, Cloudinary CDN, Vercel, Render\n- **Tools**: Git, GitHub, Figma, VS Code`;
  }

  if (q.includes('hire') || q.includes('why')) {
    return `I enjoy building products that people can actually use. Rather than focusing only on academic projects, I've spent my time developing production-ready applications, experimenting with AI integrations, and working on real-world features during my internship at WonderKids Club.\n\nI learn quickly, take full ownership of my work, and pay close attention to user experience.`;
  }

  if (q.includes('who are you') || q.includes('tell me about saquib') || q.includes('about yourself')) {
    return `Hi! I'm **Saquib Sarfaraz**, a Full Stack Developer and Computer Science Engineering student at Jamia Hamdard in New Delhi.\n\nI enjoy building products that solve real problems rather than just academic projects. Over the past year, I've worked on everything from AI-powered SaaS applications to real-time platforms and interactive web experiences.\n\nOne of my flagship projects is **InCampus**, a private campus social platform with real-time chat, authentication, and community features. I also built **AI Spend Audit**, which helps users analyze and optimize AI tool subscriptions.\n\nI'm currently working as a **Full Stack Developer Intern at WonderKids Club**, where I'm contributing to production web applications and shipping features used by real users.`;
  }

  return `I specialize in product engineering, scalable SaaS web platforms (**InCampus**, **AI Spend Audit**), real-time socket engines, and interactive web tools. I'm currently a Full Stack Developer Intern at **WonderKids Club**.`;
}
