"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { setItem } from "@/hooks/store/localStorage";
import { useDispatch } from "react-redux";
import { setCredit } from "@/hooks/store/slice/userSlice";
import GetUser from "./GetUser";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();
  const user = data?.user;
  console.log(user);
  const dispatch = useDispatch();
  const [credite, setCredite] = useState(null);
  const path = usePathname();
  const startWith = path !== "/";
  useEffect(() => {
    if (!user) {
      return;
    } else {
      const FetchData = async () => {
        const res = await fetch("/api/credit");
        const credite = await res.json();
        console.log("credite", credite);

        dispatch(setCredit(credite));
        setItem("credit", credite);
        setCredite(credite);
      };
      FetchData();
    }
  }, [user]);
  return (
    <div className="w-full shadow">
      {startWith ? (
        <div className="max-w-[65rem]  w-[90%] flex flex-col mx-auto">
          <div className="navbar bg-base-100 justify-end ">
            <div className="flex-1 block md:hidden">
              <Logo />
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li className="text-lg font-demi-bold">
                  <GetUser />
                </li>
                <li className="text-lg font-demi-bold mx-3 hover:bg-transparent">
                  {user ? (
                    <div className="flex items-center gap-2 px-4">
                      <span>credite</span>
                      <span className="w-8 h-8 rounded-full shadow-lg drop-shadow-xl  flex items-center justify-center p-1">
                        {credite}
                      </span>
                    </div>
                  ) : null}
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
                    <Link
                      className="bg-zinc-300 px-2 rounded-lg "
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/signIn">Sign In</Link>
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
