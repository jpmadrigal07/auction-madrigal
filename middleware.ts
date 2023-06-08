import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { SPAM_MESSAGE } from "./helpers/constants";

const redis = new Redis({
    url: "https://glad-snake-37417.upstash.io",
    token: "AZIpACQgZDcwZjEyMmMtYzJmMi00NDA4LWExZTYtM2M1MDZiYjk0NmNkY2U0Nzk5ODJjZjNiNDllZDljZTE1MGNhYWExZDg5MmE=",
});

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(60, "60 s"),
});

export async function middleware(request: NextRequest) {
    const ip = request.ip ?? "127.0.0.1";
    let response = NextResponse.next()
    if (request.nextUrl.pathname.startsWith("/api")) {
        const { success } = await rateLimit.limit(
            ip
          );
        if (!success) {
            return NextResponse.json(SPAM_MESSAGE)
        }
    }
    return response
}