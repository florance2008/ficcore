import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) {
          resolve(
            NextResponse.json(
              { error: "Username already exists" },
              { status: 400 }
            )
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