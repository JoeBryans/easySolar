// import { buffer } from "micro"; // Helps read raw body for webhook verification
import prisma from "@/lib/db";
import crypto from "crypto";
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
  const secret = process.env.PAYSTACK_SECRET_KEY;
  console.log("secret", secret);
  const signature = req.headers.get("x-paystack-signature");
  console.log("signature", signature);

  // Get the raw body buffer
  const rawBody = await req.text();
  // console.log("rawBody", rawBody);

  // const rawBody = await buffer(req);
  const body = rawBody.toString();
  console.log("body", body);
  // Verify the signature
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  console.log("hash", hash);
  if (hash === signature) {
    const event = JSON.parse(body);

    console.log(`Received Paystack Webhook Event: ${event.event}`);

    switch (event.event) {
      case "charge.success":
        // Payment was successful!
        const paymentData = event?.data;
        console.log("Webhook: Charge successful", paymentData);
        const metaData = paymentData?.metadata;
        const userId = metaData.userId;
        // console.log("Webhook: Metadata", metaData);
        // console.log("metaData: userId", userId);
        const validCredit = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            credit: true,
          },
        });
        const newCredit = validCredit.credit + metaData.credit;
        const credit = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            credit: newCredit,
          },
        });
        const payment = await prisma.payment.create({
          data: {
            amount: paymentData.amount,
            currency: paymentData.currency,
            paymentId: paymentData.id,
            reference: paymentData.reference,
            PaymentMethod: paymentData?.channel,
            status: paymentData.status,
            metadata: metaData,
            userId: metaData.userId,
          },
        });
        console.log("payment", payment);
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
