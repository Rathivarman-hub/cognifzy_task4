import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { navigate('/login'); return; }
    setUser(JSON.parse(stored));

    fetch(`${import.meta.env.VITE_API_URL}/api/form/data`)
      .then(r => r.json())
      .then(d => setAllUsers(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="page-enter">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h2 className="card-heading mb-0">Dashboard</h2>
            <p className="card-subheading mb-0">Logged in as {user.fullName}</p>
          </div>
          <button className="btn btn-outline-custom" onClick={logout}>Sign Out</button>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Registered Users', value: allUsers.length, icon: '👤' },
            { label: 'Your Email', value: user.email, icon: '📧' },
            { label: 'Phone', value: user.phone || '—', icon: '📞' },
            { label: 'Gender', value: user.gender || '—', icon: '🧬' },
          ].map((s, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="app-card">
          <h5 className="mb-3">All Registered Users</h5>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status" />
            </div>
          ) : allUsers.length === 0 ? (
            <p className="card-subheading text-center py-3">No users registered yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table app-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{u.fullName}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.gender}</td>
                      <td>{u.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
