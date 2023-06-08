import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export async function GET() {
    let count = null;
    try {
        const ongoing = await prisma.item.aggregate({
            _count: {
                id: true,
            },
            where: {
                bidEndDate: {
                    gt: new Date()
                },
                deletedAt: null
            },
        })
        const completed = await prisma.item.aggregate({
            _count: {
                id: true,
            },
            where: {
                bidEndDate: {
                    lt: new Date()
                },
                deletedAt: null
            },
        })
        const ongoingCount = ongoing._count.id ? ongoing._count.id : 0;
        const completedCount = completed._count.id ? completed._count.id : 0;
        count = { ongoing: ongoingCount, completed: completedCount };
    } catch (e) {
        count = getPrismaError(e);
    }
    return NextResponse.json(count)
}