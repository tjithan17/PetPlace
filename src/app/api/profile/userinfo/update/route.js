import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request) {
  const loggedInData = await checkLoggedIn();
  
  if (loggedInData.loggedIn) {
    let { profileImage } = await request.json();
    
    const existingPetProfile = await prisma.user.findFirst({
      where: { id: loggedInData.user.id },
    });
    if(existingPetProfile) {
      // Profile exists, update it
      try {
        const petInfo = await prisma.User.update({
          where: {
            id: existingPetProfile.id,
          },
          data: {
            userImage: profileImage
          },
        });
        return NextResponse.json(petInfo);
      } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
      }
    }   
  }
  
  return NextResponse.json({ error: 'Not signed in' }, { status: 403 });
}
