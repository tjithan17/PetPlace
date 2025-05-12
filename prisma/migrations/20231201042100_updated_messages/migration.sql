/*
  Warnings:

  - A unique constraint covering the columns `[useroneId]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `useroneId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usertwoId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "useroneId" INTEGER NOT NULL,
ADD COLUMN     "usertwoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_useroneId_key" ON "ChatRoom"("useroneId");

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_useroneId_fkey" FOREIGN KEY ("useroneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
