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
      title: 'Personal Projects',
      category: 'Professional Work',
      shortDesc: 'Two Industry Internships With Hands-on Experience',
      bgImages: [getProjectImg('p10')], // Single wide photo
      subProjects: [
        {
          title: 'Thrust Vector Control System (4 Inch Airframe)', desc: `• Designed a mechanical gyro base that uses fully printed components to have two degrees of freedom up to ten degrees
• Through multiple interations, interchangeable add-ons allow servos to be mounted onto the whole system using heat set inserts and 3mm SCH screws
• Whole assembly created in SolidWorks utilizing parametric design to account for 3D printing tolerance and design iterations
• Chose electronic compoents based on mechanical and electircal requriements. Chose servos, batteries, and a buck converter to adequatly power servos.
• Programmed RP2040 microcontroller in CircuitPython to move servos throughout the range of motion
• Assembled on breadboard to test the whole system to account for tilting sensors`, img: getProjectImg('p2')
        },
        {
          title: 'Custom Mixed Solid Rocket Fuel and Test Stand', desc: `• Mixed potassium nitrate and granulated sugar to create a custom solid rocket fuel
• Created a custom test stand with an Arduino, amplifier, and load cell to measure thrust and burn time.
• Used OpenMotor to create and simulate motor designs to analyse different potential motor mixtures`, img: getProjectImg('p3')
        }
      ]
    },
    {
      id: 2,
      title: 'Research',
      category: 'Academic Activity',
      shortDesc: 'Research done with different professors on a variety of topics',
      bgImages: [getProjectImg('p4')], // Classic wide single picture
      subProjects: [
        {
          title: 'Grid Fins as a High Lift Device (Comprehensive)', desc: `•	Researched how grid fins could be used as a high-lift device in aircraft
        •	Created a structured, quad dominated mesh with grid flap regions that can be activated or deactivated
        •	Programmed a script to automatically run variable angles of attack on a high-performance computer
        •	Processed data using a custom script for automatic data and contour exportation (Python and ParaView)
        •	Wrote a 65-page report on the results of the data along with implications of the research
`
          , img: getProjectImg('p8')
        },
        {
          title: 'CFD Analysis of a Solid Rocket Motor Casing with ANSYS Fluent', desc: `•	Researched how temperature is distributed through a rocket liner during a burn
• Created a high-quality mesh in ANSYS Fluent Meshing
•	Solved for temperature distributions across the motor using ANSYS Fluent
•	Authored a ten-page report on the findings and future research`
          , img: getProjectImg('p3')
        },
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
• Successfully produced and fired an experimental propellant mixture that used sugar and potassium nitrate instead of standard Ammonium Perchlorate (OpenMotor)`, img: getProjectImg('p11')
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
