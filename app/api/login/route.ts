export const runtime = "nodejs";

import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST(req: Request) {
  const { username, password } = await req.json();

 return new Promise<Response>((resolve) => {
    db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, row) => {
        if (err) {
          resolve(
            NextResponse.json(
              { error: "Database error" },
              { status: 500 }
            )
          );
          return;
        }

        if (!row) {
          resolve(
            NextResponse.json(
              { error: "Invalid username or password" },
              { status: 401 }
            )
          );
          return;
        }

        resolve(
          NextResponse.json({
            success: true,
            username,
          })
        );
      }
    );
  });
}