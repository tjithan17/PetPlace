import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const data = await request.json();
  console.log(data)
  let userImage = '/goated.jpg'
  const { name, username, email, password } = data;
  if (name && username && email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
        user = await prisma.user.create({
        data: {name, username, email, password: hashedPassword, userImage}
      });
    } catch (e) {
      return NextResponse.json({error: e.message}, {status: 500 })
    }
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'Name, Username, Email or Password not defined' }, { status: 500 });
}