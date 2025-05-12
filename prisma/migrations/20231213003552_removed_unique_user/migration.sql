-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_useroneId_fkey";

-- DropIndex
DROP INDEX "ChatRoom_useroneId_key";
