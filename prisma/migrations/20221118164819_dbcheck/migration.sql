-- CreateTable
CREATE TABLE "DatabaseCheck" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT DEFAULT E'NEW CHECK',

    CONSTRAINT "DatabaseCheck_pkey" PRIMARY KEY ("id")
);
