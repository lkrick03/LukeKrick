import { useState } from 'react';
import projectPropellantBg from '../assets/project-propellant.png';
import projectCfdBg from '../assets/project-cfd.png';
import heroBg from '../assets/hero-bg.png';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Sugar Propellant & Test Stand',
      category: 'Solid Propulsion',
      shortDesc: 'Developed a Potassium Nitrate—Sugar (KNSB) solid rocket motor class and designed a robust hot-fire test stand.',
      bgImage: projectPropellantBg,
      details: {
        overview: 'Conducted comprehensive research and practical testing on KNSB solid propellants, aiming to create a reliable, castable motor for student rocketry.',
        approach: 'Designed a casting process to eliminate voids and improve burn consistency. Simultaneously developed a static test stand using load cells and custom DAQ to measure thrust curves.',
        problems: 'Propellant cracking during the cooling phase led to unpredictable burn rates and potential over-pressurization.',
        solutions: 'Optimized the cooling gradient and added sorbitol to the mixture to increase flexibility and reduce brittleness of the cast fuel grains.',
        results: 'Successfully characterized the thrust profile of the motor, achieving a repeatable specific impulse and confirming the structural integrity of the test stand up to 500 lbf of thrust.'
      }
    },
    {
      id: 2,
      title: 'Grid Fins as High Lift Devices',
      category: 'Honors Thesis',
      shortDesc: 'Investigating the aerodynamic viability of utilizing grid fins for high-lift applications at low speeds.',
      bgImage: projectCfdBg,
      details: {
        overview: 'An extensive aerodynamics study evaluating whether grid fins, traditionally used for high-speed stabilization, can be optimized for low-speed high-lift requirements.',
        approach: 'Utilized ANSYS Fluent to run 3D steady-state CFD simulations over varying angles of attack and Mach numbers, comparing lift and drag coefficients against traditional planar fins.',
        problems: 'High computational cost of resolving the complex boundary layers within the grid fin lattice.',
        solutions: 'Implemented targeted mesh refinement strategies (poly-hexcore) and employed the k-omega SST turbulence model to balance accuracy and computational efficiency.',
        results: 'Identified specific geometric configurations where grid fins exhibit delayed stall characteristics compared to planar fins, providing a foundation for future physical wind tunnel testing.'
      }
    },
    {
      id: 3,
      title: 'Liberty Rocketry Competition',
      category: 'Team Leadership',
      shortDesc: 'Led the engineering team in designing and manufacturing high-power rockets for the NASA USLI and Spaceport America Cup.',
      bgImage: heroBg,
      details: {
        overview: 'Served as Chief Engineer for the Liberty Rocketry Project, overseeing the full lifecycle from conceptual design to launch and recovery.',
        approach: 'Implemented rigorous systems engineering practices, organized sub-team workflows (Aerostructures, Propulsion, Avionics), and established regular design reviews.',
        problems: 'Integration issues between the payload deployment mechanism and the avionics bay under high-G loading.',
        solutions: 'Redesigned the coupling system using FEA to identify stress concentrations, shifting to a custom-machined aluminum bulkhead that dispersed the load.',
        results: 'Successfully launched and recovered the vehicle, meeting all competition requirements and scoring highly in the engineering design report category.'
      }
    }
  ];

  return (
    <div className="projects">
      {projects.map((project, index) => (
        <section key={project.id} className={`project__section ${index % 2 === 0 ? 'project__section--even' : 'project__section--odd'}`}>
          <div className="project__media">
            <img src={project.bgImage} alt={project.title} className="project__image" />
          </div>
          <div className="project__content">
            <span className="project__meta">{project.category}</span>
            <h2 className="project__title">{project.title}</h2>
            <p className="project__desc">{project.shortDesc}</p>
            <button 
              className="project__btn"
              onClick={() => setSelectedProject(project)}
            >
              Learn More
            </button>
          </div>
        </section>
      ))}

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="modal__overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedProject(null)}>×</button>
            <h2 className="modal__title">{selectedProject.title}</h2>
            
            <div className="modal__section">
              <h3>Overview</h3>
              <p>{selectedProject.details.overview}</p>
            </div>
            <div className="modal__section">
              <h3>Approach</h3>
              <p>{selectedProject.details.approach}</p>
            </div>
            <div className="modal__section">
              <h3>Problems</h3>
              <p>{selectedProject.details.problems}</p>
            </div>
            <div className="modal__section">
              <h3>Solutions</h3>
              <p>{selectedProject.details.solutions}</p>
            </div>
            <div className="modal__section">
              <h3>Results</h3>
              <p>{selectedProject.details.results}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
