"use client";
import React from "react";
import Container from "../Container";
import { Button } from "../ui/button";
// import { motion } from "framer-motion";
import Link from "next/link";
const Hero = () => {
  // bg - [#245A95]
  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 flex flex-col text-white">
      <Container>
        <div className="w-full flex flex-col items-center h-full mt-20 gap-4 ">
          <h1 className="font-bold text-8xl mb-5">AI Video Generator</h1>
          <span className="font-bold text-6xl mb-2 ">
            Turn Ideas into Videos in Minutes
          </span>
          <p className="font-semibold text-center text-xl ">
            Create stunning videos with Renderforest AI Video Generator. Just
            type your idea and watch our AI generate top-quality videos for you.
            Make Videos with AI now!
          </p>
          <div
            // initial={{ scale: 1 }}
            // animate={{ opacity: 1, scale: 1.2 }}
            // transition={{ ease: "easeOut" }}
            className="w-mx px-2 bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg py-2 border-2"
          >
            <Button className="bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer  ">
              <Link href="/dashboard">Generator Ai Video</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
