import Container from "@/components/Container";
import Hero from "@/components/header/Hero";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      {/* <div className="w-full  min-h-full flex flex-col">
        // banner
        <div className="flex flex-col items-center justify-center h-64  bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg  text-background">
          <div className="font-bold text-2xl w-96 text-center">
            <span className="text-white">Welcome To Your Creative Studio</span>
            <div className="flex gap-3 items-center mt-5 ">
              <Input
                className="w-full  text-white text-xl py-1 placeholder:text-white"
                placeholder="...Search"
              />
              <Search className=" text-white " size={35} />
            </div>
          </div>
        </div>
        <Container>content</Container>
      </div> */}
    </>
  );
};

export default page;
