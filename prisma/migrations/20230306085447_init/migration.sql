/*
  Warnings:

  - Added the required column `end_date` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL;