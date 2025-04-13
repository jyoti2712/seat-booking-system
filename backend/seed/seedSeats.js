import pool from '../config/db.js'; // Adjust the path as necessary

const seedSeats = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS seats (
        id SERIAL PRIMARY KEY,
        seat_number VARCHAR(5) UNIQUE NOT NULL,
        row_number CHAR(1) NOT NULL,
        is_booked BOOLEAN DEFAULT FALSE,
        booked_by INT REFERENCES users(id)
      );
    `);

    const rows = 'ABCDEFGHIJ';
    let seatCounter = 1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const seatsInRow = row === 'J' ? 3 : 7;
      for (let j = 1; j <= seatsInRow; j++) {
        const seatNumber = `${row}${j}`;
        await pool.query(
          'INSERT INTO seats (seat_number, row_number) VALUES ($1, $2) ON CONFLICT (seat_number) DO NOTHING',
          [seatNumber, row]
        );
        seatCounter++;
      }
    }

    console.log('Seeding completed!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedSeats();
