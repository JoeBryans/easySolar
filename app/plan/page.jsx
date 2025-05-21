import Container from "@/components/Container";
import PricingSection from "@/components/subscription/Plan";
import React from "react";

const page = () => {
  return (
    <div className="w-full  min-h-full flex flex-col">
      <Container>
        <div className="w-full  min-h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-zinc-800">Payment</h1>
          <div className="w-max-[500px] w-[90%] p-3 mx-auto  flex  flex-col  gap-5 ">
            <PricingSection />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
