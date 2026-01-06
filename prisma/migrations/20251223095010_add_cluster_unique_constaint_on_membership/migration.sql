/*
  Warnings:

  - A unique constraint covering the columns `[projectId,userId]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "memberships_projectId_userId_key" ON "memberships"("projectId", "userId");
