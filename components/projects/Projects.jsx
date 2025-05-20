"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbBrandDatabricks } from "react-icons/tb";

export default function ProjectsBar() {
  const [Content, setContent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/estimate");
      const data = await res?.json();
      setContent(data);
    };
    fetchData();
  }, []);
  const Title = Content.map((item, index) => {
    return (
      <Link
        key={index}
        href={`/dashboard/${item.id}`}
        className=" text-zinc-800 px-4 py-2 rounded-lg line-clamp-1"
      >
        {item.title}
      </Link>
    );
  });
  return (
    <DropdownMenu className="relative shadow-none">
      <DropdownMenuTrigger className="flex items-center gap-2">
        <TbBrandDatabricks />
        <span className="flex text-zinc-800 items-center gap-2 font-semibold text-sm">
          Projects <ChevronDown className="ml-2 h-4 w-4" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-5 mx-auto border-0 bg-transparent relative shadow-none">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup className="flex flex-col  ">
          {Title}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
