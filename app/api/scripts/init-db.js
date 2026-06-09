export const runtime = "nodejs";

import db from "../lib/database.js";

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      storyId INTEGER,
      title TEXT,
      content TEXT
    )
  `);

  console.log("chapters table created");
});