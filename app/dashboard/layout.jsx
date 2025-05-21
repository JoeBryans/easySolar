import { SideBar } from "@/components/dasboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { IsLogedIn } from "@/IslogedIn";
import { Link } from "lucide-react";
import React from "react";

const layout = ({ children }) => {
  const user = IsLogedIn();

  if (!user) {
    <Link href="/signIn"></Link>;
  }
  return (
    <SidebarProvider>
      <div className="w-full flex ">
        <div className=" ">
          <SideBar />
        </div>
        <main className=" w-full flex  ">
          <div className="block md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
