// pages/payment-success.js
import React from "react";

import PaymentSuccessCard from "../PaymentSuccessCard";

const PaymentSuccessPage = async ({ params }) => {
  const param = await params;
  const reference = param.ref;

  // const reference  = router.query; // Get the transaction reference from the URL query
  console.log("reference", reference);
  // In a real application, you'd likely fetch payment details using this reference
  // to ensure it's a valid and successful payment, then pass it to the card.
  // For this example, we'll just pass the query param directly.

  return <PaymentSuccessCard transactionRef={reference || "N/A"} />;
};

export default PaymentSuccessPage;
