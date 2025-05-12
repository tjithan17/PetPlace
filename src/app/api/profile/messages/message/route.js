import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const data = await request.json();
    const loggedInData = await checkLoggedIn();
    console.log(data)
    const { roomId, send, cont} = data;
    if(loggedInData.loggedIn){
        const getinfo = await prisma.User.findFirst({
            where: {id: loggedInData.user.id}
        })
        if (roomId && send && cont) {
        let mess;
        try {
            mess = await prisma.Messages.create({
            data: {messageRoomId: roomId, sender: send, content: cont}
            });
        } catch (e) {
            return NextResponse.json({error: e.message}, {status: 500 })
        }
        return NextResponse.json(mess);
        }
    }
    return NextResponse.json({ error: 'chatRoomId, sender, or content not defined' }, { status: 500 });
}
