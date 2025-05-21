import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./lib/auth";

export const IsLogedIn = () => {
  const user = getServerSession(authOptions);
  const currentUser = user?.user;

  return currentUser;
};
