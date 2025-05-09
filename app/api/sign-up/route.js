import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SendVerificationMail } from "@/lib/mailer";
// import { SendMail } from "@/lib/sendMail";

export async function POST(req) {
  const body = await req.json();
  const { email, password, name } = body;
  try {
    const existUser = await prisma.user.findUnique({ where: { email: email } });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists " },
        {
          status: 400,
        }
      );
    }

    const passwordHash = await bcrypt.hash(password ?? "", 10);
    const verifyToken = generateOTP().toString();
    const imageUrl = `https://avatar.iran.liara.run/username?username=${body.email}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // Expires in 1 day

    const user = await prisma.user.create({
      data: {
        ...body,
        image: imageUrl,
        password: passwordHash,
        verifyToken: verifyToken,
        emailVerified: false,
        verifyExpiresAt: expiresAt,
      },
    });
    console.log("user", user);
    SendVerificationMail(email, name, verifyToken);
    // SendMail(email, name, verifyToken);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

function generateOTP() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate and display the OTP
