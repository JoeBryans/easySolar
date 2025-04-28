import Container from "@/components/Container";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Container>
        <SignIn />
      </Container>
    </div>
  );
};

export default page;
