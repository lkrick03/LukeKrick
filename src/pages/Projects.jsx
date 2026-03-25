import { useState } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import './Projects.css';

const projects = [
  {
    tag: 'Personal Project',
    title: 'Potassium Nitrate – Sugar Propellant & Test Stand',
    description:
      'Designed and built a fully-custom low-power rocket with custom fuel, 3D printed body, and a purpose-built test stand to measure motor performance.',
    what: [
      'Designed and built a fully-custom low-power rocket',
      'Mixed custom fuel, 3D printed a custom rocket body, and ran through testing procedures',
      'Built a custom test-stand to determine the performance of the motor',
    ],
    how: [
      'Found a formula for a potassium nitrate and sugar fuel that was easy to mix without heat',
      'Mixed fuel with different mass percentages to compare formulas',
      '3D printed and assembled a custom rocket airframe using an Ender 3',
      'Purchased aluminum extrusions, a load cell, and an Arduino to measure thrust',
      'Programmed the Arduino to export data to an Excel sheet',
      'Ran tests using standard G motors to compare thrust curves between test stand and published data',
    ],
    problems: [
      'Propellant had a tendency to explode when packed in large quantities',
      'Mixing process kept materials separated; propellant looked clumpy with sporadic burn rate',
      'Mixture was still in powder form, making it very hard to pack into a liner',
    ],
    solutions: [
      'Found a new formula using epoxy as a binder to KNO3, replacing sugar as fuel',
      'Epoxy made the mixture more homogeneous and pourable, reducing sporadic burn rates',
      'This solution should reduce chances of explosion from over-pressurization',
    ],
    results: [
      'Propellant mixture performed well in small-scale testing even with known issues',
      'Assembly of the entire rocket went smoothly with parachutes and cords fitting well',
      'Test stand worked as intended with below 10% error compared to published data',
      'Project handed off to Liberty Rocketry for new students to continue fuel mixing',
    ],
  },
  {
    tag: 'Competition Team',
    title: 'Liberty Rocketry Competition Team',
    description:
      'Fourth-year member of Liberty Rocketry serving as Chief Engineer, overseeing the development of "Trinity" – the team\'s third competition rocket.',
    what: [
      'Currently a fourth-year member of Liberty Rocketry; served as Chief Engineer for one year and propulsion team member for two',
      'Team reached a 40th place finish, then 9th place, then 13th place (based on performance)',
    ],
    how: [
      'Freshman Year: Nozzle engineer for propulsion sub-team, helped with manufacturing, developed simulations for nozzle ratios based on fuel performance',
      'Sophomore Year: Assistant team lead for propulsion, oversaw development of modular casing, test stand, and fuel mixing procedures',
      'Junior Year: Elected Chief Engineer, oversaw development of "Trinity", pushed for interchangeable fins, test stand completion, and ANSYS CFD simulations',
    ],
    problems: [
      'Boat tail addition forced abandonment of the thrust plate; needed new motor retention solution',
      'Budget restrictions left team with only one test launch and no wrapped launches',
      'No prior knowledge base on CFD for rocketry in the team',
    ],
    solutions: [
      'A "slimline" device was attached to the motor tube (high compressive-strength composite) to absorb thrust without impeding the boat tail',
      'Drag was estimated based on wrap thickness, then simulations optimized ballast mass',
      'Obtained ANSYS sponsorship and taught members how to perform CFD simulations',
    ],
    results: [
      'Trinity performed exceptionally — 300 feet off of the 10,000-foot target altitude',
      'Received highest design and build scores in the history of Liberty Rocketry',
      'Modular fin-can design worked great; fins could be switched in case of an accident',
      'Test stand design finished with most parts ordered by end of year',
      'CFD simulations completed with results compiled',
    ],
  },
  {
    tag: 'Research',
    title: 'CFD Analysis & PyMechanical Beam Simulations',
    description:
      'Two research projects: CFD thermal analysis of a solid rocket motor casing with ANSYS Fluent, and PyMechanical beam simulations exploring AI-driven meshing.',
    what: [
      'Two research projects completed with professors at Liberty University',
      'First: fluids simulation to determine heat transfer through a motor casing',
      'Second: study on how well AI and PyMechanical could be used to study beams',
    ],
    how: [
      'Motor Casing: Used dimensions/materials of a commercial motor used by Liberty Rocketry, created geometry in ANSYS SpaceClaim, simulated at different inlet velocities',
      'Used a line rake to determine temperature throughout the casing',
      'PyMechanical: Used simple beam theory to calculate stress and deflection, geometry constructed in ANSYS SpaceClaim',
      'Created a Python script to automatically load geometry, create boundary conditions, and run simulations',
      'Asked different AI models for ideal meshing conditions and tested automatically via Python script',
    ],
    problems: [
      'Motor Casing: As phenolic liner burns, a char layer develops that limits heat transfer — hard to model',
      'PyMechanical: Boundary conditions were not applying due to lack of ability for the code to choose faces',
    ],
    solutions: [
      'Found NASA research papers with thermal conductivity estimates for the charred layer; liner geometry split into two sections (phenolic + charred layer)',
      'Python used cell numbers to create named selections without faces; code found the cell ID and automatically applied a named selection',
    ],
    results: [
      'Simulations ran well at different input velocities; temperature data compiled and plotted',
      'Each AI model gave different meshing parameters; results compared to analytical solutions to determine most accurate model',
    ],
  },
  {
    tag: 'Honors Thesis',
    title: 'Aerodynamic Performance of Grid Fins as High Lift Devices',
    description:
      'Senior honors thesis researching how grid fins — inspired by SpaceX\'s heavy booster — could be used as high-lift devices on aircraft, using ANSYS Fluent, Python, and HPC.',
    what: [
      'Inspired by SpaceX heavy booster grid-fins; studying use as high-lift devices or control surfaces on aircraft',
      '65-page thesis using ANSYS Fluent, Python, and ParaView',
      'Incorporating high-performance computing to run 80 different angles of attack',
    ],
    how: [
      'Conducted a literature review of grid fins and their current use cases',
      'Analyzed how other researchers studied grid fins in subsonic conditions',
      'Created grid fin designs in SolidWorks, starting with a razor blade flap',
      'Used ANSYS Meshing to create a structured 3D mesh with bias factors',
      'Ran different viscous models at different angles of attack, analyzing lift and drag changes',
    ],
    problems: [
      'Structured meshing requires split geometries, leading to many Fluent topology errors',
      'Mesh had a tendency to angle cells, leading to poor skewness',
      'Running different angles of attack is tedious',
      'Turbulence models (SST, K-Epsilon Standard) were diverging or delivering incorrect drag results',
    ],
    solutions: [
      'ANSYS requires a single part with shared topology for structured meshing',
      'Bias factors of lines perpendicular to each other must be the same to reduce skewing',
      'Developed a SCHEME journal script to automatically change velocity components',
      'Made a more refined mesh with lower y+ value, allowing SST to converge with correct results',
    ],
    results: [
      'Lift and drag calculated at different angles of attack',
      'Final journal file run on Liberty\'s HPC to reduce computational time',
      'Results processed in a Python script that cleaned data, calculated coefficients, and prepared data for post-processing',
      'ParaView contour plots taken at each angle of attack; Python script created animations showing flow behavior',
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="page-wrapper projects">
      {/* Hero */}
      <section className="projects__hero">
        <p className="projects__label">Portfolio</p>
        <h1 className="projects__title">Projects</h1>
        <p className="projects__subtitle">
          A collection of engineering projects spanning rocketry, CFD research,
          and hands-on fabrication.
        </p>
      </section>

      {/* Grid */}
      <div className="projects__grid">
        {projects.map((project, index) => (
          <SpotlightCard
            key={index}
            tag={project.tag}
            title={project.title}
            description={project.description}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="project-modal__close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            <span className="project-modal__tag">{selectedProject.tag}</span>
            <h2 className="project-modal__title">{selectedProject.title}</h2>

            <div className="project-modal__sections">
              {/* What & How */}
              <div className="project-modal__section">
                <h3>Overview</h3>
                <ul>
                  {selectedProject.what.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="project-modal__section">
                <h3>Approach</h3>
                <ul>
                  {selectedProject.how.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Problems / Solutions / Results */}
              <div className="project-modal__three-col">
                <div className="project-modal__section">
                  <h4>Problems</h4>
                  <ul>
                    {selectedProject.problems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-modal__section">
                  <h4>Solutions</h4>
                  <ul>
                    {selectedProject.solutions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-modal__section">
                  <h4>Results</h4>
                  <ul>
                    {selectedProject.results.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
