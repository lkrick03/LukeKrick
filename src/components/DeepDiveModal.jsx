import { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import CadSpinViewer from './CadSpinViewer';
import './DeepDiveModal.css';

export default function DeepDiveModal({ isOpen, onClose, data }) {
  const [activeTab, setActiveTab] = useState('specs');
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const {
    title,
    subtitle,
    category,
    overview,
    specs,
    charts,
    codeSnippets,
    cadNotes,
    cadImage,
    cadImageTitle,
    cadFileLocationNote,
    cadModelUrl,
    cadModelFileLocationNote,
    image,
    imageTitle,
    imageCaption,
    imageFileLocationNote,
    tables,
  } = data;

  const hasCadModel = Boolean(cadModelUrl || cadImage || cadFileLocationNote || cadModelFileLocationNote);
  const hasCharts = Boolean(charts && charts.length > 0);
  const hasImage = Boolean(image);
  const hasTables = Boolean(tables && tables.length > 0);
  const hasCodeSnippets = Boolean(codeSnippets && codeSnippets.length > 0);

  return (
    <div className="deep-dive-overlay" onClick={onClose}>
      <div
        className="deep-dive-modal"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click inside modal
      >
        {/* Header */}
        <div className="deep-dive-header">
          <div className="deep-dive-header__titles">
            <span className="deep-dive-badge">{category || 'Engineering Deep Dive'}</span>
            <h2 className="deep-dive-title">{title}</h2>
            {subtitle && <h4 className="deep-dive-subtitle">{subtitle}</h4>}
          </div>

          <button className="deep-dive-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Overview Banner */}
        {overview && (
          <div className="deep-dive-overview">
            <p>{overview}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="deep-dive-tabs">
          <button
            className={`deep-dive-tab ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            📊 {hasTables ? 'Specs & LLM Mesh Data' : hasCadModel && !hasCharts && !hasImage ? 'Specs & CAD Model' : hasImage && !hasCharts ? 'Specs & Visual Analysis' : 'Specs & Data'}
          </button>
          {hasCodeSnippets && (
            <button
              className={`deep-dive-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              💻 Code & Scripts
            </button>
          )}
          <button
            className={`deep-dive-tab ${activeTab === 'cad' ? 'active' : ''}`}
            onClick={() => setActiveTab('cad')}
          >
            📐 CAD & Hardware Notes
          </button>
        </div>

        {/* Tab 1: Specs & Charts / CAD Model / Images / Data Tables */}
        {activeTab === 'specs' && (
          <div className="deep-dive-content fade-in">
            {/* Specs Grid */}
            <h3 className="deep-dive-section-label">Key Engineering Specifications</h3>
            {specs && specs.length > 0 ? (
              <div className="specs-grid">
                {specs.map((item, idx) => (
                  <div key={idx} className="spec-card">
                    <span className="spec-label">{item.label}</span>
                    <span className="spec-value">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="deep-dive-placeholder">
                [LUKE NOTE]: Add specifications to <code>specs</code> array in <code>deepDiveData.js</code>.
              </p>
            )}

            {/* 3D Auto-Spinning CAD Model Section */}
            {hasCadModel && (
              <div className="deep-dive-cad-section" style={{ marginTop: '2rem' }}>
                <h3 className="deep-dive-section-label">
                  📐 {cadImageTitle || 'SolidWorks 3D CAD Model Assembly'}
                </h3>
                <CadSpinViewer
                  modelUrl={cadModelUrl}
                  fileLocationNote={cadModelFileLocationNote || cadFileLocationNote}
                />
              </div>
            )}

            {/* Simulation / Research Image Display */}
            {hasImage && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="deep-dive-section-label">
                  🖼️ {imageTitle || 'Simulation Visual & Analysis'}
                </h3>
                <div className="deep-dive-image-container" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                }}>
                  <img
                    src={image}
                    alt={imageTitle || 'Engineering Visual'}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '420px',
                      borderRadius: '8px',
                      objectFit: 'contain',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    }}
                  />
                  {imageCaption && (
                    <p style={{
                      marginTop: '0.85rem',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-secondary, #a0aec0)',
                      fontStyle: 'italic',
                    }}>
                      {imageCaption}
                    </p>
                  )}
                  {imageFileLocationNote && (
                    <div style={{
                      marginTop: '0.75rem',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-tertiary, #718096)',
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                    }}>
                      📁 {imageFileLocationNote}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Benchmark Data Tables */}
            {hasTables && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="deep-dive-section-label">
                  📋 Generative AI Meshing Comparison Data
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {tables.map((tbl, tIdx) => (
                    <div
                      key={tIdx}
                      className="deep-dive-table-wrapper"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      }}
                    >
                      <div
                        style={{
                          background: tbl.badgeColor || '#ff4d4d',
                          color: '#0d0f17',
                          padding: '0.65rem 1.25rem',
                          fontWeight: '800',
                          fontSize: '0.95rem',
                          letterSpacing: '1.2px',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>🤖 {tbl.model}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', opacity: 0.85 }}>
                          {tbl.rows?.length || 0} Test Runs
                        </span>
                      </div>
                      <div style={{ overflowX: 'auto' }}>
                        <table
                          style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.84rem',
                            textAlign: 'center',
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                              }}
                            >
                              {tbl.headers.map((h, hIdx) => (
                                <th
                                  key={hIdx}
                                  style={{
                                    padding: '0.75rem 0.85rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                    borderRight: hIdx < tbl.headers.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                  }}
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tbl.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                style={{
                                  borderBottom: rIdx === tbl.rows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                                  background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                                }}
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    style={{
                                      padding: '0.65rem 0.85rem',
                                      color: cIdx === row.length - 1
                                        ? cell.startsWith('-') ? '#ff6b6b' : cell === '0.67%' || parseFloat(cell) < 5 ? '#4ade80' : '#facc15'
                                        : 'rgba(255, 255, 255, 0.8)',
                                      fontWeight: cIdx === row.length - 1 ? '700' : '400',
                                      fontFamily: cIdx >= 2 ? 'SFMono-Regular, Consolas, monospace' : 'inherit',
                                      whiteSpace: 'nowrap',
                                      borderRight: cIdx < row.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                    }}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Charts (if any exist) */}
            {hasCharts && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="deep-dive-section-label">
                  Performance Data & Simulation Plot
                </h3>
                {charts.map((c, idx) => (
                  <InteractiveChart key={idx} chartData={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Code Snippets */}
        {hasCodeSnippets && activeTab === 'code' && (
          <div className="deep-dive-content fade-in">
            <h3 className="deep-dive-section-label">Code Snippets & Algorithm Implementations</h3>
            {codeSnippets && codeSnippets.length > 0 ? (
              codeSnippets.map((snippet, idx) => (
                <div key={idx} className="code-block-wrapper">
                  <div className="code-block-header">
                    <span className="code-filename">
                      📄 {snippet.filename || `snippet_${idx + 1}`}
                    </span>
                    <span className="code-lang-tag">{snippet.language || 'code'}</span>
                    <button
                      className="code-copy-btn"
                      onClick={() => handleCopyCode(snippet.code, idx)}
                    >
                      {copiedIdx === idx ? '✓ Copied' : 'Copy Code'}
                    </button>
                  </div>
                  {snippet.description && (
                    <p className="code-description">{snippet.description}</p>
                  )}
                  <pre className="code-pre">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="deep-dive-placeholder">
                [LUKE NOTE]: Add your code snippets to <code>codeSnippets</code> in <code>deepDiveData.js</code>.
              </p>
            )}
          </div>
        )}

        {/* Tab 3: CAD & Hardware Notes */}
        {activeTab === 'cad' && (
          <div className="deep-dive-content fade-in">
            <h3 className="deep-dive-section-label">Design, Manufacturing & Tolerances</h3>

            {hasCadModel && (
              <div style={{ marginBottom: '1.5rem' }}>
                <CadSpinViewer
                  modelUrl={cadModelUrl}
                  fileLocationNote={cadModelFileLocationNote || cadFileLocationNote}
                />
              </div>
            )}

            {cadNotes && cadNotes.length > 0 ? (
              <ul className="cad-notes-list">
                {cadNotes.map((note, idx) => (
                  <li key={idx} className="cad-note-item">
                    <span className="cad-note-icon">⚙️</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="deep-dive-placeholder">
                [LUKE NOTE]: Add CAD notes and manufacturing parameters to <code>cadNotes</code> in <code>deepDiveData.js</code>.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
