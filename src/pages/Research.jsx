import { useState } from 'react';
import DeepDiveModal from '../components/DeepDiveModal';
import { deepDiveData } from '../data/deepDiveData';
import './Research.css';
import './Projects.css'; // Shared experience styles

// Dynamically grab project images regardless of extension (.jpg, .png, etc.)
const allProjectImages = import.meta.glob('../assets/p*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const getProjectImg = (filenameWithoutExt) => {
  const matchingKey = Object.keys(allProjectImages).find(k => k.match(new RegExp(`/${filenameWithoutExt}\\.(jpg|jpeg|png|webp)$`, 'i')));
  return matchingKey ? allProjectImages[matchingKey] : '';
};

const sections = [
  {
    id: 'grid-fins-thesis',
    title: 'Grid Fins as a High Lift Device',
    subtitle: 'Honors Thesis — Comprehensive',
    img: getProjectImg('p8'),
    bullets: [
      'Researched how grid fins could be used as a high-lift device in aircraft',
      'Created a structured, quad dominated mesh with grid flap regions that can be activated or deactivated',
      'Programmed a script to automatically run variable angles of attack on a high-performance computer',
      'Processed data using a custom script for automatic data and contour exportation (Python and ParaView)',
      'Wrote a 65-page report on the results of the data along with implications of the research',
    ],
  },
  {
    id: 'solid-rocket-casing-cfd',
    title: 'CFD Analysis of a Solid Rocket Motor Casing',
    subtitle: 'ANSYS Fluent',
    img: getProjectImg('p3'),
    bullets: [
      'Researched how temperature is distributed through a rocket liner during a burn',
      'Created a high-quality mesh in ANSYS Fluent Meshing',
      'Solved for temperature distributions across the motor using ANSYS Fluent',
      'Authored a ten-page report on the findings and future research',
    ],
  },
  {
    id: 'pymechanical-ai',
    title: 'PyMechanical and AI Integration',
    img: getProjectImg('p9'),
    bullets: [
      'Did a semester of research on how AI could be incorporated into ANSYS',
      'Studied how generative AI models could decrease meshing time and increase meshing quality in ANSYS mechanical',
      'Created a Python script that would run different meshing parameters automatically in ANSYS using data from Generative AI models',
    ],
  },
];

export default function Research() {
  const [selectedDeepDiveId, setSelectedDeepDiveId] = useState(null);

  return (
    <div className="exp-page">
      <header className="exp-header">
        <span className="exp-header__label">Academic Activity</span>
        <h1 className="exp-header__title">Research</h1>
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
              {section.subtitle && (
                <span
                  style={{
                    fontSize: '0.6em',
                    fontWeight: 400,
                    letterSpacing: '2px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {section.subtitle}
                </span>
              )}
            </h2>
            <ul className="exp-section__bullets">
              {section.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <button
              className="deep-dive-trigger-btn"
              onClick={() => setSelectedDeepDiveId(section.id)}
            >
              Explore Research Deep-Dive →
            </button>
          </div>
        </section>
      ))}

      {/* Deep Dive Modal */}
      <DeepDiveModal
        isOpen={Boolean(selectedDeepDiveId)}
        onClose={() => setSelectedDeepDiveId(null)}
        data={deepDiveData[selectedDeepDiveId]}
      />
    </div>
  );
}
