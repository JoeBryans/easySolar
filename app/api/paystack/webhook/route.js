// import { buffer } from "micro"; // Helps read raw body for webhook verification
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Paystack from "paystack";

// Initialize Paystack with your secret key
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

// Disable default bodyParser to access the raw request body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  const user = getServerSession(authOptions);
  const userId = user?.user?.id;
  console.log("userId", userId);

  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = req.headers["x-paystack-signature"];

  // Get the raw body buffer
  const rawBody = await req.text();
  // const rawBody = await buffer(req);
  const body = rawBody.toString();

  // Verify the signature
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash === signature) {
    const event = JSON.parse(body);

    console.log(`Received Paystack Webhook Event: ${event.event}`);

    switch (event.event) {
      case "charge.success":
        // Payment was successful!
        console.log("Webhook: Charge successful", event.data);
        const validCredit = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            credit: true,
          },
        });
        const newCredit = validCredit.credit + 100;
        const credit = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            credit: newCredit,
          },
        });
        console.log("credit", credit);

        // THIS IS WHERE YOU SHOULD FULFILL THE ORDER, UPDATE YOUR DATABASE, ETC.
        break;
      case "charge.failed":
        // Payment failed
        console.log("Webhook: Charge failed", event.data);
        // Update payment status in your DB, notify user, etc.
        break;
      case "transfer.success":
        // A transfer to a bank account was successful
        console.log("Webhook: Transfer successful", event.data);
        break;
      case "transfer.failed":
        // A transfer to a bank account failed
        console.log("Webhook: Transfer failed", event.data);
        break;
      // Add other event types you want to handle (e.g., 'refund.success', 'subscription.create')
      default:
        console.log("Webhook: Unhandled event", event.event);
        break;
    }

    return NextResponse.json("Webhook received successfully");
  } else {
    console.error(
      "Webhook signature mismatch. Request likely not from Paystack."
    );
    return NextResponse.json("Invalid signature");
  }
}
