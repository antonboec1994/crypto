/*
  Warnings:

  - You are about to drop the column `isDone` on the `Crypto` table. All the data in the column will be lost.
  - Added the required column `availableSupply` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketCap` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceBtc` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceChange1d` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceChange1h` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceChange1w` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSupply` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "growPercent" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalProfit" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Crypto" DROP COLUMN "isDone",
ADD COLUMN     "availableSupply" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contractAddress" TEXT,
ADD COLUMN     "decimals" INTEGER,
ADD COLUMN     "explorers" TEXT[],
ADD COLUMN     "marketCap" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceBtc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceChange1d" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceChange1h" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceChange1w" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "redditUrl" TEXT,
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD COLUMN     "totalSupply" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "websiteUrl" TEXT;
