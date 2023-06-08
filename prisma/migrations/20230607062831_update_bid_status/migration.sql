-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('BID', 'WON', 'LOST');

-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "status" "BidStatus" NOT NULL DEFAULT 'BID';
