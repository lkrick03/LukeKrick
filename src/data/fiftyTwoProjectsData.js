export const initialFiftyTwoProjects = Array.from({ length: 10 }, (_, i) => {
  const weekNum = i + 1;
  const paddedWeek = String(weekNum).padStart(2, '0');
  
  return {
    id: `week-${paddedWeek}`,
    weekNumber: weekNum,
    paddedWeek,
    title: `Week ${paddedWeek} Project`,
    subtitle: 'Coming Soon',
    status: 'Coming Soon', // 'Completed' | 'In Progress' | 'Coming Soon'
    date: `Week ${paddedWeek} • 2026`,
    category: 'Engineering / Software',
    summary: 'Project details and documentation coming soon.',
    details: 'Details for this weekly project will be posted here. Stay tuned for CAD models, schematics, code repositories, and build updates!',
    highlights: [],
    tags: ['Upcoming'],
    githubUrl: '',
    demoUrl: '',
  };
});
