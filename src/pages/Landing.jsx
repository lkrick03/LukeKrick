import { Link } from 'react-router-dom';
// Dynamically grab p1 image regardless of extension (.jpg, .png, etc.)
const p1Matches = import.meta.glob('../assets/p1.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const p1Bg = Object.values(p1Matches)[0] || '';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <img src={p1Bg} alt="Rocket Background Placeholder" className="hero__bg" />
        <div className="hero__content">
          <h1 className="hero__title">
            LUKE KRICK
          </h1>
          <p className="hero__subtitle">
            Engineer · Researcher · Rocket Enthusiast
          </p>
          <div className="hero__actions">
            <Link to="/projects" className="hero__btn hero__btn--primary">
              View Projects
            </Link>
            <Link to="/resume" className="hero__btn hero__btn--secondary">
              View Resume
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section className="stats">
        <div className="stats__inner">
          <div className="stat__item">
            <div className="stat__number">3.82</div>
            <div className="stat__label">GPA</div>
          </div>
          <div className="stat__item">
            <div className="stat__number">3+</div>
            <div className="stat__label">Years in Rocketry</div>
          </div>
          <div className="stat__item">
            <div className="stat__number">3</div>
            <div className="stat__label">Research Projects</div>
          </div>
          <div className="stat__item">
            <div className="stat__number">2</div>
            <div className="stat__label">Internships</div>
          </div>
        </div>
      </section>
    </div>
  );
}
