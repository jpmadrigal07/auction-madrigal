import { NextRequest, NextResponse } from "next/server";
import rateLimiter from "./helpers/rateLimiter";
import { SPAM_MESSAGE } from "./helpers/constants";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next()
    if(request.nextUrl.pathname.startsWith("/api")) {
        if (!rateLimiter(request)) {
            return NextResponse.json(SPAM_MESSAGE);
        }
    }
    return response
}