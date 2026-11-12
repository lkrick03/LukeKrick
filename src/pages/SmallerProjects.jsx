import { useState } from 'react';
import { initialSmallerProjects } from '../data/smallerProjectsData';
import './SmallerProjects.css';

// Check for bundled assets in src/assets/ if user places images there
const bundledAssets = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg,webp,gif}', { eager: true, import: 'default' });

export const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Check if filename matches an asset inside src/assets/
  const filename = url.split('/').pop();
  const matchedKey = Object.keys(bundledAssets).find((k) => k.endsWith(`/${filename}`));
  if (matchedKey && bundledAssets[matchedKey]) {
    return bundledAssets[matchedKey];
  }

  // Otherwise resolve against Vite base URL (e.g. /LukeKrick/)
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (url.startsWith(baseUrl)) {
    return url;
  }
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;
  return `${cleanBase}${cleanPath}`;
};

export default function SmallerProjects() {
  const [projects] = useState(initialSmallerProjects);
  const [openProjects, setOpenProjects] = useState({});
  const [filter, setFilter] = useState('ALL');
  const [activePhoto, setActivePhoto] = useState(null);

  const toggleProject = (id) => {
    setOpenProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen = {};
    projects.forEach((p) => {
      allOpen[p.id] = true;
    });
    setOpenProjects(allOpen);
  };

  const collapseAll = () => {
    setOpenProjects({});
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return p.status === 'Completed';
    if (filter === 'IN_PROGRESS') return p.status === 'In Progress';
    if (filter === 'COMING_SOON') return p.status === 'Coming Soon';
    return true;
  });

  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const inProgressCount = projects.filter((p) => p.status === 'In Progress').length;
  const totalCount = projects.length;

  return (
    <div className="smaller-projects-page">
      <header className="exp-header">
        <span className="exp-header__label">Engineering & Software</span>
        <h1 className="exp-header__title">Smaller Projects</h1>
        <p className="smaller-projects-subtitle">
          A collection of smaller engineering, software, and hardware projects.
        </p>
      </header>

      <div className="smaller-projects-container">
        {/* Progress & Stats Bar */}
        <div className="smaller-projects-stats">
          <div className="stats-metric">
            <span className="metric-label">Project Progress</span>
            <span className="metric-value">{completedCount} <span className="metric-total">/ {totalCount}</span></span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${Math.max((completedCount / (totalCount || 1)) * 100, 2)}%` }}
            />
          </div>

          <div className="stats-badges">
            <span className="badge-pill badge--completed">{completedCount} Completed</span>
            <span className="badge-pill badge--in-progress">{inProgressCount} In Progress</span>
            <span className="badge-pill badge--coming-soon">{totalCount - completedCount - inProgressCount} Upcoming</span>
          </div>
        </div>

        {/* Toolbar: Filters & Accordion Controls */}
        <div className="smaller-projects-toolbar">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              All ({projects.length})
            </button>
            <button
              className={`filter-btn ${filter === 'COMPLETED' ? 'active' : ''}`}
              onClick={() => setFilter('COMPLETED')}
            >
              Completed ({projects.filter((p) => p.status === 'Completed').length})
            </button>
            <button
              className={`filter-btn ${filter === 'IN_PROGRESS' ? 'active' : ''}`}
              onClick={() => setFilter('IN_PROGRESS')}
            >
              In Progress ({projects.filter((p) => p.status === 'In Progress').length})
            </button>
            <button
              className={`filter-btn ${filter === 'COMING_SOON' ? 'active' : ''}`}
              onClick={() => setFilter('COMING_SOON')}
            >
              Coming Soon ({projects.filter((p) => p.status === 'Coming Soon').length})
            </button>
          </div>

          <div className="accordion-toggle-btns">
            <button className="text-action-btn" onClick={expandAll}>Expand All</button>
            <span className="divider">|</span>
            <button className="text-action-btn" onClick={collapseAll}>Collapse All</button>
          </div>
        </div>

        {/* Dropdowns List */}
        <div className="accordion-list">
          {filteredProjects.map((project) => {
            const isOpen = Boolean(openProjects[project.id]);

            return (
              <div 
                key={project.id} 
                className={`accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <div 
                  className="accordion-header"
                  onClick={() => toggleProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleProject(project.id);
                    }
                  }}
                >
                  <div className="accordion-header-left">
                    <span className="project-number">PROJECT #{project.paddedNumber}</span>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <div className="accordion-header-right">
                    <span className={`status-tag status--${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {project.status}
                    </span>
                    <span className="chevron-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="accordion-body">
                    <div className="accordion-body-inner">
                      <div className="project-meta">
                        <span className="meta-item"><strong>Date:</strong> {project.date}</span>
                        <span className="meta-item"><strong>Category:</strong> {project.category}</span>
                      </div>

                      <p className="project-summary">{project.summary}</p>
                      
                      {project.details && (
                        <div className="project-details-box">
                          <p>{project.details}</p>
                        </div>
                      )}

                      {project.notes && (
                        <div className="project-details-box">
                          <p>{project.notes}</p>
                        </div>
                      )}

                      {project.documents?.length > 0 && (
                        <div className="project-links">
                          {project.documents.map((document) => (
                            <a key={document.url} href={resolveAssetUrl(document.url)} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                              {document.title} →
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Key Engineering Specifications */}
                      {project.sources && project.sources.length > 0 && (
                        <div className="project-highlights">
                          <h4>Original Authors & Learning Resources</h4>
                          <ul>
                            {project.sources.map((source) => (
                              <li key={source.url}>
                                <a href={source.url} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                  {source.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.specs && project.specs.length > 0 && (
                        <div className="project-specs-section">
                          <h4 className="project-subheading">Key Specifications & Operating Parameters</h4>
                          <div className="project-specs-grid">
                            {project.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="project-spec-card">
                                <span className="spec-card-label">{spec.label}</span>
                                <span className="spec-card-value">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="project-highlights">
                          <h4>Key Highlights</h4>
                          <ul>
                            {project.highlights.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* CFD Tabulated Performance & Station Data */}
                      {(project.performanceResults || project.summaryData) && (
                        <div className="project-tables-section">
                          <h4 className="project-subheading">CFD Simulation Tabulated Results</h4>

                          {project.performanceResults && (
                            <div className="project-table-wrapper">
                              <div className="table-caption">
                                <strong>Table 6:</strong> Impeller Performance Results (ANSYS CFX Turbomachinery Fluid Flow)
                              </div>
                              <div className="table-scroll-container">
                                <table className="project-data-table">
                                  <thead>
                                    <tr>
                                      <th>Parameter</th>
                                      <th>Simulation Value</th>
                                      <th>Units</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {project.performanceResults.map((row, rIdx) => (
                                      <tr key={rIdx}>
                                        <td className="table-label">{row.parameter}</td>
                                        <td className="table-value font-mono">{row.value}</td>
                                        <td className="table-units">{row.units}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {project.summaryData && (
                            <div className="project-table-wrapper" style={{ marginTop: '1.25rem' }}>
                              <div className="table-caption">
                                <strong>Table 7:</strong> Station Solution Summary Data (Mass / Area Averaged)
                              </div>
                              <div className="table-scroll-container">
                                <table className="project-data-table station-table">
                                  <thead>
                                    <tr>
                                      <th>Quantity</th>
                                      <th>Inlet</th>
                                      <th>LE Cut</th>
                                      <th>TE Cut</th>
                                      <th>Outlet</th>
                                      <th>Δ (TE − LE)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {project.summaryData.map((row, rIdx) => (
                                      <tr key={rIdx}>
                                        <td className="table-label font-bold">{row.quantity}</td>
                                        <td className="table-val">{row.inlet}</td>
                                        <td className="table-val">{row.leCut}</td>
                                        <td className="table-val highlight-val">{row.teCut}</td>
                                        <td className="table-val">{row.outlet}</td>
                                        <td className="table-val delta-val">{row.teMinusLe}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Photos & CAD Renders Gallery */}
                      {(() => {
                        const rawItems = [
                          ...(Array.isArray(project.gallery) ? project.gallery : []),
                          ...(project.image ? [project.image] : []),
                          ...(Array.isArray(project.images) ? project.images : []),
                        ].filter(Boolean);

                        // Deduplicate items by image URL
                        const seen = new Set();
                        const items = rawItems.filter((item) => {
                          const s = typeof item === 'string' ? item : item.src;
                          if (!s || seen.has(s)) return false;
                          seen.add(s);
                          return true;
                        });

                        if (items.length === 0) return null;

                        return (
                          <div className="project-gallery">
                            <h4 className="project-gallery__heading">Photos & Simulation Figures</h4>
                            <div className={`project-gallery__grid ${items.length === 1 ? 'single-photo' : 'multi-photo'}`}>
                              {items.map((item, imgIdx) => {
                                const imgSrc = typeof item === 'string' ? item : item.src;
                                const imgTitle = (typeof item === 'object' && item.title) ? item.title : `${project.title} - Figure ${imgIdx + 1}`;
                                const resolvedSrc = resolveAssetUrl(imgSrc);
                                return (
                                  <div
                                    key={imgIdx}
                                    className="project-gallery__item"
                                    onClick={() => setActivePhoto({ src: resolvedSrc, title: imgTitle })}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setActivePhoto({ src: resolvedSrc, title: imgTitle });
                                      }
                                    }}
                                  >
                                    <img
                                      src={resolvedSrc}
                                      alt={imgTitle}
                                      loading="lazy"
                                      className="project-gallery__img"
                                    />
                                    <div className="project-gallery__overlay">
                                      <span>{imgTitle}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {project.tags && project.tags.length > 0 && (
                        <div className="project-tags">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="project-tag">{tag}</span>
                          ))}
                        </div>
                      )}

                      {(project.githubUrl || project.demoUrl) && (
                        <div className="project-links">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                              View GitHub Code →
                            </a>
                          )}
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-btn--secondary">
                              Live Demo →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Photos */}
      {activePhoto && (
        <div className="photo-lightbox" onClick={() => setActivePhoto(null)}>
          <div className="photo-lightbox__dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="photo-lightbox__close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="photo-lightbox__img"
            />
            <div className="photo-lightbox__footer">
              <span className="photo-lightbox__title">{activePhoto.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
