/*
  Warnings:

  - Added the required column `icon` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "icon" TEXT NOT NULL;
