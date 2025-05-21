"use client";
import { SelectdPlan } from "@/hooks/store/slice/userSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "9",
    frequency: "/month",
    features: [
      "500 messages",
      "2GB storage",
      "Basic analytics",
      "Community support",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "29",
    frequency: "/month",
    features: [
      "Unlimited messages",
      "10GB storage",
      "Advanced analytics",
      "Priority email support",
      "Custom branding",
    ],
    isPopular: true, // Highlight this plan
  },
  {
    id: 3,
    name: "Premium",
    price: "59",
    frequency: "/month",
    features: [
      "All Pro features",
      "Unlimited storage",
      "Real-time analytics",
      "24/7 phone support",
      "Dedicated account manager",
    ],
    isPopular: false,
  },
];

function PricingCard({ plan }) {
  const [selectPlan, setSelectPlan] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  // const config = {
  //   reference: new Date().getTime().toString(), // Unique transaction reference
  //   email: user?.email,
  //   amount: parseInt(amount) * 100, // Amount in kobo
  //   text: "Pay now",
  //   publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Your Paystack Public Key
  //   metadata: {
  //     user: user?.name, // Optional metadata
  //     phone: user?.phone,
  //   },
  //   onSuccess: (reference) => {
  //     console.log("Payment successful:", reference);
  //     // Redirect to a success page or trigger a success message
  //     // Call your backend API to verify the transaction
  //     //   ?reference=${reference.reference}
  //     fetch(`/api/subscription/verify?reference=${reference.reference}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.message === "Payment successful") {
  //           router.push(`/payment-success/${reference.reference}`);
  //           // Handle successful payment (e.g., update UI, redirect)
  //         } else {
  //           alert("Payment failed.");
  //           // Handle failed payment
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error verifying transaction:", error.message);
  //         alert("Error verifying transaction.");
  //       });
  //   },

  //   onClose: () => {
  //     console.log("Payment closed!");
  //     // Handle payment cancellation
  //     alert("Payment window closed.");
  //   },
  // };
  const Selected = (plan) => {
    setSelectPlan(plan);
    dispatch(SelectdPlan(plan));
    router.push(`/payment`);
  };
  return (
    <>
      <div
        className={`relative bg-white rounded-lg shadow-xl p-8 flex flex-col ${
          plan.isPopular
            ? "border-4 border-blue-500 transform scale-105"
            : "border border-gray-200"
        }`}
      >
        {plan.isPopular && (
          <div className="absolute -top-3 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Most Popular
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h2>
        <p className="text-gray-600 mb-6">
          <span className="text-4xl font-extrabold text-gray-900">
            ${plan.price}
          </span>
          <span className="text-lg font-medium">{plan.frequency}</span>
        </p>
        <ul className="flex-grow space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          className={`mt-auto cursor-pointer w-full py-3 px-6 rounded-md text-lg font-semibold transition-colors duration-200 ${
            plan.isPopular
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
          onClick={() => Selected(plan)}
        >
          Select Plan
        </button>
      </div>
    </>
  );
}

function PricingSection({ selectPlan, setSelectPlan }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          //   selectPlan={selectPlan}
          //   setSelectPlan={setSelectPlan}
        />
      ))}
    </div>
  );
}

export default PricingSection;
