/*
  Warnings:

  - You are about to drop the column `timeWindowHour` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `timeWindowMin` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `timeWindowSec` on the `Item` table. All the data in the column will be lost.
  - Added the required column `bidEndDate` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "timeWindowHour",
DROP COLUMN "timeWindowMin",
DROP COLUMN "timeWindowSec",
ADD COLUMN     "bidEndDate" TIMESTAMP(3) NOT NULL;
