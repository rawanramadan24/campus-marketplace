import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { fullName, email, phone, password, confirmPassword } = form;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return 'please fill in the all field';
    }
    if (!email.includes('@')) {
      return 'please enter the correct university email';
    }
    if (phone.length < 10) {
      return 'the number is incorrect';
    }
    if (password.length < 6) {
      return 'the password must contain at least 6 character';
    }
    if (password !== confirmPassword) {
      return 'the passwords donot match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage({ type: 'error', text: error });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u) => u.email === form.email)) {
        setMessage({ type: 'error', text: 'this email  already exists' });
        setLoading(false);
        return;
      }
      users.push(form);
      localStorage.setItem('users', JSON.stringify(users));

      setMessage({ type: 'success', text: 'created successfully' });

      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: 'an error occurred,please try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Join UniTrade</h2>
          <p>Campus Marketplace for Students</p>
        </header>

        {message.text && (
          <div className={`message-box ${message.type}`}>{message.text}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@std.cu.edu.eg"
              required
            />
          </div>

          <div className="form-group">
            <label>WhatsApp / Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="ENTER YOUR PHONE NUMBER"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <footer className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="btn-link">Login here</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Register;