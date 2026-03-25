import { Link } from 'react-router-dom';
import p1Bg from '../assets/p1.jpg';
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
          <div className="hero__cta">
            <Link to="/projects" className="btn">
              View Projects
            </Link>
            <Link to="/resume" className="btn">
              View Resume
            </Link>
          </div>
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
