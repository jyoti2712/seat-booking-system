import pool from '../config/db.js'; 

const getSeats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seats ORDER BY row_number, seat_number');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
};

const bookSeats = async (req, res) => {
  const { seatCount } = req.body;
  const userId = req.user.userId;

  if (seatCount < 1 || seatCount > 7) {
    return res.status(400).json({ error: 'Seat count must be between 1 and 7' });
  }

  try {
    const result = await pool.query('SELECT * FROM seats WHERE is_booked = FALSE ORDER BY row_number, seat_number');
    const availableSeats = result.rows;

    let selectedSeats = [];
    const groupedSeats = availableSeats.reduce((acc, seat) => {
      acc[seat.row_number] = acc[seat.row_number] || [];
      acc[seat.row_number].push(seat);
      return acc;
    }, {});

    for (const row in groupedSeats) {
      if (groupedSeats[row].length >= seatCount) {
        selectedSeats = groupedSeats[row].slice(0, seatCount);
        break;
      }
    }

    if (selectedSeats.length === 0) {
      selectedSeats = availableSeats.slice(0, seatCount);
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const seat of selectedSeats) {
        await client.query(
          'UPDATE seats SET is_booked = TRUE, booked_by = $1 WHERE id = $2',
          [userId, seat.id]
        );
      }
      await client.query('COMMIT');
      res.json({ success: true, seats: selectedSeats });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Booking failed' });
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
};

export { getSeats, bookSeats };