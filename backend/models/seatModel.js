import { pool } from '../db.js';

const createSeatsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS seats (
      id SERIAL PRIMARY KEY,
      seat_number VARCHAR(5) UNIQUE NOT NULL,
      row_number CHAR(1) NOT NULL,
      is_booked BOOLEAN DEFAULT FALSE,
      booked_by INT REFERENCES users(id)
    );
  `;
  await pool.query(query);
};

export default createSeatsTable;