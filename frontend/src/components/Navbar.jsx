import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#f4f4f4' }}>
      <span style={{ marginRight: '20px', fontWeight: 'bold' }}>🚆 Train Seat Booking</span>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;