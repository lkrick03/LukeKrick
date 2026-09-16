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
  {
    weekNumber: 2,
    title: 'Pump Impeller Report',
    subtitle: 'ANSYS CFX Turbomachinery Fluid Flow Simulation (Case: TFF)',
    status: 'Completed',
    date: 'Week 02 • 2026',
    category: 'Turbomachinery & CFD Analysis',
    summary: 'CFD simulation of a pump impeller in ANSYS CFX (Case: TFF). Analyzed fluid flow across rotating domain R1 in water at 1,450 RPM using SST turbulence modeling, evaluating total head, shaft power, blade loading, and stage performance.',
    details: 'Simulated 3D turbomachinery fluid flow through a pump impeller in ANSYS CFX (v26.1). The computational domain (Domain R1) contains 491,964 nodes and 460,352 elements with 4 rotational periodic interfaces and an automatic wall function SST turbulence model. Water was modeled as a continuous fluid rotating at 1,450 rev/min (151.8440 rad/s) around Coordinate Axis Coord 0.3. Boundary conditions included an axial inlet (0 atm relative total pressure, medium turbulence), mass flow rate outlet, and smooth no-slip walls with a counter-rotating hub outlet wall. The simulation resolved a volume flow rate of 2.7551 ft³/s, producing a stage head (IN-OUT) of 68.5248 ft (LE-TE head of 70.5865 ft), shaft power of 17.4800 BTU/s, 86.3876% total efficiency, and 70.0484% static efficiency.',
    specs: [
      { label: 'CFD Solver & Case', value: 'ANSYS CFX 26.1 (Case: TFF)' },
      { label: 'Working Fluid', value: 'Water (Density: 62.2407 lb/ft³)' },
      { label: 'Rotation Speed', value: '1,450.0 RPM (151.8440 rad/s)' },
      { label: 'Reference Diameter', value: '0.8909 ft' },
      { label: 'Volume Flow Rate', value: '2.7551 ft³/s' },
      { label: 'Head (IN-OUT)', value: '68.5248 ft' },
      { label: 'Head (LE-TE)', value: '70.5865 ft' },
      { label: 'Total Efficiency (IN-OUT)', value: '86.3876%' },
      { label: 'Static Efficiency (IN-OUT)', value: '70.0484%' },
      { label: 'Shaft Power', value: '17.4800 BTU/s' },
      { label: 'Flow Coefficient', value: '0.0257' },
      { label: 'Head Coefficient (IN-OUT)', value: '0.1205' },
      { label: 'Power Coefficient', value: '0.0036' },
      { label: 'Mesh Resolution', value: '491,964 Nodes / 460,352 Elements' },
      { label: 'Max Edge Length Ratio', value: '2566.48' },
      { label: 'Turbulence Model', value: 'SST (Automatic Wall Functions)' },
    ],
    highlights: [
      'Domain R1 modeled in ANSYS CFX with 491,964 nodes, 460,352 elements, and 4 rotational periodic interfaces',
      'SST turbulence model with automatic turbulent wall functions in rotating coordinate system (1,450 RPM)',
      'Computed 86.3876% total efficiency and 70.0484% static efficiency at 2.7551 ft³/s volume flow rate',
      'Net pump stage head of 68.5248 ft (IN-OUT) and blade head of 70.5865 ft (LE-TE) with 17.4800 BTU/s shaft power',
      'Static pressure rises from -1.7314 psi at LE Cut to 20.2731 psi at TE Cut (+22.0045 psi across blades)',
      'Total pressure increases from -0.1839 psi at LE Cut to 30.3255 psi at TE Cut (+30.5094 psi across blades)',
      'Absolute velocity C increases from 18.4624 ft/s at LE to 41.7957 ft/s at TE, while relative velocity W decreases from 30.3317 ft/s to 28.8562 ft/s',
    ],
    performanceResults: [
      { parameter: 'Rotation Speed', value: '151.8440', units: '[radian s^-1]' },
      { parameter: 'Reference Diameter', value: '0.8909', units: '[ft]' },
      { parameter: 'Volume Flow Rate', value: '2.7551', units: '[ft^3 s^-1]' },
      { parameter: 'Head (LE-TE)', value: '70.5865', units: '[ft]' },
      { parameter: 'Head (IN-OUT)', value: '68.5248', units: '[ft]' },
      { parameter: 'Flow Coefficient', value: '0.0257', units: '—' },
      { parameter: 'Head Coefficient (IN-OUT)', value: '0.1205', units: '—' },
      { parameter: 'Shaft Power', value: '17.4800', units: '[BTU s^-1]' },
      { parameter: 'Power Coefficient', value: '0.0036', units: '—' },
      { parameter: 'Total Efficiency (IN-OUT) %', value: '86.3876', units: '%' },
      { parameter: 'Static Efficiency (IN-OUT) %', value: '70.0484', units: '%' },
    ],
    summaryData: [
      { quantity: 'Density [lb ft^-3]', inlet: '62.2407', leCut: '62.2407', teCut: '62.2407', outlet: '62.2407', teMinusLe: '0.0000' },
      { quantity: 'Pstatic [psi]', inlet: '-0.9553', leCut: '-1.7314', teCut: '20.2731', outlet: '24.0053', teMinusLe: '22.0045' },
      { quantity: 'Ptotal [psi]', inlet: '-0.0110', leCut: '-0.1839', teCut: '30.3255', outlet: '29.6073', teMinusLe: '30.5094' },
      { quantity: 'Ptotal (rot) [psi]', inlet: '-0.0470', leCut: '-0.5594', teCut: '-3.0040', outlet: '-3.7747', teMinusLe: '-2.4446' },
      { quantity: 'U [ft s^-1]', inlet: '29.5589', leCut: '32.8839', teCut: '67.6374', outlet: '91.8997', teMinusLe: '34.7535' },
      { quantity: 'Cm [ft s^-1]', inlet: '11.8406', leCut: '14.0603', teCut: '8.8324', outlet: '5.9683', teMinusLe: '-5.2280' },
      { quantity: 'Cu [ft s^-1]', inlet: '0.0708', leCut: '6.2895', teCut: '40.4066', outlet: '26.3138', teMinusLe: '34.1171' },
      { quantity: 'C [ft s^-1]', inlet: '11.8617', leCut: '18.4624', teCut: '41.7957', outlet: '27.1397', teMinusLe: '23.3333' },
      { quantity: 'Distortion Parameter', inlet: '1.0020', leCut: '1.3651', teCut: '1.1135', outlet: '1.0357', teMinusLe: '-0.2516' },
      { quantity: 'Flow Angle: Alpha [radian]', inlet: '0.0061', leCut: '0.4693', teCut: '1.3726', outlet: '1.3639', teMinusLe: '0.9033' },
      { quantity: 'Wu [ft s^-1]', inlet: '-29.4881', leCut: '-26.5948', teCut: '-27.2309', outlet: '-65.5859', teMinusLe: '-0.6361' },
      { quantity: 'W [ft s^-1]', inlet: '32.0032', leCut: '30.3317', teCut: '28.8562', outlet: '65.9479', teMinusLe: '-1.4755' },
      { quantity: 'Flow Angle: Beta [radian]', inlet: '-1.1556', leCut: '-0.6540', teCut: '-1.2970', outlet: '-1.3985', teMinusLe: '-0.6429' },
    ],
    tags: ['ANSYS CFX', 'Turbomachinery', 'Pump Impeller', 'CFD', 'SST Turbulence', 'Fluid Dynamics', 'CFX5'],
    image: '/52-projects/PumpReport/Figure001.png',
    images: [
      '/52-projects/PumpReport/Figure001.png',
      '/52-projects/PumpReport/Figure002.png',
      '/52-projects/PumpReport/Figure003.png',
      '/52-projects/PumpReport/Figure006.png',
      '/52-projects/PumpReport/Figure004.png',
      '/52-projects/PumpReport/Figure007.png',
      '/52-projects/PumpReport/Figure009.png',
      '/52-projects/PumpReport/Figure021.png',
      '/52-projects/PumpReport/Chart001.png',
      '/52-projects/PumpReport/Chart002.png',
      '/52-projects/PumpReport/Chart004.png',
    ],
    gallery: [
      { src: '/52-projects/PumpReport/Figure001.png', title: 'Figure 1 — Isometric 3D View of the Blade, Hub and Shroud' },
      { src: '/52-projects/PumpReport/Figure002.png', title: 'Figure 2 — Meridional View of the Blade, Hub and Shroud' },
      { src: '/52-projects/PumpReport/Figure003.png', title: 'Figure 3 — Mesh Elements at 50% Span (460,352 Elements)' },
      { src: '/52-projects/PumpReport/Figure006.png', title: 'Figure 6 — Contour of Static Pressure (Ps) at 50% Span' },
      { src: '/52-projects/PumpReport/Figure004.png', title: 'Figure 4 — Contour of Total Pressure (Pt) at 50% Span' },
      { src: '/52-projects/PumpReport/Figure007.png', title: 'Figure 7 — Contour of Relative Velocity (W) at 50% Span' },
      { src: '/52-projects/PumpReport/Figure009.png', title: 'Figure 9 — Velocity Vectors at 50% Span' },
      { src: '/52-projects/PumpReport/Figure021.png', title: 'Figure 21 — Velocity Streamlines at Blade TE' },
      { src: '/52-projects/PumpReport/Figure011.png', title: 'Figure 11 — Contour of Mass Averaged Pt on Meridional Surface' },
      { src: '/52-projects/PumpReport/Figure014.png', title: 'Figure 14 — Vector of Area Averaged Cm on Meridional Surface' },
      { src: '/52-projects/PumpReport/Figure015.png', title: 'Figure 15 — Contour of Pt at Blade LE' },
      { src: '/52-projects/PumpReport/Figure018.png', title: 'Figure 18 — Contour of Pt at Blade TE' },
      { src: '/52-projects/PumpReport/Chart001.png', title: 'Chart 1 — Blade Loading at 20% Span' },
      { src: '/52-projects/PumpReport/Chart002.png', title: 'Chart 2 — Blade Loading at 50% Span' },
      { src: '/52-projects/PumpReport/Chart004.png', title: 'Chart 4 — Streamwise Plot of Pt and Ps' },
      { src: '/52-projects/PumpReport/Chart005.png', title: 'Chart 5 — Streamwise Plot of Absolute Velocity (C)' },
      { src: '/52-projects/PumpReport/Chart006.png', title: 'Chart 6 — Streamwise Plot of Relative Velocity (W)' },
      { src: '/52-projects/PumpReport/Chart007.png', title: 'Chart 7 — Streamwise Plot of Flow Angles Alpha and Beta' },
    ],
    githubUrl: '',
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
