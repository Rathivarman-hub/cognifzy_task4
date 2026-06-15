import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { validateEmail, validatePassword } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = (field, value) => {
    if (field === 'email') return validateEmail(value);
    if (field === 'password') return !value ? 'Password is required' : '';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validate('email', form.email);
    const passErr = validate('password', form.password);
    setErrors({ email: emailErr, password: passErr });
    setTouched({ email: true, password: true });
    if (emailErr || passErr) return;

    setLoading(true);
    // Demo: check against stored registrations
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/form/data`);
      const data = await res.json();
      const user = data.data?.find(u => u.email === form.email);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        showToast('Login successful! Redirecting…');
        setTimeout(() => navigate('/dashboard'), 1200);
      } else {
        showToast('No account found with that email.', 'error');
      }
    } catch {
      showToast('Server error. Make sure the server is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      {toast && (
        <div className={`app-toast app-toast-${toast.type}`}>
          <span>{toast.type === 'success' ? '✅' : '❌'} {toast.msg}</span>
          <button onClick={() => setToast(null)} className="toast-close">×</button>
        </div>
      )}

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <div className="app-card">
              <h2 className="card-heading mb-1">Welcome back</h2>
              <p className="card-subheading mb-4">Sign in to your account</p>

              <form onSubmit={handleSubmit} noValidate>
                <FormInput label="Email Address" type="email" name="email" value={form.email}
                  onChange={handleChange} onBlur={handleBlur}
                  error={errors.email} success={touched.email && !errors.email && form.email}
                  placeholder="john@example.com" required />
                <FormInput label="Password" type="password" name="password" value={form.password}
                  onChange={handleChange} onBlur={handleBlur}
                  error={errors.password} success={touched.password && !errors.password && form.password}
                  placeholder="Your password" required />

                <button type="submit" className="btn btn-primary-custom w-100 mt-2" disabled={loading}>
                  {loading ? <span><span className="spinner-border spinner-border-sm me-2" />Signing in…</span> : 'Sign In'}
                </button>
              </form>

              <p className="text-center mt-3 card-subheading">
                No account? <Link to="/register" className="link-accent">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
