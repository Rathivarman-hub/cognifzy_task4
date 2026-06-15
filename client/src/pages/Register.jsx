import { useState } from 'react';
import FormInput from '../components/FormInput';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import {
  validateFullName, validateEmail, validatePassword,
  validateConfirmPassword, validatePhone, validateDOB, validateGender
} from '../utils/validators';

const STEPS = ['Personal Info', 'Account Setup', 'Profile Details'];

const initialForm = {
  fullName: '', email: '', password: '', confirmPassword: '',
  phone: '', dob: '', gender: '', profilePicture: null,
};

const Toast = ({ message, type, onClose }) => (
  <div className={`app-toast app-toast-${type}`}>
    <span>{type === 'success' ? '✅' : '❌'} {message}</span>
    <button onClick={onClose} className="toast-close">×</button>
  </div>
);

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = (field, value) => {
    switch (field) {
      case 'fullName': return validateFullName(value);
      case 'email': return validateEmail(value);
      case 'password': return validatePassword(value);
      case 'confirmPassword': return validateConfirmPassword(value, form.password);
      case 'phone': return validatePhone(value);
      case 'dob': return validateDOB(value);
      case 'gender': return validateGender(value);
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files[0]) {
      setForm(f => ({ ...f, profilePicture: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
      return;
    }
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(err => ({ ...err, [name]: validate(name, value) }));
    }
    if (name === 'password' && touched.confirmPassword) {
      setErrors(err => ({ ...err, confirmPassword: validateConfirmPassword(form.confirmPassword, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(err => ({ ...err, [name]: validate(name, value) }));
  };

  const step1Fields = ['fullName', 'email'];
  const step2Fields = ['password', 'confirmPassword', 'phone'];
  const step3Fields = ['dob', 'gender'];

  const validateStep = (stepNum) => {
    const fields = stepNum === 1 ? step1Fields : stepNum === 2 ? step2Fields : step3Fields;
    const newErrors = {};
    const newTouched = {};
    fields.forEach(f => {
      newTouched[f] = true;
      newErrors[f] = validate(f, form[f]);
    });
    setTouched(t => ({ ...t, ...newTouched }));
    setErrors(err => ({ ...err, ...newErrors }));
    return fields.every(f => !newErrors[f]);
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v); });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/form/submit`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Registration successful! Welcome aboard 🎉');
        setForm(initialForm);
        setStep(1);
        setTouched({});
        setErrors({});
        setPreviewUrl(null);
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch {
      showToast('Server error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = (field) => touched[field] && !errors[field] && form[field];

  return (
    <div className="page-enter">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="app-card">
              <h2 className="card-heading mb-1">Create Account</h2>
              <p className="card-subheading mb-4">Step {step} of {STEPS.length} — {STEPS[step - 1]}</p>

              {/* Step Indicator */}
              <div className="step-indicator mb-4">
                {STEPS.map((s, i) => (
                  <div key={i} className={`step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''}`}>
                    <div className="step-circle">{i + 1 < step ? '✓' : i + 1}</div>
                    <span className="step-label">{s}</span>
                  </div>
                ))}
                <div className="step-line">
                  <div className="step-line-fill" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="form-step-animate">
                  <FormInput label="Full Name" name="fullName" value={form.fullName}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.fullName} success={isSuccess('fullName')}
                    placeholder="John Doe" maxLength={50} required />
                  <FormInput label="Email Address" type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.email} success={isSuccess('email')}
                    placeholder="john@example.com" required />
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="form-step-animate">
                  <FormInput label="Password" type="password" name="password" value={form.password}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.password} success={isSuccess('password')}
                    placeholder="Min 8 chars, 1 upper, 1 number, 1 special" required>
                    <PasswordStrengthBar password={form.password} />
                  </FormInput>
                  <FormInput label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.confirmPassword} success={isSuccess('confirmPassword')}
                    placeholder="Re-enter your password" required />
                  <FormInput label="Phone Number" name="phone" value={form.phone}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.phone} success={isSuccess('phone')}
                    placeholder="10-digit number" maxLength={10} required />
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="form-step-animate">
                  <FormInput label="Date of Birth" type="date" name="dob" value={form.dob}
                    onChange={handleChange} onBlur={handleBlur}
                    error={errors.dob} success={isSuccess('dob')} required />

                  <div className="form-group-custom mb-3">
                    <label className="form-label-custom">Gender <span className="text-danger">*</span></label>
                    <div className="input-wrapper">
                      <select name="gender" value={form.gender} onChange={handleChange} onBlur={handleBlur}
                        className={`form-control app-input ${errors.gender ? 'is-invalid' : isSuccess('gender') ? 'is-valid' : ''}`}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                  </div>

                  <div className="form-group-custom mb-3">
                    <label className="form-label-custom">Profile Picture</label>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleChange}
                      className="form-control app-input" />
                    {previewUrl && (
                      <div className="profile-preview mt-2">
                        <img src={previewUrl} alt="Preview" className="profile-preview-img" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="d-flex justify-content-between mt-4 gap-2">
                {step > 1 ? (
                  <button className="btn btn-outline-custom" onClick={prevStep}>← Back</button>
                ) : <div />}
                {step < 3 ? (
                  <button className="btn btn-primary-custom px-4" onClick={nextStep}>Next →</button>
                ) : (
                  <button className="btn btn-primary-custom px-4" onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <span><span className="spinner-border spinner-border-sm me-2" role="status" />Submitting…</span>
                    ) : 'Submit Registration'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
