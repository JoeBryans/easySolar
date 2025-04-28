import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold  text-2xl text-transparent bg-gradient-to-r from-blue-600 to-purple-300 via-purple-600 bg-clip-text"
    >
      easySolar
    </Link>
  );
};

export default Logo;
