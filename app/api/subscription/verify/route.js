import Paystack from "paystack";
import { NextResponse } from "next/server";
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function GET(req) {
  // get url params
  //  const param=URL
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.searchParams);
  const reference = urlParams.get("reference");
  console.log("url", url);
  console.log("urlParams", urlParams);
  console.log("reference", reference);

  if (!reference) {
    return NextResponse.json({ error: "Transaction reference is required." });
  }

  try {
    const response = await paystack.transaction.verify(reference);
    console.log("response", response);
    if (response?.status && response?.data.status === "success") {
      // Payment was successful!
      // IMPORTANT: Update your database here, fulfill the order, grant access, etc.
      console.log("Payment successful:", response.data);
    } else {
      // Payment failed or is not yet successful
      console.warn(
        "Payment verification failed or not successful:",
        response.data
      );
      return NextResponse.json({
        error: "Payment verification failed",
        data: response.data,
      });
    }

    return NextResponse.json({ message: "Payment successful", data: response });
  } catch (error) {
    console.error("Error verifying Paystack transaction:", error);
    return NextResponse.json({ error: "Failed to verify transaction.", error });
  }
  // return NextResponse.json({ message: "Payment successful" });
}
