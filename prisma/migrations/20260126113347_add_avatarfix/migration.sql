/*
  Warnings:

  - You are about to drop the column `avater` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avater",
ADD COLUMN     "avatar" TEXT;
