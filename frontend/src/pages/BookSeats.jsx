import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const BookSeats = ({ token }) => {
  const [seats, setSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await axios.get(`${API_URL}/seats`);
      setSeats(res.data);
    } catch (err) {
      alert('Error fetching seats');
    }
  };

  const handleBooking = async () => {
    try {
      await axios.post(
        `${API_URL}/seats/book`,
        { seatCount: parseInt(seatCount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Seats booked successfully!');
      fetchSeats(); // Refresh seat map
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  const groupSeatsByRow = (seatsList) => {
    return seatsList.reduce((acc, seat) => {
      const row = seat.row_number;
      if (!acc[row]) acc[row] = [];
      acc[row].push(seat);
      return acc;
    }, {});
  };

  const seatGroups = groupSeatsByRow(seats);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Your Seats</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Number of seats to book (1–7): </label>
        <input
          type="number"
          min={1}
          max={7}
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
          style={{ width: '50px', margin: '0 10px' }}
        />
        <button onClick={handleBooking}>Book</button>
      </div>

      <div>
        {Object.entries(seatGroups).map(([row, rowSeats]) => (
          <div key={row} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ width: '30px' }}>{row}</strong>
            {rowSeats.map((seat) => (
              <div
                key={seat.seat_number}
                title={seat.seat_number}
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '5px',
                  backgroundColor: seat.is_booked ? '#ff4d4f' : '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                {seat.seat_number}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSeats;
