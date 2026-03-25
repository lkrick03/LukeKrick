import { useState } from 'react';
import './Projects.css';

// Dynamically grab p2-p6 images regardless of extension (.jpg, .png, etc.)
const allProjectImages = import.meta.glob('../assets/p*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const getProjectImg = (filenameWithoutExt) => {
  const matchingKey = Object.keys(allProjectImages).find(k => k.match(new RegExp(`/${filenameWithoutExt}\\.(jpg|jpeg|png|webp)$`, 'i')));
  return matchingKey ? allProjectImages[matchingKey] : '';
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Sugar Propellant & Test Stand',
      category: 'Solid Propulsion',
      shortDesc: 'Developed a Potassium Nitrate—Sugar (KNSB) solid rocket motor class and designed a robust hot-fire test stand.',
      bgImages: [getProjectImg('p2'), getProjectImg('p3')], // Two photos side by side
      subProjects: [
        { title: 'KNSB Sugar Propellant Motor', desc: 'Conducted comprehensive research and practical testing on KNSB solid propellants, aiming to create a reliable, castable motor for student rocketry.' },
        { title: 'Static Test Stand & DAQ', desc: 'Designed a static test stand using load cells and custom DAQ to measure thrust curves and characterize motor profiles.' },
        { title: 'Modular Phenolic Casings', desc: '[Placeholder] - Investigating the use of modular phenolic casings for reusable student rocketry applications.' }
      ]
    },
    {
      id: 2,
      title: 'Grid Fins as High Lift Devices',
      category: 'Honors Thesis',
      shortDesc: 'Investigating the aerodynamic viability of utilizing grid fins for high-lift applications at low speeds.',
      bgImages: [getProjectImg('p4')], // Classic wide single picture
      subProjects: [
        { title: 'Grid Fins as High Lift Devices', desc: 'Utilized ANSYS Fluent to run 3D steady-state CFD simulations over varying angles of attack, comparing lift and drag coefficients against traditional planar fins.' },
        { title: 'Poly-Hexcore Mesh Optimization', desc: 'Implemented targeted mesh refinement strategies and employed the k-omega SST turbulence model to balance accuracy.' },
        { title: 'Wind Tunnel Validation', desc: '[Placeholder] - Future physical wind tunnel testing to validate the CFD aerodynamic stall characteristics.' }
      ]
    },
    {
      id: 3,
      title: 'Liberty Rocketry Competition',
      category: 'Team Leadership',
      shortDesc: 'Led the engineering team in designing and manufacturing high-power rockets for the NASA USLI and Spaceport America Cup.',
      bgImages: [getProjectImg('p5'), getProjectImg('p6')], // Two photos side by side
      subProjects: [
        { title: 'NASA USLI Launch Vehicle', desc: 'Served as Chief Engineer overseeing the full lifecycle from conceptual design to launch and recovery.' },
        { title: 'Spaceport America Cup Payload', desc: 'Organized sub-team workflows and established rigorous systems engineering design reviews.' },
        { title: 'Avionics Bulkhead Redesign', desc: 'Redesigned the coupling system using FEA to identify stress concentrations, shifting to a custom-machined aluminum bulkhead.' }
      ]
    }
  ];

  return (
    <div className="projects">
      {projects.map((project) => (
        <section key={project.id} className="project__section">
          <div className="project__bg-container">
            {project.bgImages.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${project.title} background ${index + 1}`} 
                className="project__bg-image" 
                style={{ width: `${100 / project.bgImages.length}%` }}
              />
            ))}
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
            
            <div className="modal__subprojects-grid">
              {selectedProject.subProjects.map((sp, idx) => (
                <div key={idx} className="modal__subproject-card">
                  <h3>{sp.title}</h3>
                  <p>{sp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
