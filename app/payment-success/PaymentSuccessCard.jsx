"use client";
import React from "react";
import { useRouter } from "next/navigation"; // If using Next.js for navigation
import Link from "next/link";

const PaymentSuccessCard = ({ transactionRef }) => {
  const router = useRouter(); // Initialize Next.js router

  const handleReturnToDashboard = () => {
    // Navigate to your dashboard page
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h2>

        <p className="text-gray-600 mb-2">
          Your transaction has been completed successfully.
        </p>

        {transactionRef && (
          <p className="text-gray-700 font-medium mb-6">
            Transaction Reference:{" "}
            <span className="text-blue-600">{transactionRef}</span>
          </p>
        )}

        <Link
          href={"/dashboard"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
