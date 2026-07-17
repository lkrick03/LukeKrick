import './Projects.css';

// Dynamically grab project images regardless of extension (.jpg, .png, etc.)
const allProjectImages = import.meta.glob('../assets/p*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const getProjectImg = (filenameWithoutExt) => {
  const matchingKey = Object.keys(allProjectImages).find(k => k.match(new RegExp(`/${filenameWithoutExt}\\.(jpg|jpeg|png|webp)$`, 'i')));
  return matchingKey ? allProjectImages[matchingKey] : '';
};

const sections = [
  {
    title: 'Thrust Vector Control System',
    subtitle: '4 Inch Airframe',
    img: getProjectImg('p2'),
    bullets: [
      'Designed a mechanical gyro base that uses fully printed components to have two degrees of freedom up to ten degrees',
      'Through multiple iterations, interchangeable add-ons allow servos to be mounted onto the whole system using heat set inserts and 3mm SCH screws',
      'Whole assembly created in SolidWorks utilizing parametric design to account for 3D printing tolerance and design iterations',
      'Chose electronic components based on mechanical and electrical requirements. Chose servos, batteries, and a buck converter to adequately power servos',
      'Programmed RP2040 microcontroller in CircuitPython to move servos throughout the range of motion',
      'Assembled on breadboard to test the whole system to account for tilting sensors',
    ],
  },
  {
    title: 'Custom Mixed Solid Rocket Fuel and Test Stand',
    img: getProjectImg('p3'),
    bullets: [
      'Mixed potassium nitrate and granulated sugar to create a custom solid rocket fuel',
      'Created a custom test stand with an Arduino, amplifier, and load cell to measure thrust and burn time',
      'Used OpenMotor to create and simulate motor designs to analyse different potential motor mixtures',
    ],
  },
];

export default function Projects() {
  return (
    <div className="exp-page">
      <header className="exp-header">
        <span className="exp-header__label">Extra Projects</span>
        <h1 className="exp-header__title">Projects</h1>
      </header>

      {sections.map((section, idx) => (
        <section
          key={idx}
          className={`exp-section ${idx % 2 !== 0 ? 'exp-section--reverse' : ''}`}
        >
          <div className="exp-section__image">
            {section.img && (
              <img
                src={section.img}
                alt={section.title}
                className="exp-section__img"
              />
            )}
          </div>

          <div className="exp-section__text">
            <span className="exp-section__number">0{idx + 1}</span>
            <h2 className="exp-section__title">
              {section.title}
              {section.subtitle && <br />}
              {section.subtitle && <span style={{ fontSize: '0.6em', fontWeight: 400, letterSpacing: '2px', color: 'var(--color-text-secondary)' }}>{section.subtitle}</span>}
            </h2>
            <ul className="exp-section__bullets">
              {section.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
