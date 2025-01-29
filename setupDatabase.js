import sqlite3 from 'sqlite3';

// Create a new database or open an existing one
const db = new sqlite3.Database('./food_database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a new table for food data (only includes Energi, Protein, Lemak, KH)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kode TEXT NOT NULL,
        nama_bahan TEXT NOT NULL,
        energi REAL,
        protein REAL,
        lemak REAL,
        karbohidrat REAL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    // Insert data into the food table (only Energi, Protein, Lemak, KH)
    const stmt = db.prepare(`INSERT INTO food 
    (kode, nama_bahan, energi, protein, lemak, karbohidrat)
    VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run('AR021', 'Mi basah', 88.0, 0.6, 3.3, 14.0);
stmt.run('AR022', 'Mi kering', 339.0, 10.0, 1.7, 6.3);
stmt.run('AR023', 'Misoa', 345.0, 8.2, 2.2, 2.7);
stmt.run('AR024', 'Roti putih', 248.0, 1.2, 1.0, 50.0);
stmt.run('AR025', 'Tepung terigu', 333.0, 9.0, 0.3, 77.2);
stmt.run('AR026', 'Amparan tatak', 191.0, 1.3, 5.5, 34.0);
stmt.run('AR027', 'Apang kukus, kue', 202.0, 3.0, 0.3, 46.7);
stmt.run('AR028', 'Apem, kue', 148.0, 2.0, 0.5, 33.9);
stmt.run('AR029', 'Biskuit', 458.0, 14.4, 14.4, 75.1);
stmt.run('AR030', 'Bakpia, kue', 272.0, 8.7, 6.7, 44.1);
stmt.run('AR031', 'Bakwan', 280.0, 8.2, 2.3, 39.4);
stmt.run('AR032', 'Bantal', 303.0, 3.3, 3.4, 43.5);
stmt.run('AR033', 'Baruasa', 349.0, 6.5, 8.2, 79.3);
stmt.run('AR034', 'Batar daan', 191.0, 2.2, 2.2, 19.6);
stmt.run('AR035', 'Bika ambon', 51.5, 2.1, 1.5, 44.4);
stmt.run('AR036', 'Bingka', 273.0, 5.3, 5.3, 39.1);
stmt.run('AR037', 'Bobengka', 206.0, 5.3, 2.2, 45.2);
stmt.run('AR038', 'Bolu pecah', 56.6, 3.3, 4.6, 35.6);
stmt.run('AR039', 'Brem', 249.0, 3.4, 3.4, 58.0);
stmt.run('AR040', 'Bubur tinotuan (Manado)', 156.0, 2.3, 8.2, 15.6);
stmt.run('AR041', 'Cake tape', 140.0, 4.9, 1.4, 7.5);
stmt.run('AR042', 'Cangkung', 57.5, 3.1, 2.8, 65.9);
stmt.run('AR043', 'Dodol bali', 29.5, 3.7, 1.8, 76.1);
stmt.run('AR044', 'Dodol galamai', 27.5, 3.8, 3.8, 76.0);
stmt.run('AR045', 'Dodol kendong', 16.5, 3.6, 1.8, 65.0);


    stmt.finalize();
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
