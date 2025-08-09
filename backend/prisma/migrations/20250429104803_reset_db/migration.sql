-- CreateTable
CREATE TABLE "Crypto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN DEFAULT false,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);
