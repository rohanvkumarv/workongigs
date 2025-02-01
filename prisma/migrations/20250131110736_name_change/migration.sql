/*
  Warnings:

  - You are about to drop the column `deliveriesId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `Deliveries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deliveries" DROP CONSTRAINT "Deliveries_clientId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_deliveriesId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "deliveriesId",
ADD COLUMN     "deliveryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Deliveries";

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "PaymentStatus" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
