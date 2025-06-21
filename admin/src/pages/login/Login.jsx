import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAdmin) {
        history.push('/');
      } else {
        alert('Access denied. You are not an admin.');
        localStorage.removeItem('persist:root');
        window.location.reload();
      }
    }
  }, [currentUser, history]);

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(-45deg, #00c6ff, #0072ff, #0052cc, #00bfff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 10s ease infinite',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 40px',
      borderRadius: '16px',
      backgroundColor: 'white',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      width: '340px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#0072ff',
      letterSpacing: '1px',
    },
    input: {
      marginBottom: '20px',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      outline: 'none',
      transition: '0.3s',
    },
    inputFocus: {
      border: '1px solid #0072ff',
    },
    button: {
      padding: '12px',
      backgroundColor: '#0072ff',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: '0.3s',
    },
    buttonHover: {
      backgroundColor: '#005ce6',
    },
    error: {
      color: 'red',
      marginTop: '12px',
      textAlign: 'center',
      fontSize: '14px',
    },
    footer: {
      marginTop: '20px',
      fontSize: '12px',
      textAlign: 'center',
      color: '#777',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes gradient {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
      <form style={styles.form}>
        <h2 style={styles.title}>🔐 MyKart Admin Login</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleClick}
          disabled={isFetching}
        >
          {isFetching ? 'Logging in...' : 'Login'}
        </button>
        {error && (
          <span style={styles.error}>
            ❌ Login failed. Please check your credentials.
          </span>
        )}
        <div style={styles.footer}>Admin access only. Unauthorized users will be denied.</div>
      </form>
    </div>
  );
};

export default Login;
