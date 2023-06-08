-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('FOR_BID', 'COMPLETED');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'FOR_BID';
