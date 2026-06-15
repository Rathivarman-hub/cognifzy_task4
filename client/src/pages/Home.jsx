import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  const features = [
    { icon: '🛡️', title: 'Secure Auth', desc: 'Multi-step registration with real-time validation and strong password enforcement.' },
    { icon: '🎨', title: 'Night / Light Mode', desc: 'Seamless theme switching with preference saved in localStorage.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Optimised for mobile, tablet, and desktop using Bootstrap 5 grid.' },
    { icon: '⚡', title: 'Real-time Feedback', desc: 'Instant field validation, password strength meter, and animated toasts.' },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-section text-center py-5">
        <div className="container py-4">
          <div className="hero-badge mb-3">MERN Stack · MVC Architecture</div>
          <h1 className="hero-title mb-3">
            Build. Validate.<br />
            <span className="gradient-text">Register.</span>
          </h1>
          <p className="hero-subtitle mx-auto mb-4">
            A full-stack registration app with Express + React, real-time validation,
            multi-step forms, and a polished dual-theme UI.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/register" className="btn btn-primary-custom btn-lg px-4">
              Get Started →
            </Link>
            <Link to="/login" className="btn btn-outline-custom btn-lg px-4">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">What's inside</h2>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="feature-card h-100">
                  <div className="feature-icon">{f.icon}</div>
                  <h5 className="feature-title">{f.title}</h5>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <div className="cta-card mx-auto">
            <h3 className="mb-3">Ready to explore?</h3>
            <p className="mb-4">Create your account in under a minute with our guided 3-step wizard.</p>
            <Link to="/register" className="btn btn-primary-custom px-5">
              Start Registration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
