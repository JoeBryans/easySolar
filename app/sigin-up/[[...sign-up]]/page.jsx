import Container from "@/components/Container";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Container>
        <SignUp />
      </Container>
    </div>
  );
};

export default page;
