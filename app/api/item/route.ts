import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    let item = null;
    const auth = await verifyToken();
    if (typeof auth === 'object') {
        if(itemId) {
            try {
                item = await prisma.item.findFirst({
                    where: {
                        id: Number(itemId),
                        deletedAt: undefined
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
        } else {
            try {
                item = await prisma.item.findMany({
                    where: {
                        deletedAt: undefined
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
        }
    } else {
        item = auth;
    }

    return NextResponse.json(item)
}

export async function POST(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let createItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "name",
            "description",
            "origPrice",
            "bidEndDate",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                createItem = await prisma.item.create({
                    data: {
                        name: res.name,
                        description: res.description,
                        origPrice: Number(res.origPrice),
                        bidEndDate: new Date(res.bidEndDate),
                        userId: auth.id,
                    }
                })
            } catch (e) {
                createItem = getPrismaError(e);
            }
        } else {
            createItem = "Required fields are empty";
        }
    } else {
        createItem = auth;
    }
    return NextResponse.json(createItem);
}

export async function PATCH(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let updateItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "userId",
            "name",
            "description",
            "origPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                updateItem = await prisma.item.update({
                    where: {
                        id: res.id,
                    },
                    data: res,
                })
            } catch (e) {
                updateItem = getPrismaError(e);
            }
        } else {
            updateItem = "Required fields are empty";
        }
    } else {
        updateItem = auth;
    }
    return NextResponse.json(updateItem);
}


export async function DELETE(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let deleteItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "id",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                deleteItem = await prisma.item.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                })
            } catch (e) {
                deleteItem = getPrismaError(e);
            }
        } else {
            deleteItem = "Required fields are empty";
        }
    } else {
        deleteItem = auth;
    }
    return NextResponse.json(deleteItem);
}

