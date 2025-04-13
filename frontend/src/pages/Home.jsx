import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>🚆 Welcome to Train Seat Booking</h1>
      <p>Book your train seat conveniently and quickly.</p>
      <button style={styles.button} onClick={() => navigate('/book')}>
        Book Seats Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '50px',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '10px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#1890ff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Home;
