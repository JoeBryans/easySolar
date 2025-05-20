import React from "react";
import Container from "@/components/Container";
import { SignUp } from "@clerk/nextjs";
const page = () => {
  return (
    <div>
      <Container>
        <div className="flex items-center justify-center w-full h-full">
          <SignUp />
        </div>
      </Container>
    </div>
  );
};

export default page;
