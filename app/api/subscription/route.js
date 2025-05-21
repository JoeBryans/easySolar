import { NextResponse } from "next/server";
import Paystack from "paystack";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function POST(req, res) {
  const body = await req.json();
  try {
    const { email, amount } = body; // Get payment details from the request

    const params = {
      email,
      amount: amount * 100, // Amount in kobo
      metadata: {
        name: "Customer Name", // Optional metadata
        phone: "123-456-7890",
      },
    };

    const response = await paystack.transaction.initialize(params);
    console.log("response", response);

    return NextResponse.json(response.data); // Return the authorization URL or payment reference
  } catch (error) {
    console.error("Paystack transaction initialization error:", error);
    return NextResponse.json({ error: "Failed to initialize transaction" });
  }
}
