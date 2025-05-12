import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request, {params}) {
    const loggedInData = await checkLoggedIn();
    const chatid = parseInt(params.id)
    if(loggedInData.loggedIn){
      const getinfo = await prisma.User.findFirst({
          where: {id: loggedInData.user.id}
      })
      if(getinfo){
          const getChat = await prisma.ChatRoom.findFirst({
              where: {chatRoomId: chatid}
          })
          if(getChat)
          {
              const messages = await prisma.Messages.findMany({
                  where: {messageRoomId: getChat.chatRoomId}
              })
              if(messages)
              {
                  return NextResponse.json(messages)
              }
              else
              {
                return NextResponse.json([])
              }
          }
      }
      else{
        return NextResponse.json({status: "No user found"})
      }
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }