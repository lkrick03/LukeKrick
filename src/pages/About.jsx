import './About.css';

export default function About() {
  const skills = [
    { icon: '🔧', name: 'SolidWorks' },
    { icon: '💻', name: 'ANSYS Fluent' },
    { icon: '🐍', name: 'Python' },
    { icon: '📊', name: 'MATLAB' },
    { icon: '📐', name: 'AutoCAD' },
    { icon: '🏗️', name: 'Revit' },
    { icon: '🔬', name: 'ANSYS Mechanical' },
    { icon: '🎯', name: 'OpenRocket' },
    { icon: '🖥️', name: 'ParaView' },
    { icon: '📈', name: 'Data Analysis' },
    { icon: '⚙️', name: 'GD&T' },
    { icon: '🧪', name: 'FEA/CFD' },
  ];

  const interests = [
    {
      icon: '🚀',
      title: 'Rocketry',
      description: 'Building and testing high-power rockets with Liberty Rocketry competition team',
    },
    {
      icon: '✈️',
      title: 'Aerodynamics',
      description: 'Researching grid fins and high-lift devices through computational fluid dynamics',
    },
    {
      icon: '🔬',
      title: 'Research',
      description: 'Honors thesis on grid fin aerodynamics using ANSYS, Python, and HPC',
    },
    {
      icon: '🏭',
      title: 'Manufacturing',
      description: 'Hands-on experience in manufacturing engineering and reactor assembly',
    },
  ];

  return (
    <div className="page-wrapper about">
      {/* Hero */}
      <section className="about__hero">
        <p className="about__label">About Me</p>
        <h1 className="about__title">Driven by Curiosity.<br />Built for Engineering.</h1>
        <div className="about__bio">
          <p>
            I'm <strong>Luke Krick</strong>, a senior <strong>Honors Mechanical Engineering</strong> student at
            Liberty University with a passion for rocketry, aerodynamics, and computational simulation.
            My journey in engineering started with a deep fascination for SpaceX's grid fins, which
            eventually led me to research their application as high-lift devices for aircraft.
          </p>
          <p>
            Over the past four years, I've served as <strong>Chief Engineer</strong> of Liberty Rocketry,
            led propulsion teams, interned at <strong>BWXT</strong> working on nuclear reactor assembly,
            and developed custom propellant formulations. I combine hands-on fabrication with advanced
            simulation tools like ANSYS Fluent, Python scripting, and high-performance computing to
            solve complex engineering challenges.
          </p>
          <p>
            Whether it's designing a converging-diverging nozzle, running CFD simulations on a
            rocket motor casing, or building a custom test stand — I'm always looking for the next
            problem to solve.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section">
        <div className="skills-section__inner">
          <h2 className="skills-section__title">Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-chip">
                <span className="skill-chip__icon">{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="education-section">
        <div className="education-section__inner">
          <h2 className="education-section__title">Education</h2>
          <div className="education-card">
            <h3 className="education-card__school">Liberty University</h3>
            <p className="education-card__degree">Honors Mechanical Engineering</p>
            <div className="education-card__details">
              <span className="education-card__detail">
                GPA: <span>3.82 / 4.00</span>
              </span>
              <span className="education-card__detail">
                Location: <span>Lynchburg, VA</span>
              </span>
              <span className="education-card__detail">
                Expected: <span>May 2026</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="interests-section">
        <div className="interests-section__inner">
          <h2 className="interests-section__title">Areas of Focus</h2>
          <div className="interests-grid">
            {interests.map((interest) => (
              <div key={interest.title} className="interest-card">
                <div className="interest-card__icon">{interest.icon}</div>
                <h3 className="interest-card__title">{interest.title}</h3>
                <p className="interest-card__description">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
