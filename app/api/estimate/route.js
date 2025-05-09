import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const user = await getServerSession(authOptions);
  const body = await request.json();
  const { title, content } = body;
  const estim = content.map((item) => {
    return item.content;
  });
  console.log("content", content);
  console.log("estim", estim);

  console.log("user", user);
  const userId = user.user.id;

  console.log("id", userId);

  try {
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    const credit = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        credit: true,
      },
    });
    if (credit.credit === 0) {
      return new NextResponse("Credit not enough, please add credit", {
        status: 404,
      });
    }
    const extimate = await prisma.estimates.create({
      data: {
        title: title,
        content: estim,
        userId,
      },
    });
    if (extimate) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          credit: {
            decrement: 1,
          },
        },
      });
    }

    console.log("extimate", extimate);

    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error);
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const extimate = await estimateModel.find();
    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
