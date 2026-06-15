import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};

const NotFound = () => (
  <div className="page-enter text-center py-5 mt-5">
    <div style={{ fontSize: '4rem' }}>🔍</div>
    <h2 className="card-heading mt-3">404 — Page Not Found</h2>
    <p className="card-subheading">The page you're looking for doesn't exist.</p>
    <a href="/" className="btn btn-primary-custom mt-2">Go Home</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="app-wrapper">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="app-footer text-center py-3">
            <span className="card-subheading">© 2025 MERNStack App · Built with React + Express</span>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
