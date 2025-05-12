import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const loggedInData = await checkLoggedIn();
  if(loggedInData.loggedIn){
    const getinfo = await prisma.User.findFirst({
        where: {id: loggedInData.user.id}
    })
    if(getinfo){
        const getchat = await prisma.ChatRoom.findMany({
            where: {
                OR: [ 
                    {useroneId: getinfo.id},
                    {usertwoId: getinfo.id},
                ],
            },
        });
        if(getchat)
        {
            return NextResponse.json(getchat)
        }
        else
        {
            return NextResponse.json([])
        }
    }
    else{
      return NextResponse.json({status: "No user found"})
    }
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}

export async function POST(request) {
    const data = await request.json();
    const loggedInData = await checkLoggedIn();
    console.log(data)
    const { name, nameid} = data;
    if(loggedInData.loggedIn){
        const getinfo = await prisma.User.findFirst({
            where: {id: loggedInData.user.id}
        })
        const curname = getinfo.username
        const curid = getinfo.id
        if (name && nameid) {
        let chatR;
        try {
            chatR = await prisma.ChatRoom.create({
            data: {userone: curname, useroneId: curid, usertwo: name, usertwoId: nameid}
            });
        } catch (e) {
            return NextResponse.json({error: e.message}, {status: 500 })
        }
        return NextResponse.json(chatR);
        }
    }
    return NextResponse.json({ error: 'Name, Username, Email or Password not defined' }, { status: 500 });
}

export async function PUT(request) {
  const loggedInData = await checkLoggedIn();
  
  if (loggedInData.loggedIn) {
    const data = await request.json();
    const {mess , utwoId} = data;
    const existingChatRoom = await prisma.ChatRoom.findFirst({
      where: { useroneId: loggedInData.user.id , usertwoId: utwoId },
    });
    if(existingChatRoom) {

    try {
        const mess = await prisma.ChatRoom.update({
        where: {messageRoomId: existingChatRoom.chatRoomId},
        data: {
            messages: mess,
        },
        });
        return NextResponse.json(mess);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
    
}  
  }
  
  return NextResponse.json({ error: 'Not signed in' }, { status: 403 });
}