import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import FiftyTwoProjects from './pages/FiftyTwoProjects';
import Research from './pages/Research';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/52-projects" element={<FiftyTwoProjects />} />
        <Route path="/research" element={<Research />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
