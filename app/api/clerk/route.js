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
  console.log("svixHeaders", svixHeaders);

  const payload = await req.json();

  const body = JSON.stringify(payload);
  try {
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
      try {
        const user = await userModel.create(userData);
        console.log("user", user);

        return NextResponse.json(user);
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "user.updated") {
      const user = await userModel.findOneAndUpdate(
        { _id: data.id },
        userData,
        {
          new: true,
        }
      );
      return NextResponse.json(user);
    }
    if (type === "user.deleted") {
      const user = await userModel.findOneAndDelete({ _id: data.id });
      return NextResponse.json(user);
    }

    return NextResponse.json("event recieved");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json("Internal Server Error", { status: 500 });
}

// //  switch (type) {
// //    case "user.create":
// //      await userModel.create(userData);
// //      return NextResponse.json(userData);
// //    case "user.updated":
// //      await userModel.findOneAndUpdate({ _id: data.id }, userData, {
// //        new: true,
// //      });
// //      return NextResponse.json(userData);
// //    case "user.deleted":
// //      await userModel.findOneAndDelete({ _id: data.id });
// //      return NextResponse.json("user deleted");
// //    default:
// //  }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

// export async function POST(req) {
//   if (!webhookSecret) {
//     console.error("WEBHOOK_SECRET is not set in the environment variables.");
//     return new NextResponse("Error: WEBHOOK_SECRET not configured", {
//       status: 500,
//     });
//   }

//   const payload = await req.json();
//   const svixId = await headers().get("svix-id");
//   const svixTimestamp = await headers().get("svix-timestamp");
//   const svixSignature = await headers().get("svix-signature");

//   if (!svixId || !svixTimestamp || !svixSignature) {
//     console.error("Missing Svix headers.");
//     return new NextResponse("Error: Missing Svix headers", { status: 400 });
//   }

//   const svixHeaders = {
//     "svix-id": svixId,
//     "svix-timestamp": svixTimestamp,
//     "svix-signature": svixSignature,
//   };
//   const wh = new Webhook(webhookSecret);

//   let event;

//   try {
//     event = wh.verify(payload, svixHeaders);
//     const { data, type } = event;

//     console.log("Webhook received:", type);
//     console.log("Webhook data:", data);

//     // Process your webhook event here
//     return new NextResponse("Webhook received successfully", { status: 200 });
//   } catch (err) {
//     console.error("Webhook verification error:", err);
//     if (
//       err instanceof Error &&
//       err.message.includes("Message timestamp too old")
//     ) {
//       return new NextResponse("Error: Message timestamp too old", {
//         status: 400,
//       });
//     } else {
//       return new NextResponse(`Webhook verification error: ${err}`, {
//         status: 400,
//       });
//     }
//   }

//   // Ensure a response is always returned (though the try...catch should handle this)
//   return NextResponse.json("Internal Server Error", { status: 500 });
// }
