/**
 * 52 Challenges - Weekly Engineering & Software Projects
 * 
 * To add a new project or update an existing one:
 * 1. Add your project object to the `customWeeklyProjects` array below.
 * 2. Save your photos in `public/52-projects/` (e.g. `public/52-projects/week-01.jpg`).
 * 3. Reference the photo as `image: '/52-projects/week-01.jpg'`
 *    or multiple photos as `images: ['/52-projects/week-01.jpg', '/52-projects/week-01-cad.png']`.
 */

export const customWeeklyProjects = [
  {
    weekNumber: 1,
    title: 'Milky Way Galaxy Simulation & Fermi Paradox Analysis',
    subtitle: 'Drake Equation & Radio Bubble Detection Horizon',
    status: 'Completed',
    date: 'Week 01 • 2026',
    category: 'Computational Modeling with Python',
    summary: 'Built a Milky Way look alike in Python and then evaluated the Drake Equation to model the probability of detecting advanced civilizations based on electromagnetic broadcast horizons.',
    details: 'Developed a 2D galactic disk simulation (50,000 light-year radius, 1,000 light-year disk thickness) in Tkinter, scaling coordinates relative to Earth’s ~225 LY radio bubble. Implemented Monte Carlo statistical trials in finding_civs.py to simulate civilizations scattered across equivalent galactic volume partitions, fitting 4th-degree polynomial probability curves to quantify detection likelihood under the Fermi Paradox.',
    highlights: [
      'Simulated galactic spiral disk geometry and stellar density using polar coordinate distribution',
      'Calculated Earth broadcast bubble horizons (~225 light-years) relative to galactic volume',
      'Ran Monte Carlo overlapping-volume trials with polynomial curve fitting using NumPy & Matplotlib',
      'Visualized Earth’s location and broadcast bubble relative to 15.6M potential civilizations',
    ],
    tags: ['Python', 'Tkinter', 'NumPy', 'Matplotlib', 'Astrophysics', 'Simulation'],
    image: '/52-projects/week-01.png',
    githubUrl: 'https://github.com/lkrick03/LK_52_Projects',
    demoUrl: '',
  },
];

// Generates all 52 weeks automatically, filling in custom projects where available
export const initialFiftyTwoProjects = Array.from({ length: 52 }, (_, i) => {
  const weekNum = i + 1;
  const paddedWeek = String(weekNum).padStart(2, '0');
  const custom = customWeeklyProjects.find((p) => p.weekNumber === weekNum);

  if (custom) {
    return {
      id: `week-${paddedWeek}`,
      paddedWeek,
      weekNumber: weekNum,
      subtitle: '',
      details: '',
      highlights: [],
      tags: [],
      image: '',
      images: [],
      githubUrl: '',
      demoUrl: '',
      ...custom,
      date: custom.date || `Week ${paddedWeek} • 2026`,
      status: custom.status || 'Completed',
    };
  }

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
    image: '',
    images: [],
    githubUrl: '',
    demoUrl: '',
  };
});
