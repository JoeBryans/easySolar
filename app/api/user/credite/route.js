import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req) {
  // get current user from clerk
  const user = await getServerSession(authOptions);
  const userId = user.user.id;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log("user", user);

  try {
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const userCredite = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const credite = userCredite.credit;
    console.log("credite", credite);

    return NextResponse.json(credite);
  } catch (error) {
    //   console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
