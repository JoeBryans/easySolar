"use client";
import { useState } from "react";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PricingSection from "./Plan";

const PaymentForm = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [selectPlan, setSelectPlan] = useState([]);
  console.log(selectPlan);

  const config = {
    reference: new Date().getTime().toString(), // Unique transaction reference
    email,
    amount: parseInt(amount) * 100, // Amount in kobo
    text: "Pay now",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Your Paystack Public Key
    metadata: {
      name: "Customer Name", // Optional metadata
      phone: "123-456-7890",
    },
  };

  const onSuccess = (reference) => {
    console.log("Payment successful:", reference);
    // Redirect to a success page or trigger a success message
    // Call your backend API to verify the transaction
    fetch(`/api/paystack/verify_transaction?reference=${reference.reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Payment successful") {
          alert("Payment successful!");
          // Handle successful payment (e.g., update UI, redirect)
        } else {
          alert("Payment failed.");
          // Handle failed payment
        }
      })
      .catch((error) => {
        console.error("Error verifying transaction:", error);
        alert("Error verifying transaction.");
      });
  };

  const onClose = () => {
    console.log("Payment closed!");
    // Handle payment cancellation
    alert("Payment window closed.");
  };

  const initializePayment = usePaystackPayment(config);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // You might want to perform client-side validation here

    // Instead of directly calling Paystack here,
    // you can first send the payment details to your backend
    // to initialize the transaction and get the authorization URL.

    try {
      const response = await fetch("/api/subscription/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: parseInt(amount) /* other metadata */,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error initializing transaction:", errorData);
        alert("Failed to initialize payment.");
        return;
      }

      const data = await response.json();
      // The `data` object from your backend should contain the authorization URL
      // or a reference that you can use with the Paystack Inline JavaScript.

      // If your backend returns an authorization URL:
      // window.location.href = data.authorization_url;

      // If your backend returns a reference, you can use the Paystack Hook:
      initializePayment(onSuccess, onClose);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <div className="w-max-[500px] w-[90%] p-3 mx-auto  flex  flex-col  gap-5 ">
      {!selectPlan ? (
        <PricingSection selectPlan={selectPlan} setSelectPlan={setSelectPlan} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-[500px] flex flex-col gap-5 shadow-lg rounded-2xl drop-shadow-xl px-4 py-8 "
        >
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount (in Naira):</Label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button
            variant={"outline"}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 bg-clip-text text-xl font-bold cursor-pointer  "
          >
            Pay Now
          </Button>
        </form>
      )}
      {/* <PaystackButton /> */}
    </div>
  );
};

export default PaymentForm;
