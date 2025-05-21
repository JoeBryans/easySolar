import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const userId = body.userId;
  const verifyToken = body.verifyToken;
  // const { userId } = await params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        verifyToken: verifyToken,
      },
    });
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    const verifyUserToken = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        emailVerified: true,
      },
    });
    if (verifyUserToken.emailVerified) {
      return new NextResponse("User already verified", {
        status: 404,
      });
    }
    const verify = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
        verifyToken: null,
      },
    });
    const { password, ...rest } = verify;
    return NextResponse.json(rest);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch user.", error });
  }
}
