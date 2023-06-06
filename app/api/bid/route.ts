import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import { VERIFIED } from "@/helpers/constants";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function GET() {
    let bid = null;
    const auth = await verifyToken();
    if (auth === VERIFIED) {
        try {
            bid = await prisma.bid.findMany({
                where: {
                    deletedAt: undefined
                }
            })
        } catch (e) {
            bid = getPrismaError(e);
        }
    } else {
        bid = auth;
    }

    return NextResponse.json(bid)
}

export async function POST(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let createBid = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "itemId",
            "bidPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                createBid = await prisma.bid.create({
                    data: res
                })
            } catch (e) {
                createBid = getPrismaError(e);
            }
        } else {
            createBid = "Required fields are empty";
        }
    } else {
        createBid = auth;
    }
    return NextResponse.json(createBid);
}

export async function PATCH(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let updateBid = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "itemId",
            "bidPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                updateBid = await prisma.bid.update({
                    where: {
                        id: res.id,
                    },
                    data: res,
                })
            } catch (e) {
                updateBid = getPrismaError(e);
            }
        } else {
            updateBid = "Required fields are empty";
        }
    } else {
        updateBid = auth;
    }
    return NextResponse.json(updateBid);
}


export async function DELETE(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let deleteBid = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "id",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                deleteBid = await prisma.bid.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                })
            } catch (e) {
                deleteBid = getPrismaError(e);
            }
        } else {
            deleteBid = "Required fields are empty";
        }
    } else {
        deleteBid = auth;
    }
    return NextResponse.json(deleteBid);
}

