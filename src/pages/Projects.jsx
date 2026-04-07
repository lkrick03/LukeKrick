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
  const [selectedSubProject, setSelectedSubProject] = useState(null);
  const projects = [
    {
      id: 1,
      title: 'Industry Work',
      category: 'Professional Work',
      shortDesc: 'Developed a Potassium Nitrate—Sugar (KNSB) solid rocket motor class and designed a robust hot-fire test stand.',
      bgImages: [getProjectImg('p10')], // Single wide photo
      subProjects: [
        { title: 'BWXT Manufacturing Engineering Intern', desc: 'Conducted comprehensive research and practical testing on KNSB solid propellants, aiming to create a reliable, castable motor for student rocketry.', img: getProjectImg('p2') },
        { title: 'Cyntergy Refrigeration Intern', desc: 'Designed a static test stand using load cells and custom DAQ to measure thrust curves and characterize motor profiles.', img: getProjectImg('p3') }
      ]
    },
    {
      id: 2,
      title: 'Research & Personal Projects',
      category: 'For the Love of the Game',
      shortDesc: 'Investigating the aerodynamic viability of utilizing grid fins for high-lift applications at low speeds.',
      bgImages: [getProjectImg('p4')], // Classic wide single picture
      subProjects: [
        { title: 'Grid Fins as a High Lift Device', desc: 'Utilized ANSYS Fluent to run 3D steady-state CFD simulations over varying angles of attack, comparing lift and drag coefficients against traditional planar fins.', img: getProjectImg('p8') },
        { title: 'Custom Mixed Solid Rocket Fuel', desc: 'Implemented targeted mesh refinement strategies and employed the k-omega SST turbulence model to balance accuracy.', img: getProjectImg('p3') },
        { title: 'PyMechanical and AI Integration', desc: '[Placeholder] - Future physical wind tunnel testing to validate the CFD aerodynamic stall characteristics.', img: getProjectImg('p9') }
      ]
    },
    {
      id: 3,
      title: 'Liberty Rocketry Competition Team',
      category: 'Student-lead Competition Team (IREC)',
      shortDesc: 'Led the engineering team in designing and manufacturing high-power rockets for the International Rocketr Engineering Competition (IREC).',
      bgImages: [getProjectImg('p5')], // Single wide photo
      subProjects: [
        { title: 'Chief Engineer', desc: 'Served as Chief Engineer overseeing the full lifecycle from conceptual design to launch and recovery.', img: getProjectImg('p5') },
        { title: 'Assistant Team Lead', desc: 'Organized sub-team workflows and established rigorous systems engineering design reviews.', img: getProjectImg('p6') },
        { title: 'Nozzle Engineer', desc: 'Started a CFD section of the team to analyze the aerodynamic performance of the rocket.', img: getProjectImg('p7') }
      ]
    }
  ];

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedSubProject(null);
  };

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
        <div className="modal__overlay" onClick={closeModal}>
          <div className={`modal__content ${selectedSubProject ? 'modal__content--expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal}>×</button>

            {!selectedSubProject ? (
              <>
                <h2 className="modal__title">{selectedProject.title}</h2>
                <div className="modal__subprojects-grid">
                  {selectedProject.subProjects.map((sp, idx) => (
                    <div key={idx} className="modal__subproject-card" onClick={() => setSelectedSubProject(sp)}>
                      <div className="modal__subproject-img-wrapper">
                        {sp.img && <img src={sp.img} alt={sp.title} className="modal__subproject-img" />}
                      </div>
                      <h3>{sp.title}</h3>
                      <p className="modal__subproject-hint">Click for more info →</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="modal__subproject-detail">
                <button className="modal__back-btn" onClick={() => setSelectedSubProject(null)}>
                  ← Back to Sections
                </button>
                <div className="modal__detail-content">
                  <div className="modal__detail-img-wrapper">
                    {selectedSubProject.img && <img src={selectedSubProject.img} alt={selectedSubProject.title} className="modal__detail-img" />}
                  </div>
                  <div className="modal__detail-text">
                    <h2>{selectedSubProject.title}</h2>
                    <p>{selectedSubProject.desc}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
