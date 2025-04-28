"use client";
import React from "react";
import { SignInButton } from "@clerk/nextjs";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  const startWith = path !== "/";
  return (
    <div className="w-full shadow">
      {startWith ? (
        <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto">
          <div className="navbar bg-base-100 justify-end ">
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="text-lg font-demi-bold">
                  <a>Link</a>
                </li>
                <li className="text-lg font-demi-bold">
                  <SignInButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto">
          <div className="navbar bg-base-100 ">
            <div className="flex-1">
              <Logo />
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="text-lg font-demi-bold">
                  <a>Link</a>
                </li>
                <li className="text-lg font-demi-bold">
                  <SignInButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
