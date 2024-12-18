/*
  Warnings:

  - Added the required column `PaymentStatus` to the `Instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instance" ADD COLUMN     "PaymentStatus" TEXT NOT NULL;
