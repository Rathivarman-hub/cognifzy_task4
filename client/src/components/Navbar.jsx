import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Form<span className="brand-accent">Validation</span></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center text-center gap-2 gap-lg-1 mt-3 mt-lg-0">
            <li className="nav-item w-100">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item w-100">
              <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register">Register</Link>
            </li>
            <li className="nav-item w-100">
              <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
            </li>
            <li className="nav-item w-100 ms-lg-2 d-flex justify-content-center justify-content-lg-start">
              <button
                className="btn theme-toggle-icon-btn d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <i className="bi bi-sun-fill fs-5"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill fs-5"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
