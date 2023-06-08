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
                    gt: new Date()
                },
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                Bid: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            }
        })
    } catch (e) {
        item = getPrismaError(e);
    }
    return NextResponse.json(item)
}