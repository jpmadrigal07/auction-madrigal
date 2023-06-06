import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import { VERIFIED } from "@/helpers/constants";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function GET() {
    let deposit = null;
    const auth = await verifyToken();
    if (auth === VERIFIED) {
        try {
            deposit = await prisma.deposit.findMany({
                where: {
                    deletedAt: undefined
                }
            })
        } catch (e) {
            deposit = getPrismaError(e);
        }
    } else {
        deposit = auth;
    }

    return NextResponse.json(deposit)
}

export async function POST(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let createDeposit = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "userId",
            "deposit",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                createDeposit = await prisma.deposit.create({
                    data: res
                })
            } catch (e) {
                createDeposit = getPrismaError(e);
            }
        } else {
            createDeposit = "Required fields are empty";
        }
    } else {
        createDeposit = auth;
    }
    return NextResponse.json(createDeposit);
}

export async function PATCH(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let updateDeposit = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "userId",
            "deposit",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                updateDeposit = await prisma.deposit.update({
                    where: {
                        id: res.id,
                    },
                    data: res,
                })
            } catch (e) {
                updateDeposit = getPrismaError(e);
            }
        } else {
            updateDeposit = "Required fields are empty";
        }
    } else {
        updateDeposit = auth;
    }
    return NextResponse.json(updateDeposit);
}


export async function DELETE(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let deleteDeposit = null;
    if (auth === VERIFIED) {
        const requiredKeys = [
            "id",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                deleteDeposit = await prisma.deposit.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                })
            } catch (e) {
                deleteDeposit = getPrismaError(e);
            }
        } else {
            deleteDeposit = "Required fields are empty";
        }
    } else {
        deleteDeposit = auth;
    }
    return NextResponse.json(deleteDeposit);
}

