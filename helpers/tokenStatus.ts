import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

type Decoded = {
    id: number,
    email: string,
    iat: number,
    exp: number
}

const tokenStatus = async (token: string) => {
    let result = null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Decoded;
        const userCount = await prisma.user.count({ where: { id: decoded.id, email: decoded.email } });
        result = userCount ? `Verified` : `Token is invalid or expired`
    } catch (e) {
        result = getPrismaError(e);
    }
    return result;
};

export default tokenStatus;
