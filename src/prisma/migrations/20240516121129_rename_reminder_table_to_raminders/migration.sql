/*
  Warnings:

  - You are about to drop the `Reminder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reminder";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Reminders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "expire" DATETIME NOT NULL,
    CONSTRAINT "Reminders_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Notes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reminders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Reminders_noteId_key" ON "Reminders"("noteId");
