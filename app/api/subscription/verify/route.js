import Paystack from "paystack";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function GET(req) {
  const user = await getServerSession(authOptions);
  if (!user) {
    return NextResponse.json({ error: "You must be logged in to do this." });
  }

  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.searchParams);
  const reference = urlParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Transaction reference is required." });
  }

  try {
    const response = await paystack.transaction.verify(reference);
    // console.log("response", response);
    // const metaData = response?.data?.metadata;
    // if (response?.status && response?.data.status === "success") {
    //   const validCredit = await prisma.user.findUnique({
    //     where: {
    //       id: userId,
    //     },
    //     select: {
    //       credit: true,
    //     },
    //   });
    //   const newCredit = validCredit.credit + metaData.credit;
    //   const credit = await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       credit: newCredit,
    //     },
    //   });
    //   console.log("credit", credit);
    // } else {
    //   // Payment failed or is not yet successful

    //   return NextResponse.json({
    //     error: "Payment verification failed",
    //     data: response.data,
    //   });
    // }

    return NextResponse.json({ message: "Payment successful", data: response });
  } catch (error) {
    console.error("Error verifying Paystack transaction:", error);
    return NextResponse.json({ error: "Failed to verify transaction.", error });
  }
  // return NextResponse.json({ message: "Payment successful" });
}
