import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const user = await getServerSession(authOptions);

  const userId = user?.user?.id;

  try {
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    const credite = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        credit: true,
      },
    });

    return NextResponse.json(credite.credit);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error);
  }
}
