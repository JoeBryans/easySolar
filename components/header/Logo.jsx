import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center font-bold  text-2xl text-transparent bg-gradient-to-r from-blue-600 to-purple-300 via-purple-600 bg-clip-text"
    >
      <div className="w-10 h-10 rounded-full">
        <Image
          src="/logo.png"
          alt="logo"
          width={400}
          height={400}
          className="object-cover"
        />
      </div>
      easySolar
    </Link>
  );
};

export default Logo;
