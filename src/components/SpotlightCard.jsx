import { useRef } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({ tag, title, description, onClick, children }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 116, 194, 0.12), transparent 40%)`;
  };

  return (
    <div
      className="spotlight-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="spotlight-card__glow" ref={glowRef} />
      <div className="spotlight-card__content">
        {tag && <span className="spotlight-card__tag">{tag}</span>}
        {title && <h3 className="spotlight-card__title">{title}</h3>}
        {description && <p className="spotlight-card__description">{description}</p>}
        {children}
        <div className="spotlight-card__footer">
          <span>View Details</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
