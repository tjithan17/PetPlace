import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request) {
  const loggedInData = await checkLoggedIn();

  if (loggedInData.loggedIn) {
    let photo = await request.json();
    let one = photo[0]
    const existingPetProfile = await prisma.PetProfile.findFirst({
      where: { userId: loggedInData.user.id },
    });
    if(existingPetProfile) {
        const existingPhotoGal = await prisma.PetPhoto.findFirst({
        where: { petProfileId: existingPetProfile.petId},
      })
      if(existingPhotoGal)
      {
        try {
          const photogal = await prisma.PetPhoto.create({
            data: {
              imageUrl: one,
              petProfileId: existingPetProfile.petId,
              location: existingPetProfile.location
            },
          });
          return NextResponse.json(photogal);
        } catch (error) {
          return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
        }
      }
      else {
        // Profile doesn't exist, create a new one
        try {
          const petphoto = await prisma.PetPhoto.create({
            data: {
             imageUrl: one,
              // imageUrl: "test",
              petProfileId: existingPetProfile.petId,
              location: existingPetProfile.location
            },
          });
          return NextResponse.json(petphoto);
        } catch (error) {
          return NextResponse.json({ error: 'Error creating profile' }, { status: 500 });
        }
      }
    }
  }

  return NextResponse.json({ error: 'Not signed in' }, { status: 403 });
}