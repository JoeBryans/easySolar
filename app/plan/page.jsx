import Container from "@/components/Container";
import Pay from "@/components/subscription/Pay";
import React from "react";

const page = () => {
  return (
    <div className="w-full  min-h-full flex flex-col">
      <Container>
        <div className="w-full  min-h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-zinc-800">Payment</h1>
          <div>
            <Pay />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
