import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  let profilelist = await prisma.PetProfile.findMany()

  return NextResponse.json(profilelist);
  
}