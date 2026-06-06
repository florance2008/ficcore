import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET single story (SAFE VERSION - بدون chapters فعلاً)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  return new Promise<Response>((resolve) => {
    db.get(
      "SELECT * FROM stories WHERE id = ?",
      [params.id],
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