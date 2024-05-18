/*
  Warnings:

  - A unique constraint covering the columns `[userId,sharedUserId,noteId]` on the table `Sharings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sharings_userId_sharedUserId_noteId_key" ON "Sharings"("userId", "sharedUserId", "noteId");
