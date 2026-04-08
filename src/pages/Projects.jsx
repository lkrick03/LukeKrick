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
      shortDesc: 'Two Industry Internships With Hands-on Experience',
      bgImages: [getProjectImg('p10')], // Single wide photo
      subProjects: [
        {
          title: 'BWXT Manufacturing Engineering Intern', desc: `• Designed and built support tools for a control rod device, allowing for safe transportation during assembly (SolidWorks)
• Conducted procedure qualification plans to validate essential assembly techniques, followed quality assurance procedures
• Used FEA to validate testing procedures to determine part failure (ANSYS Mechanical)
• Processed test data and wrote reports on the feasibility of the manufacturing and assembly process (Python)
• Used and evaluated model-based definition programs for use in the manufacturing division (GD&T + PDM)
• Assisted in reactor assembly, working as FME monitor to maintain reactor integrity during assembly`, img: getProjectImg('p2')
        },
        {
          title: 'Cyntergy Refrigeration Intern', desc: `• Worked with Walmart to understand refrigeration needs and placement requirements (AutoCAD)
• Calculated loads based on the number of refrigerators being added and Walmart's requirements
• Used commercial programs to calculate pipe lengths and diameters to ensure correct pipe velocity and to avoid cavitation
• Planned the piping layout and equipment placements to comply with current stores without overloading existing structures (Revit)
• Helped integrate ammonium and carbon dioxide refrigerants into Walmart systems to reduce atmospheric degradation`, img: getProjectImg('p3')
        }
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
        { title: 'Custom Mixed Solid Rocket Fuel and Test Stand', desc: 'Mixed potassium nitrate and granulated sugar to create a custom solid rocket fuel. Created a custom test stand with an Arduino, amplifier, and load cell to measure thrust and burn time.', img: getProjectImg('p3') },
        {
          title: 'PyMechanical and AI Integration', desc: `•	Did a semester of research on how AI could be incorporated into ANSYS
•	Studied how generative AI models could decrease meshing time and increase meshing quality in ANSYS mechanical
•	Created a Python script that would run different meshing parameters automatically in ANSYS using data from Generative AI models
  `, img: getProjectImg('p9')
        }
      ]
    },
    {
      id: 3,
      title: 'Liberty Rocketry Competition Team',
      category: 'Student-lead Competition Team (IREC)',
      shortDesc: 'Led the engineering team in designing and manufacturing high-power rockets for the International Rocketr Engineering Competition (IREC).',
      bgImages: [getProjectImg('p5')], // Single wide photo
      subProjects: [
        {
          title: 'Chief Engineer', desc: `• Created the vision of the team, setting the goals and objectives to meet competition requirements
• Held design reviews for the subteams, helping overcome any engineering problems, making sure objectives were met, and designs complied with competition rules and requirements
• Started a CFD section of the team, created watertight meshes and ran simulations to produce accurate drag data (ANSYS Fluent)
• Responsible for the altitude simulation systems; altitude error within 3% of 10,000 feet during competition (OpenRocket)
• Achieved a level 2 rocketry certification from Tripoli, building a high-power rocket with altimeters and a dual-stage separation system`, img: getProjectImg('p5')
        },
        {
          title: 'Assistant Propulsion Team Lead', desc: `• Initiated and assisted in the design of a test stand that was built using steel angle, a load cell, and a commercial data capturing system
• Created a modular casing that used a phenolic liner, gaskets, and bolted sections to allow for different casing lengths
• Reviewed and edited mixing procedures for experimental fuel to check for safety and viability issues
• Manufactured different sections of the propulsion system and oversaw the assembly of the final system into the rocket`, img: getProjectImg('p6')
        },
        {
          title: 'Nozzle Engineer', desc: `• Designed a converging-diverging nozzle for an experimental rocket motor and casing (SolidWorks)
• Manufactured an initial test stand using aluminum extrusions, a load cell, and an Arduino; test fired small rocket motors for validation of the entire system
• Developed a script that analyzed different nozzle designs, mitigating the risk of casing over-pressurization (MATLAB)
• Successfully produced and fired an experimental propellant mixture that used sugar and potassium nitrate instead of standard Ammonium Perchlorate (OpenMotor)`, img: getProjectImg('p7')
        }
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
