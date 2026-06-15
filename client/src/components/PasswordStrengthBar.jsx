import { getPasswordStrength } from '../utils/validators';

const PasswordStrengthBar = ({ password }) => {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;

  const pct = (score / 5) * 100;

  return (
    <div className="password-strength mt-2">
      <div className="strength-bar-track">
        <div
          className="strength-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color, transition: 'width 0.4s ease, background-color 0.4s ease' }}
        />
      </div>
      <span className="strength-label" style={{ color }}>
        {label}
      </span>
    </div>
  );
};

export default PasswordStrengthBar;
