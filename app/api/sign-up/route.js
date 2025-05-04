import connectDB from "@/lib/dataBase";
import { userModel } from "@/lib/models/modes";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { username, email, password, image } = body;
  console.log("body", body);
  try {
    if (email) {
      return NextResponse.json({ message: "email already exist" });
    }

    await connectDB();
    const user = await userModel.create({
      userName: username,
      email: email,
      password: password,
      // "https://i.pinimg.com/originals/b4/c1/d1/b4c1d1b9d5a0f9e6f6e2f2a9f0a2e7a7e.jpg",
      image: image,
    });
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error);
  }
}
