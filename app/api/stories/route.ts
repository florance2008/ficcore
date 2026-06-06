import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET ALL STORIES
export async function GET() {
  return new Promise<Response>((resolve) => {
    db.all(
      "SELECT * FROM stories ORDER BY created_at DESC",
      [],
      (err, rows) => {
        if (err) {
          console.log("❌ GET ERROR:", err.message);

          resolve(
            NextResponse.json(
              { success: false, error: err.message },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              stories: rows,
            })
          );
        }
      }
    );
  });
}

// CREATE STORY
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      summary,
      content,
      chapters,
      genres,
      rating,
      status,
      author,
      cover,
      type,
      relationship,
      fandom,
      mainCouple,
      sideCouples,
    } = body;

    const finalChapters =
      chapters && Array.isArray(chapters) && chapters.length > 0
        ? chapters
        : [
            {
              title: "Chapter 1",
              content: content || "",
            },
          ];

    return new Promise<Response>((resolve) => {
      db.run(
        `INSERT INTO stories (
          title,
          cover,
          summary,
          content,
          author,
          fandom,
          main_couple,
          side_couples,
          type,
          relationship,
          genres,
          rating,
          status,
          chapters
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title || "",
          cover || "",
          summary || "",
          content || "",
          author || "",
          fandom || "",
          mainCouple || "",
          sideCouples || "",
          type || "",
          relationship || "",
          genres || "",
          rating || "",
          status || "",
          JSON.stringify(finalChapters),
        ],
        function (err) {
          if (err) {
            console.log("❌ DB ERROR:", err.message);

            resolve(
              NextResponse.json(
                { success: false, error: err.message },
                { status: 500 }
              )
            );
          } else {
            resolve(
              NextResponse.json({
                success: true,
                id: (this as any).lastID,
              })
            );
          }
        }
      );
    });
  } catch (error: any) {
    console.log("❌ API CRASH:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}