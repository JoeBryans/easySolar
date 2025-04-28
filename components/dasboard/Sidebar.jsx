"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MdOutlineDashboard } from "react-icons/md";
import { CiMicrochip } from "react-icons/ci";
import { GrTemplate } from "react-icons/gr";
import { TbBrandDatabricks } from "react-icons/tb";

import Logo from "../header/Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Templates",
    url: "/dashboard/template",
    icon: <GrTemplate size={30} />,
  },
  {
    title: "Ai Tools",
    url: "/dashboard/ai-tools",
    icon: <CiMicrochip size={60} />,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: <TbBrandDatabricks />,
  },
];
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
export function SideBar() {
  const router = useRouter();
  const navigate = () => router.push("/dashboard/extimate");
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="w-full flex justify-center  mt-5">
              <Logo />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupLabel className="px-2 mt-10 w-full ">
            <Button
              variant={"outline"}
              onClick={navigate}
              className=" w-max     bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg py-2 text-background"
            >
              Create Videos with AI
            </Button>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-5">
            <SidebarMenu className=" flex flex-col gap-5 items-start px-2 ">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="w-full h-max hover:text-blue-600 flex font-semibold   gap-3"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
