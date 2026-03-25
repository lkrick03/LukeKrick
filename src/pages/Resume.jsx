import './Resume.css';

export default function Resume() {
  return (
    <div className="page-wrapper resume">
      {/* Hero */}
      <section className="resume__hero">
        <p className="resume__label">Curriculum Vitae</p>
        <h1 className="resume__title">Resume</h1>
        <button className="resume__download" onClick={() => window.print()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF
        </button>
      </section>

      {/* Resume Document */}
      <div className="resume-doc">
        {/* Header */}
        <div className="resume-header">
          <h2 className="resume-header__name">Luke Krick</h2>
          <div className="resume-header__contact">
            <a href="mailto:Luke.krick02@outlook.com">Luke.krick02@outlook.com</a>
            <span className="resume-header__separator">•</span>
            <span>918-998-6021</span>
            <span className="resume-header__separator">•</span>
            <a href="https://www.linkedin.com/in/luke-krick/" target="_blank" rel="noopener noreferrer">
              www.linkedin.com/in/luke-krick/
            </a>
          </div>
        </div>

        {/* EDUCATION */}
        <section className="resume-section">
          <h3 className="resume-section__title">Education</h3>
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Liberty University</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Honors Mechanical Engineering</span>
              <span className="resume-entry__dates">Expected Graduation May 2026</span>
            </div>
            <p className="resume-entry__gpa">GPA: <span>3.82 / 4.00</span></p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="resume-section">
          <h3 className="resume-section__title">Work Experience</h3>

          {/* BWXT */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">BWXT</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Manufacturing Engineer Intern</span>
              <span className="resume-entry__dates">June – August 2025</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Designed and built support tools for a control rod device, allowing for safe transportation during assembly (SolidWorks)</li>
              <li>Conducted procedure qualification plans to validate essential assembly procedures, followed quality assurance procedures</li>
              <li>Used FEA to validate testing procedures to determine part failure (ANSYS Mechanical)</li>
              <li>Processed test data through Python and wrote reports on the feasibility of the manufacturing and assembly process</li>
              <li>Used and evaluated model-based definition programs for use in the manufacturing division to help integrate virtual GD&T</li>
              <li>Assisted in reactor assembly, working as FME monitor to maintain reactor integrity during assembly</li>
            </ul>
          </div>

          {/* Cyntergy */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Cyntergy</span>
              <span className="resume-entry__location">Tulsa, OK</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Refrigeration Intern</span>
              <span className="resume-entry__dates">May – August 2024</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Worked with Walmart to understand refrigeration needs and placement requirements (AutoCAD)</li>
              <li>Calculated loads based on the number of refrigerators being added and Walmart's requirements</li>
              <li>Used commercial programs to calculate pipe lengths and diameters to ensure correct pipe velocity and to avoid cavitation</li>
              <li>Planned the piping layout and equipment placements to comply with current stores without overloading existing structures (Revit)</li>
              <li>Helped integrate ammonium and carbon dioxide refrigerants into Walmart systems to reduce atmospheric degradation</li>
            </ul>
          </div>
        </section>

        {/* COMPETITION TEAM EXPERIENCE */}
        <section className="resume-section">
          <h3 className="resume-section__title">Competition Team Experience</h3>

          {/* Chief Engineer */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Liberty Rocketry</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Chief Engineer</span>
              <span className="resume-entry__dates">June 2024 – August 2025</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Created the vision of the team, setting the goals and objectives to meet competition requirements</li>
              <li>Held design reviews for the subteams, helping overcome any engineering problems, making sure objectives were met, and designs complied with competition rules and requirements</li>
              <li>Started a CFD section of the team, created watertight meshes and ran simulations to produce accurate drag data (ANSYS Fluent)</li>
              <li>Responsible for the altitude simulation systems; altitude error within 3% of 10,000 feet during competition (OpenRocket)</li>
              <li>Achieved a level 2 rocketry certification from Tripoli, building a high-power rocket with altimeters and a dual-stage separation system</li>
            </ul>
          </div>

          {/* Assistant Propulsion Team Lead */}
          <div className="resume-entry">
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Assistant Propulsion Team Lead</span>
              <span className="resume-entry__dates">June 2023 – May 2024</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Initiated and assisted in the design of a test stand that was built using steel angle, a load cell, and a commercial data capturing system</li>
              <li>Created a modular casing that used a phenolic liner, gaskets, and bolted sections to allow for different casing lengths</li>
              <li>Reviewed and edited mixing procedures for experimental fuel to check for safety and viability issues</li>
              <li>Manufactured different sections of the propulsion system and oversaw the assembly of the final system into the rocket</li>
            </ul>
          </div>

          {/* Nozzle Engineer */}
          <div className="resume-entry">
            <div className="resume-entry__role">
              <span className="resume-entry__role-title">Nozzle Engineer</span>
              <span className="resume-entry__dates">August 2022 – May 2023</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Designed a converging-diverging nozzle for an experimental rocket motor and casing (SolidWorks)</li>
              <li>Manufactured an initial test stand using aluminum extrusions, a load cell, and an Arduino; test fired small rocket motors for validation of the entire system</li>
              <li>Developed a script that analyzed different nozzle designs, mitigating the risk of casing over-pressurization (MATLAB)</li>
              <li>Successfully produced and fired an experimental propellant mixture that used sugar and potassium nitrate instead of standard Ammonium Perchlorate (OpenMotor)</li>
            </ul>
          </div>
        </section>

        {/* RESEARCH EXPERIENCE */}
        <section className="resume-section">
          <h3 className="resume-section__title">Research Experience</h3>

          {/* Honors Thesis */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Honors Thesis, Dr. Strasser</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title" style={{ fontStyle: 'italic' }}>
                Aerodynamic Performance of Grid Fins as High Lift Devices
              </span>
              <span className="resume-entry__dates">August 2025 – Present</span>
            </div>
            <ul className="resume-entry__bullets">
              <li>Researching how grid fins could be used as a high-lift device in aircraft</li>
              <li>Created a structured, quad dominated mesh with grid flap regions that can be activated or deactivated</li>
              <li>Programmed a script to automatically run variable angles of attack on a high-performance computer</li>
              <li>Processed data using a custom script for automatic data and contour exportation (Python and ParaView)</li>
              <li>Wrote a 65-page report on the results of the data along with implications of the research</li>
            </ul>
          </div>

          {/* Petition - Shobayo */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Petition, Dr. Shobayo</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title" style={{ fontStyle: 'italic' }}>
                CFD Analysis of a Solid Rocket Motor Casing with ANSYS Fluent
              </span>
              <span className="resume-entry__dates">August – December 2024</span>
            </div>
          </div>

          {/* Petition - Lugo */}
          <div className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">Petition, Dr. Lugo</span>
              <span className="resume-entry__location">Lynchburg, VA</span>
            </div>
            <div className="resume-entry__role">
              <span className="resume-entry__role-title" style={{ fontStyle: 'italic' }}>
                Understanding Python, ANSYS, and Generative AI: An Approach to Generative AI in ANSYS
              </span>
              <span className="resume-entry__dates">January – June 2025</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
