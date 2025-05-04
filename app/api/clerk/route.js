
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { userModel } from "@/lib/models/modes";
import connectDB from "@/lib/dataBase";

export async function POST(req) {
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
 // const headersPayload = req.headers;
  const headersPayload = await headers();
  // const svix = new Svix({
  //     apiKey: process.env.CLERK_API_KEY,
  //     webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
  //     environment: process.env.CLERK_ENVIRONMENT,
  // });
  const svixHeaders = {
    "svix-id": headersPayload.get("svix-id"),
    "svix-signature": headersPayload.get("svix-signature"),
    "svix-timestamp": headersPayload.get("svix-timestamp"),
    // "svix-webhook-id": headersPayload.get("svix-webhook-id"),
  };

  

  const payload = await req.json();

  const body = JSON.stringify(payload);
  console.log(body);
  const { data, type } = await wh.verify(body, svixHeaders);

  console.log("data", data);
  console.log("type", type);

  // user data
  const userData = {
    _id: data.id,
    userName: data.username,
    email: data.email_addresses[0].email_address,
    image: data.image_url,
  };

  // create user
  await connectDB();
  if (type === "user.create") {
    await userModel.create(userData);
    // return NextResponse.json(user);
  }
  if (type === "user.updated") {
    await userModel.findOneAndUpdate({ _id: data.id }, userData, {
      new: true,
    });
    // return NextResponse.json(user);
    // return NextResponse.json(userData);
  }
  if (type === "user.deleted") {
    await userModel.findOneAndDelete({ _id: data.id });
    // return NextResponse.json("user deleted");
  }
  return NextResponse.json("event recieved");
}
