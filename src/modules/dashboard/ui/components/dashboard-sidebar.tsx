"use client";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="logo.svg" alt="Meet.AI" width={36} height={36} />
        </Link>
      </SidebarHeader>
    </Sidebar>
  );
};
