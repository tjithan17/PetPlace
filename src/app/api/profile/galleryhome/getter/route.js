import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const loggedInData = await checkLoggedIn();
  if(loggedInData.loggedIn){
    const getpetprofile = await prisma.PetProfile.findFirst({
        where: {userId: loggedInData.user.id},
        include: {
            petPhotos: true, // Include the associated pet photos
          },
    })
    if(getpetprofile){
        const photourls = getpetprofile.petPhotos.map((photo) => photo.imageUrl)
        return NextResponse.json(photourls)
    }

  }
  
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}