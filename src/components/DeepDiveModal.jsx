import { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
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

  const { title, subtitle, category, overview, specs, charts, codeSnippets, cadNotes } = data;

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
            📊 Specs & Data
          </button>
          <button
            className={`deep-dive-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            💻 Code & Scripts
          </button>
          <button
            className={`deep-dive-tab ${activeTab === 'cad' ? 'active' : ''}`}
            onClick={() => setActiveTab('cad')}
          >
            📐 CAD & Hardware Notes
          </button>
        </div>

        {/* Tab 1: Specs & Charts */}
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

            {/* Interactive Charts */}
            <h3 className="deep-dive-section-label" style={{ marginTop: '2rem' }}>
              Performance Data & Simulation Plot
            </h3>
            {charts && charts.length > 0 ? (
              charts.map((c, idx) => <InteractiveChart key={idx} chartData={c} />)
            ) : (
              <p className="deep-dive-placeholder">
                [LUKE NOTE]: Add chart datasets to <code>charts</code> array in <code>deepDiveData.js</code>.
              </p>
            )}
          </div>
        )}

        {/* Tab 2: Code Snippets */}
        {activeTab === 'code' && (
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
