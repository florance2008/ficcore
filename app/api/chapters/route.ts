export const runtime = "nodejs";

import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET chapters by storyId
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const storyId = searchParams.get("storyId");

  const chapters = await new Promise<any[]>((resolve) => {
    db.all(
      "SELECT * FROM chapters WHERE story_id = ? ORDER BY id ASC",
      [storyId],
      (err, rows) => {
        if (err) {
          resolve([]);
          return;
        }
        resolve(rows || []);
      }
    );
  });

  return NextResponse.json({ chapters });
}

// POST new chapter
export async function POST(req: Request): Promise<Response> {
  const body = await req.json();

  const id = await new Promise<number>((resolve) => {
    db.run(
      "INSERT INTO chapters (story_id, title, content) VALUES (?, ?, ?)",
      [body.storyId, body.title, body.content],
      function (err) {
        if (err) {
          resolve(-1);
          return;
        }
        resolve(this.lastID);
      }
    );
  });

  return NextResponse.json({
    success: id !== -1,
    id,
  });
}