import { NextResponse } from "next/server";
import verifyToken from "@/helpers/verifyToken";
import rateLimiterMiddleware from "@/helpers/rateLimiterMiddleware";

export async function POST() {
  if (!rateLimiterMiddleware()) {
    return NextResponse.json({ message: 'Too Many Requests' });
  }
  let verify = await verifyToken();
  return NextResponse.json(verify);
}
