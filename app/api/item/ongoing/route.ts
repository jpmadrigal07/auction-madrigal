import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import { VERIFIED } from "@/helpers/constants";
const prisma = new PrismaClient();

export async function GET() {
    let item = null;
    const auth = await verifyToken();
    if (auth === VERIFIED) {
        try {
            item = await prisma.item.findMany({
                where: {
                    bidEndDate: {
                        gt: new Date()
                    },
                    deletedAt: undefined
                }
            })
        } catch (e) {
            item = getPrismaError(e);
        }
    } else {
        item = auth;
    }

    return NextResponse.json(item)
}