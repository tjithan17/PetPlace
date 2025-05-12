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
        console.log(getinfo)
        return NextResponse.json(getinfo);
    }
    else{
      return NextResponse.json({status: "No user found"})
    }
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}