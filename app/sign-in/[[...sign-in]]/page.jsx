import React from "react";
import { SignIn } from "@clerk/nextjs";
import Container from "@/components/Container";
const page = () => {
  return (
    <div>
      <Container>
        <div className="flex items-center justify-center w-full h-full">
          <SignIn />
        </div>
      </Container>
    </div>
  );
};

export default page;
