import { retrieveKnowledge } from '../rag/retrieve';

export async function sendChatMessage({ messages, query }) {
  // 1. Local RAG Retrieval with multi-turn conversation history
  const retrievedContext = retrieveKnowledge(query, messages);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        query,
        retrievedContext
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.message || 'No response content returned.',
        sources: data.sources || retrievedContext.sources,
        actions: data.actions && data.actions.length > 0 ? data.actions : retrievedContext.actions,
        fallback: data.fallback || false
      };
    }
  } catch (err) {
    console.warn('Network call to /api/chat failed, utilizing client-side RAG fallback:', err);
  }

  // Client-side fallback if server endpoint is unreachable (e.g. running local Vite dev server without Vercel CLI)
  const fallbackMessage = generateLocalFallbackText(query, retrievedContext);
  return {
    text: fallbackMessage,
    sources: retrievedContext.sources,
    actions: retrievedContext.actions,
    fallback: true
  };
}

function generateLocalFallbackText(query, retrievedContext) {
  const q = (query || '').toLowerCase().trim();

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
    return `**InCampus** is my flagship **Full Stack SaaS Product** (Live at [incampus.online](https://incampus.online)).\n\nI built it as a university-exclusive social network featuring isolated campus feeds, real-time 1-to-1 messaging, identity verification workflows, and automated moderation.\n\nTo make it scalable and responsive, I engineered it with React 19, Node.js, Express, MongoDB Atlas aggregation pipelines, Socket.io, Cloudinary CDN, and JWT OAuth 2.0. It achieves sub-100ms chat latency while maintaining zero feed leaks across distinct college privacy boundaries.`;
  }

  if (q.includes('ai') || q.includes('spend') || q.includes('audit')) {
    return `**AI Spend Audit** is a live SaaS platform I built (Live at [ai-audit-lilac.vercel.app](https://ai-audit-lilac.vercel.app)).\n\nIt helps startups and engineering teams analyze their AI subscription costs, detect overlapping tools, optimize team seat allocations, and generate shareable cost-saving reports using the Groq AI LLM engine.`;
  }

  if (q.includes('wonderkids') || q.includes('intern') || q.includes('experience') || q.includes('work')) {
    return `I'm currently working as a **Full Stack Developer Intern at WonderKids Club** (June 2026 – August 2026), where I collaborate directly with the founder to build production educational web applications, game simulation engines, and full-stack platform features.\n\nPreviously, I was a Web Developer Intern at **Pizeonfly Pvt Ltd** where I developed full-stack modules using React.js and Node.js/Express, integrated REST APIs, and managed end-to-end deployments on Vercel and Render.`;
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `My core technical stack centers around modern full-stack JavaScript and web engineering:\n\n- **Frontend**: React.js, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5 & CSS3\n- **Backend & Systems**: Node.js, Express.js, Socket.io, PHP, Python\n- **Databases & Infrastructure**: MongoDB Atlas, Cloudinary CDN, Vercel, Render\n- **Tools**: Git, GitHub, Figma, VS Code`;
  }

  if (q.includes('hire') || q.includes('why') || q.includes('about') || q.includes('who')) {
    return `Hi! I'm **Saquib Sarfaraz**, a Full Stack Developer and Computer Science Engineering student at Jamia Hamdard in New Delhi.\n\nWhat makes me stand out is that I've spent my time building production-ready applications instead of only classroom projects. Over the past year, I've built live SaaS platforms like **InCampus** and **AI Spend Audit**, and I'm currently interning as a **Full Stack Developer Intern at WonderKids Club**.\n\nI enjoy solving practical problems, architecting real-time systems with Socket.io & MongoDB, and crafting polished web user experiences.`;
  }

  return `Hi! I'm **Saquib Sarfaraz**, a Full Stack Developer and Computer Science Engineering student at Jamia Hamdard.\n\nI specialize in product engineering, scalable SaaS web platforms (**InCampus**, **AI Spend Audit**), real-time socket engines, and interactive web tools. Currently, I'm a Full Stack Developer Intern at **WonderKids Club**.`;
}
