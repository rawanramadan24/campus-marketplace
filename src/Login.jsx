import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage]=useState('');
  const [isError,setIsError]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('please fill in all the fields');
      setIsError(true);
      return;
    }
    if(!email.includes('@')){
        setMessage('please enter a valid email');
        setIsError(true);
        return;
    }
    const users=JSON.parse(localStorage.getItem('users')||'[]');
    const foundUser =users.find((u)=> u.email===email && u.password===password);
    if(!foundUser){
        setMessage('invalid email or password');
        setIsError(true);
        return;
    }
    setIsError(false);
    console.log('Login:', { email, password });
    setMessage('login successful');
    localStorage.setItem('currentUser',JSON.stringify(foundUser));
    navigate('/profile'); 
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your UniTrade account</p>
        </header>

        {message && <div className="message-box">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your university email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <footer className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="btn-link">Register now</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;

