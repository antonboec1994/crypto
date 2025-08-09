-- CreateTable
CREATE TABLE "Assets" (
    "id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "grow" BOOLEAN,
    "growPercent" INTEGER,
    "totalAmount" INTEGER,
    "totalProfit" INTEGER,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);
