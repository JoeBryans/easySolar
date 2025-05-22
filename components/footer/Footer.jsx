import React from "react";
import Container from "../Container";
import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
const SocialIcons = [
  {
    name: "Github",
    href: "https://github.com/easysolar",
    icon: GithubIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/easysolar",
    icon: TwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/easysolar",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/easysolar/",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/easysolar/",
    icon: FacebookIcon,
  },
];
const Footer = () => {
  return (
    <div className=" relative flex flex-col items-center justify-center py-4 bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer   text-background w-full ">
      <Container>
        <div className="flex flex-col items-center gap-5 justify-center  ">
          <div className="flex gap-4 items-center justify-center  ">
            <span className="text-white">© 2023 easySolar</span>
            <span className="text-white">All rights reserved</span>
          </div>
          <div className="flex gap-4 items-center justify-center   ">
            {SocialIcons.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-white/50 transition-all ease-in-out p-2 rounded-lg border-2 border-white min-w-10"
                >
                  <item.icon size={20} />
                  {/* {item.name} */}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
