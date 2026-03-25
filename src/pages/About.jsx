import './About.css';

export default function About() {
  const skills = [
    'SolidWorks', 'ANSYS SpaceClaim', 'ANSYS Fluent', 'PyMechanical',
    'MATLAB', 'Python', 'Siemens NX', 'GD&T', 'Machining (Mill/Lathe)',
    'FEA', 'CFD', 'Systems Engineering'
  ];

  const focuses = [
    'Computational Fluid Dynamics & Aerodynamics',
    'Solid Rocket Propulsion Systems',
    'High-Power Rocketry Mechanical Design',
    'Automated Engineering Simulation Workflows'
  ];

  return (
    <div className="about">
      <div className="about__header">
        <h1 className="about__title">ABOUT</h1>
      </div>

      <div className="about__grid">
        <div className="about__section about__section--full">
          <div className="about__intro">
            <p>
              I am a Mechanical Engineer driven by a relentless curiosity for aerospace systems and the mechanics of flight. 
              My journey began by watching the precision of SpaceX's grid fins guiding boosters back to Earth—which ultimately inspired my Honors Thesis research.
            </p>
            <p>
              During my time as <strong>Chief Engineer of Liberty Rocketry</strong>, I learned that engineering isn't just about designing a part; it's about systems-level integration, team leadership, and making rapid decisions under pressure to ensure mission success.
            </p>
            <p>
              Professionally, I've applied these principles during my tenure at <strong>BWXT</strong>, working on complex mechanical designs, structural analyses, and rigorous testing protocols for mission-critical components in the naval nuclear propulsion program.
            </p>
          </div>
        </div>

        <div className="about__section">
          <h2>Technical Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="about__section">
          <h2>Education</h2>
          <div className="education-card">
            <h3>Liberty University</h3>
            <p>B.S. Mechanical Engineering (Honors)</p>
            <div className="education-meta">
              <span>GPA: 3.82</span>
              <span>May 2025</span>
            </div>
          </div>
          
          <div className="focus-card" style={{marginTop: '2rem'}}>
            <h3>Primary Focus Areas</h3>
            <ul className="focus-list">
              {focuses.map((focus, index) => (
                <li key={index}>{focus}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
