import aboutData from '../knowledge/about.json';
import projectsData from '../knowledge/projects.json';
import experienceData from '../knowledge/experience.json';
import skillsData from '../knowledge/skills.json';
import gamesData from '../knowledge/games.json';
import contactData from '../knowledge/contact.json';
import resumeData from '../knowledge/resume.json';

export function retrieveKnowledge(query = '', history = []) {
  const historyText = Array.isArray(history)
    ? history.slice(-3).map((m) => m.content || '').join(' ')
    : '';

  const q = `${query} ${historyText}`.toLowerCase().trim();
  const matchedSources = new Set();
  const retrievedSections = [];
  const suggestedActions = [];

  // Keyword check helper
  const matches = (...keywords) => {
    return keywords.some((kw) => q.includes(kw.toLowerCase()));
  };

  // 1. Projects matching
  if (matches('incampus', 'social', 'campus', 'flagship', 'network')) {
    const incampus = projectsData.find((p) => p.id === 'incampus');
    if (incampus) {
      retrievedSections.push({ title: 'Flagship Project: InCampus', data: incampus });
      matchedSources.add('Projects');
      suggestedActions.push(...(incampus.actions || []));
    }
  }

  if (matches('ai', 'audit', 'spend', 'groq', 'cost', 'subscription')) {
    const aiAudit = projectsData.find((p) => p.id === 'ai-spend-audit');
    if (aiAudit) {
      retrievedSections.push({ title: 'AI SaaS Project: AI Spend Audit', data: aiAudit });
      matchedSources.add('Projects');
      suggestedActions.push(...(aiAudit.actions || []));
    }
  }

  if (matches('xyxo', 'game', 'tic-tac-toe', 'multiplayer', 'socket')) {
    const xyxo = projectsData.find((p) => p.id === 'xyxo');
    if (xyxo) {
      retrievedSections.push({ title: 'Multiplayer System: XYXO', data: xyxo });
      matchedSources.add('Projects');
      matchedSources.add('Play Zone');
      suggestedActions.push(...(xyxo.actions || []));
    }
  }

  if (matches('project', 'build', 'built', 'work', 'code', 'repo', 'github', 'saas')) {
    if (!matchedSources.has('Projects')) {
      retrievedSections.push({ title: 'Portfolio Projects', data: projectsData });
      matchedSources.add('Projects');
    }
  }

  // 2. Experience & Internship matching
  if (matches('internship', 'wonderkids', 'pizeonfly', 'experience', 'work history', 'company', 'job', 'role', 'current')) {
    retrievedSections.push({ title: 'Work Experience & Current Internship', data: experienceData });
    matchedSources.add('Experience');
    suggestedActions.push({ type: 'scroll', target: 'experience', label: 'View Experience Section' });
  }

  // 3. Skills matching
  if (matches('skill', 'tech', 'stack', 'react', 'node', 'express', 'mongo', 'python', 'php', 'backend', 'frontend', 'database', 'css', 'tailwind')) {
    retrievedSections.push({ title: 'Technical Skills & Proficiency', data: skillsData });
    matchedSources.add('Skills');
    suggestedActions.push({ type: 'scroll', target: 'skills', label: 'View Skills Section' });
  }

  // 4. Contact & Resume matching
  if (matches('contact', 'hire', 'email', 'touch', 'reach', 'linkedin', 'github', 'message')) {
    retrievedSections.push({ title: 'Contact Information', data: contactData });
    matchedSources.add('Contact');
    suggestedActions.push(...(contactData.actions || []));
  }

  if (matches('resume', 'cv', 'background', 'download', 'education', 'jamia')) {
    retrievedSections.push({ title: 'Resume Overview', data: resumeData });
    matchedSources.add('Resume');
    suggestedActions.push(...(resumeData.actions || []));
  }

  // Fallback: If query didn't trigger specific filters, include core bio & project highlights
  if (retrievedSections.length === 0) {
    retrievedSections.push(
      { title: 'About Saquib Sarfaraz', data: aboutData },
      { title: 'Featured Projects', data: projectsData.slice(0, 2) },
      { title: 'Current Experience', data: experienceData.slice(0, 2) }
    );
    matchedSources.add('About');
    matchedSources.add('Projects');
    matchedSources.add('Experience');
    suggestedActions.push({ type: 'scroll', target: 'projects', label: 'Explore All Projects' });
  }

  // Deduplicate actions by label/type
  const uniqueActions = [];
  const actionKeys = new Set();
  for (const act of suggestedActions) {
    const key = `${act.type}:${act.id || act.target || act.url || act.gameId}`;
    if (!actionKeys.has(key)) {
      actionKeys.add(key);
      uniqueActions.push(act);
    }
  }

  return {
    query,
    sources: Array.from(matchedSources),
    retrievedSections,
    actions: uniqueActions
  };
}
