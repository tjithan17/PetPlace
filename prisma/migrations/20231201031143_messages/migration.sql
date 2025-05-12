-- CreateTable
CREATE TABLE "ChatRoom" (
    "chatRoomId" SERIAL NOT NULL,
    "userone" TEXT NOT NULL,
    "usertwo" TEXT NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("chatRoomId")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageId" SERIAL NOT NULL,
    "messageRoomId" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageId")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_messageRoomId_fkey" FOREIGN KEY ("messageRoomId") REFERENCES "ChatRoom"("chatRoomId") ON DELETE RESTRICT ON UPDATE CASCADE;
