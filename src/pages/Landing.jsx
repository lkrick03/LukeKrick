import { Link } from 'react-router-dom';
import SplitText from '../components/SplitText';
import CountUp from '../components/CountUp';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero__badge">
          <span>Mechanical Engineering</span>
        </div>

        <h1 className="hero__name">
          <SplitText text="Luke Krick" delay={80} />
        </h1>

        <p className="hero__tagline">
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

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights">
        <div className="highlights__inner">
          <div className="highlights__header">
            <p className="highlights__label">At a Glance</p>
            <h2 className="highlights__title">Engineering by the Numbers</h2>
          </div>
          <div className="highlights__grid">
            <div className="highlight-card">
              <div className="highlight-card__icon">🎓</div>
              <div className="highlight-card__value">
                <CountUp end={3.82} duration={2000} decimals={2} />
              </div>
              <div className="highlight-card__label">GPA</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card__icon">🚀</div>
              <div className="highlight-card__value">
                <CountUp end={3} duration={1500} suffix="+" />
              </div>
              <div className="highlight-card__label">Years in Rocketry</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card__icon">🔬</div>
              <div className="highlight-card__value">
                <CountUp end={3} duration={1500} />
              </div>
              <div className="highlight-card__label">Research Projects</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card__icon">💼</div>
              <div className="highlight-card__value">
                <CountUp end={2} duration={1500} />
              </div>
              <div className="highlight-card__label">Internships</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
