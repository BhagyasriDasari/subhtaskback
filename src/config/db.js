const sqlite3 = require('sqlite3').verbose();

// Open or create a database file
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create 'users' table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');
    }
  });

  // Create 'tasks' table
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'To Do',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err);
    } else {
      console.log('Tasks table created or already exists');
    }
  });

  // Insert a user into the 'users' table
  db.run(`INSERT INTO users (email, password_hash, is_verified) VALUES (?, ?, ?)`, ['user@example.com', 'hashed_password', 1], function(err) {
    if (err) {
      console.error('Error inserting user:', err);
    } else {
      console.log(`User inserted with ID: ${this.lastID}`);
    }
  });

  // Insert a task for a specific user
  db.run(`INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)`, [1, 'Task Title', 'Task description'], function(err) {
    if (err) {
      console.error('Error inserting task:', err);
    } else {
      console.log(`Task inserted with ID: ${this.lastID}`);
    }
  });
});

// Closing the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err);
  } else {
    console.log('Database connection closed');
  }
});
