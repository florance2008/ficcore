import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database.db");

// اتصال به دیتابیس
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("SQLite connected successfully.");
  }
});

db.serialize(() => {

  /* =========================
     USERS
  ========================= */
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
db.run(`
  ALTER TABLE stories ADD COLUMN chapters TEXT
`, (err) => {
  if (err) {
    console.log("chapters column already exists or error ignored:", err.message);
  } else {
    console.log("chapters column added");
  }
});
  /* =========================
     STORIES
  ========================= */
  db.run(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,
    cover TEXT,
    summary TEXT,
    content TEXT,
    author TEXT,
    fandom TEXT,
    main_couple TEXT,
    side_couples TEXT,
    type TEXT,
    relationship TEXT,
    genres TEXT,
    rating TEXT,
    status TEXT,
    chapters TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.run(`
  ALTER TABLE stories ADD COLUMN chapters TEXT
`, (err) => {
  if (err) {
    console.log("chapters column already exists or error ignored:", err.message);
  } else {
    console.log("chapters column added");
  }
});
  /* =========================
     CHAPTERS
  ========================= */
  db.run(`
    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      story_id INTEGER NOT NULL,
      title TEXT,
      content TEXT,
      chapter_number INTEGER,

      FOREIGN KEY (story_id) REFERENCES stories(id)
        ON DELETE CASCADE
    )
  `);
db.run(`
  ALTER TABLE stories ADD COLUMN chapters TEXT
`, (err) => {
  if (err) {
    console.log("chapters column already exists or error ignored:", err.message);
  } else {
    console.log("chapters column added");
  }
});
});

export default db;