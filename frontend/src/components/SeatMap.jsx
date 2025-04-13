import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const SeatMap = ({ token }) => {
  const [seats, setSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);

  const fetchSeats = async () => {
    try {
      const res = await axios.get(`${API_URL}/seats`);
      setSeats(res.data);
    } catch (err) {
      alert('Failed to fetch seat data');
    }
  };

  const handleBooking = async () => {
    try {
      await axios.post(
        `${API_URL}/seats/book`,
        { seatCount: parseInt(seatCount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSeats();
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const rows = seats.reduce((acc, seat) => {
    acc[seat.row_number] = acc[seat.row_number] || [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  return (
    <div>
      <h3>Available Seats</h3>
      <div>
        <label>Number of seats to book (1-7): </label>
        <input
          type="number"
          min={1}
          max={7}
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
        />
        <button onClick={handleBooking}>Book</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {Object.entries(rows).map(([row, seatsInRow]) => (
          <div key={row} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <strong>{row}:</strong>
            {seatsInRow.map((seat) => (
              <div
                key={seat.id}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: seat.is_booked ? 'red' : 'green',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
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

export default SeatMap;
