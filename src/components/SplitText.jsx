import { useEffect, useRef } from 'react';

export default function SplitText({ text, className = '', delay = 50 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.split-char');
    if (!chars) return;

    chars.forEach((char, i) => {
      char.style.animationDelay = `${i * delay}ms`;
    });
  }, [text, delay]);

  return (
    <span className={`split-text ${className}`} ref={containerRef} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: `splitReveal 0.6s ease forwards`,
            animationDelay: `${i * delay}ms`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <style>{`
        @keyframes splitReveal {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(-40deg);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
      `}</style>
    </span>
  );
}
