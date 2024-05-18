-- CreateTable
CREATE TABLE "ShortLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,
    CONSTRAINT "ShortLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShortLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Notes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
