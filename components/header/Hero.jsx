"use client";
import React from "react";
import Container from "../Container";
import { Button } from "../ui/button";
// import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
const Hero = () => {
  // bg - [#245A95]
  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 flex flex-col text-white">
      <Container>
        <div className="w-full flex flex-col items-center h-full mt-20 gap-4 ">
          <h1 className="font-bold lg:text-8xl md:text-4xl text-3xl mb-5">
            easySolar Calculation Generator
          </h1>
          <span className="font-bold lg:text-6xl md:text-3xl text-2xl mb-2 ">
            making your solar calculations and estimate easy and fast with{" "}
            <Logo />
          </span>
          <p className="font-semibold text-center md:text-xl  ">
            Generate solar panels, solar chargers, solar panels and solar
            chargers. <Logo /> is a powerful AI that can help you generate the
            size of solar panels, chargers controller, batteries quantity and
            estimated of the power to be generated.
          </p>
          <div
            // initial={{ scale: 1 }}
            // animate={{ opacity: 1, scale: 1.2 }}
            // transition={{ ease: "easeOut" }}
            className="w-mx px-2 bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg py-2 border-2"
          >
            <Button className="bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer  ">
              <Link href="/dashboard">GetStart</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
