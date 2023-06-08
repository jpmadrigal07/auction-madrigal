import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export async function GET() {
    let item = null;
    try {
        item = await prisma.item.findMany({
            where: {
                bidEndDate: {
                    lt: new Date()
                },
                deletedAt: null
            },
            orderBy: {
                bidEndDate: 'desc',
            },
            include: {
                Bid: {
                    orderBy: {
                        bidPrice: 'desc'
                    },
                    take: 1,
                    include: {
                        user: true,
                    }
                },
            },
        })
    } catch (e) {
        item = getPrismaError(e);
    }
    return NextResponse.json(item)
}