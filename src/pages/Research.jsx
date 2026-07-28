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
    subtitle: 'Senior Honors Thesis — Liberty University',
    featured: true,
    pdfUrl: `${import.meta.env.BASE_URL}LK_Final_Thesis_Draft.pdf`,
    img: getProjectImg('p8'),
    metrics: [
      '📄 71-Page Senior Honors Thesis',
      '🕸️ 1.2M+ Quad Mesh Cells (y+ < 3)',
      '⚡ Soft Post-Stall Drop (1.35 → 1.15)',
      '🖥️ "Totoro" HPC Cluster Automated',
    ],
    bullets: [
      'Researched how grid fins could be used as a high-lift device (flap) integrated with a NACA 2414 airfoil',
      'Created a structured, quad-dominated mesh with over 1.2 million cells and boundary layer y+ < 3 for k-omega SST modeling',
      'Programmed ANSYS Fluent Scheme journal scripts to automatically run angle-of-attack sweeps on an HPC cluster ("Totoro")',
      'Built a custom Python data pipeline to process 10,000-iteration force files using a sliding-window Coefficient of Variance (COV) algorithm',
      'Discovered that grid flaps cause earlier separation (~14° AoA) but cushion post-stall lift loss (retaining 85% peak lift) with a rising post-stall efficiency curve',
      'Authored a comprehensive 71-page Senior Honors Thesis detailing CFD methodologies, turbulence model comparisons, and post-stall aerodynamics',
    ],
  },
  {
    id: 'solid-rocket-casing-cfd',
    title: 'CFD Analysis of a Solid Rocket Motor Casing',
    subtitle: 'ANSYS Fluent',
    img: getProjectImg('p13'),
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
          className={`exp-section ${section.featured ? 'exp-section--featured' : ''} ${
            idx % 2 !== 0 ? 'exp-section--reverse' : ''
          }`}
        >
          <div className="exp-section__image">
            {section.img && (
              <img
                src={section.img}
                alt={section.title}
                className="exp-section__img"
              />
            )}
            {section.featured && (
              <div className="featured-thesis-overlay-badge">
                ★ FEATURED HONORS THESIS
              </div>
            )}
          </div>

          <div className="exp-section__text">
            {section.featured ? (
              <div className="featured-badge-pill">
                🏆 SENIOR HONORS THESIS (71 PAGES)
              </div>
            ) : (
              <span className="exp-section__number">0{idx + 1}</span>
            )}

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

            {/* Featured Metrics Row */}
            {section.metrics && (
              <div className="thesis-metrics-grid">
                {section.metrics.map((metric, mIdx) => (
                  <span key={mIdx} className="thesis-metric-chip">
                    {metric}
                  </span>
                ))}
              </div>
            )}

            <ul className="exp-section__bullets">
              {section.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <div className="exp-section__actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '1.75rem' }}>
              <button
                className="deep-dive-trigger-btn"
                onClick={() => setSelectedDeepDiveId(section.id)}
                style={{ margin: 0 }}
              >
                Explore Research Deep-Dive →
              </button>

              {section.pdfUrl && (
                <a
                  href={section.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deep-dive-trigger-btn thesis-pdf-action-btn"
                  style={{
                    margin: 0,
                    background: 'rgba(255, 77, 77, 0.15)',
                    borderColor: '#ff4d4d',
                    color: '#ffffff',
                    textDecoration: 'none',
                  }}
                >
                  📄 Read 71-Page Thesis (PDF)
                </a>
              )}
            </div>
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
