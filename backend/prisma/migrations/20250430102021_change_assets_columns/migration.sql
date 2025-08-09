/*
  Warnings:

  - You are about to drop the column `grow` on the `Assets` table. All the data in the column will be lost.
  - You are about to drop the column `growPercent` on the `Assets` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Assets` table. All the data in the column will be lost.
  - You are about to drop the column `totalProfit` on the `Assets` table. All the data in the column will be lost.
  - Added the required column `name` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assets" DROP COLUMN "grow",
DROP COLUMN "growPercent",
DROP COLUMN "totalAmount",
DROP COLUMN "totalProfit",
ADD COLUMN     "name" TEXT NOT NULL;
