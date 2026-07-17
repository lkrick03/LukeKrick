import { Suspense } from 'react';
import RocketViewer from '../components/RocketViewer';
import '../components/RocketViewer.css';
import './Rocketry.css';

// Dynamically grab project images regardless of extension (.jpg, .png, etc.)
const allProjectImages = import.meta.glob('../assets/p*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const getProjectImg = (filenameWithoutExt) => {
  const matchingKey = Object.keys(allProjectImages).find(k => k.match(new RegExp(`/${filenameWithoutExt}\\.(jpg|jpeg|png|webp)$`, 'i')));
  return matchingKey ? allProjectImages[matchingKey] : '';
};

const sections = [
  {
    title: 'Chief Engineer',
    img: getProjectImg('p5'),
    bullets: [
      'Created the vision of the team, setting the goals and objectives to meet competition requirements',
      'Held design reviews for the subteams, helping overcome any engineering problems, making sure objectives were met, and designs complied with competition rules and requirements',
      'Started a CFD section of the team, created watertight meshes and ran simulations to produce accurate drag data (ANSYS Fluent)',
      'Responsible for the altitude simulation systems; altitude error within 3% of 10,000 feet during competition (OpenRocket)',
      'Achieved a level 2 rocketry certification from Tripoli, building a high-power rocket with altimeters and a dual-stage separation system',
    ],
  },
  {
    title: 'Assistant Propulsion Team Lead',
    img: getProjectImg('p6'),
    bullets: [
      'Initiated and assisted in the design of a test stand that was built using steel angle, a load cell, and a commercial data capturing system',
      'Created a modular casing that used a phenolic liner, gaskets, and bolted sections to allow for different casing lengths',
      'Reviewed and edited mixing procedures for experimental fuel to check for safety and viability issues',
      'Manufactured different sections of the propulsion system and oversaw the assembly of the final system into the rocket',
    ],
  },
  {
    title: 'Nozzle Engineer',
    img: getProjectImg('p11'),
    bullets: [
      'Designed a converging-diverging nozzle for an experimental rocket motor and casing (SolidWorks)',
      'Manufactured an initial test stand using aluminum extrusions, a load cell, and an Arduino; test fired small rocket motors for validation of the entire system',
      'Developed a script that analyzed different nozzle designs, mitigating the risk of casing over-pressurization (MATLAB)',
      'Successfully produced and fired an experimental propellant mixture that used sugar and potassium nitrate instead of standard Ammonium Perchlorate (OpenMotor)',
    ],
  },
];

export default function Rocketry() {
  return (
    <div className="exp-page">
      {/* 3D Model Hero */}
      <div className="rocketry-hero">
        <Suspense
          fallback={
            <div className="rocket-viewer">
              <div className="rocket-viewer__loading">
                <div className="rocket-viewer__spinner" />
                <span className="rocket-viewer__loading-text">Loading 3D Model</span>
              </div>
            </div>
          }
        >
          <RocketViewer />
        </Suspense>
      </div>

      <header className="exp-header">
        <span className="exp-header__label">Student-Led Competition Team — IREC</span>
        <h1 className="exp-header__title">Liberty Rocketry</h1>
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
            <h2 className="exp-section__title">{section.title}</h2>
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
