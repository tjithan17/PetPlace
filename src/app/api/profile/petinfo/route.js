import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request) {
  const loggedInData = await checkLoggedIn();
  
  if (loggedInData.loggedIn) {
    let { petName, species, breed, age, vaxxed, sprayedNeutered, location, bio, profileImage } = await request.json();
    if(age === '...'){
      age = 0
    }
    else{
      age = parseInt(age)
    }
    const existingPetProfile = await prisma.PetProfile.findFirst({
      where: { userId: loggedInData.user.id },
    });
    if(existingPetProfile) {
      // Profile exists, update it
      try {
        const petInfo = await prisma.PetProfile.update({
          where: {
            petId: existingPetProfile.petId,
          },
          data: {
            petName: petName,
            species: species,
            breed: breed,
            age: age,
            vaxxed: vaxxed,
            sprayedNeutered: sprayedNeutered,
            location: location, // Assuming this field is in your schema
            bio: bio, // Assuming this field is in your schema
            profileImage: profileImage, // Assuming this field is in your schema
          },
        });
        return NextResponse.json(petInfo);
      } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
      }
    } else {
      // Profile doesn't exist, create a new one
      try {
        const newPetProfile = await prisma.PetProfile.create({
          data: {
            petName: petName,
            species: species,
            breed: breed,
            age: age,
            vaxxed: vaxxed,
            sprayedNeutered: sprayedNeutered,
            location: location, // Assuming this field is in your schema
            bio: bio, // Assuming this field is in your schema
            profileImage: profileImage, // Assuming this field is in your schema
            userId: loggedInData.user.id,
          },
        });
        return NextResponse.json(newPetProfile);
      } catch (error) {
        return NextResponse.json({ error: 'Error creating profile' }, { status: 500 });
      }
    }    
  }
  
  return NextResponse.json({ error: 'Not signed in' }, { status: 403 });
}
