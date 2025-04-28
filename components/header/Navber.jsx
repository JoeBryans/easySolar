"use client";
import React from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  // get clerk user
  // const user = useUser();
  // console.log("user", user);

  const path = usePathname();
  const { user } = useUser();
  console.log("user", user);

  const startWith = path !== "/";
  return (
    <div className="w-full shadow">
      {startWith ? (
        <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto">
          <div className="navbar bg-base-100 justify-end ">
            <div className="flex-1">
              <Logo />
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="text-lg font-demi-bold">
                  {user ? <UserButton /> : <Link href="/sign-in">Sign In</Link>}
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
                  {user ? (
                    <Button variant={"outline"} className="w-max">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  ) : (
                    <Link href="/sign-in">Sign In</Link>
                  )}
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
