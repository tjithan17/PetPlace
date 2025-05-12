import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request, { params }) {
    const id = parseInt(params.id);
    console.log("HERE")
    const getOther = await prisma.User.findFirst({
        where: {id: id}
    })
    if(getOther){
        console.log(getOther)
        return NextResponse.json(getOther);
    }
    else
    {
      return NextResponse.json({status: "No Profile"})
    }

    // return NextResponse.json({error: 'not signed in'}, {status: 403});

  }