import sqlite3 from 'sqlite3';
// Open the database
const db = new sqlite3.Database('./food_database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Query the food table
db.serialize(() => {
    db.all(`SELECT * FROM food`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(`${row.nama_bahan}: ${row.energi} calories, ${row.lemak} g lemak `);
        });
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
});