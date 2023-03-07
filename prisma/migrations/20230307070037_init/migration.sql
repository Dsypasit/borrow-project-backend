/*
  Warnings:

  - You are about to drop the column `email` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "user",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
