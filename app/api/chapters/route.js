import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET chapters
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const storyId = searchParams.get("storyId");

  return new Promise((resolve) => {
    db.all(
      "SELECT * FROM chapters WHERE storyId = ? ORDER BY id ASC",
      [storyId],
      (err, rows) => {
        resolve(
          NextResponse.json({
            chapters: rows || [],
          })
        );
      }
    );
  });
}

// POST chapter
export async function POST(req) {
  const body = await req.json();

  return new Promise((resolve) => {
    db.run(
      "INSERT INTO chapters (storyId, title, content) VALUES (?, ?, ?)",
      [body.storyId, body.title, body.content],
      function (err) {
        resolve(
          NextResponse.json({
            success: true,
            id: this.lastID,
          })
        );
      }
    );
  });
}