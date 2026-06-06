import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET chapters by storyId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storyId = searchParams.get("storyId");

  return new Promise((resolve) => {
    db.all(
      "SELECT * FROM chapters WHERE story_id = ? ORDER BY id ASC",
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

// POST new chapter
export async function POST(req: Request) {
  const body = await req.json();

  return new Promise((resolve) => {
    db.run(
      "INSERT INTO chapters (story_id, title, content) VALUES (?, ?, ?)",
      [body.storyId, body.title, body.content],
      function (err) {
        if (err) {
          resolve(
            NextResponse.json({
              success: false,
              error: err.message,
            })
          );
          return;
        }

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