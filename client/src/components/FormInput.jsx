import { useState } from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  success,
  placeholder,
  maxLength,
  children,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const getStatusIcon = () => {
    if (!value) return null;
    if (error) return <span className="status-icon error">✗</span>;
    if (success) return <span className="status-icon success">✓</span>;
    return null;
  };

  return (
    <div className="form-group-custom mb-3">
      <label className="form-label-custom">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-wrapper">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`form-control app-input ${error ? 'is-invalid' : success && value ? 'is-valid' : ''}`}
        />
        {getStatusIcon()}
        {isPassword && (
          <button
            type="button"
            className="btn-show-password"
            onClick={() => setShowPassword(p => !p)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {maxLength && (
        <div className="char-count">{value?.length || 0}/{maxLength}</div>
      )}
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {children}
    </div>
  );
};

export default FormInput;
