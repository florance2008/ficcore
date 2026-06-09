export const runtime = "nodejs";

import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET single story (SAFE VERSION - بدون تغییر logic)
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;

  return new Promise<Response>((resolve) => {
    db.get(
      "SELECT * FROM stories WHERE id = ?",
      [id],
      (err, story) => {
        if (err) {
          return resolve(
            NextResponse.json({
              success: false,
              story: null,
              error: "DB_ERROR",
            })
          );
        }

        if (!story) {
          return resolve(
            NextResponse.json({
              success: false,
              story: null,
              error: "NOT_FOUND",
            })
          );
        }

        resolve(
          NextResponse.json({
            success: true,
            story,
          })
        );
      }
    );
  });
}