import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import { VERIFIED } from "@/helpers/constants";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function GET() {
    let item = null;
    const auth = await verifyToken();
    if (auth === VERIFIED) {
        try {
            item = await prisma.item.findMany({
                where: {
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

export async function POST(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let createItem = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "userId",
            "name",
            "description",
            "origPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                createItem = await prisma.item.create({
                    data: res
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
    if (auth === VERIFIED) {
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
    if (auth === VERIFIED) {
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

