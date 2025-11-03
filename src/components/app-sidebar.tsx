"use client"

import * as React from "react"
import {
  BookOpen,
  Command,
  EarthIcon,
  ReceiptIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/clerk-react"
import { useParams, usePathname } from "next/navigation"
import { NavWebsiteChats } from "./nav-website-chats"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Websites",
      url: "/website",
      icon: EarthIcon,
      isActive: true,
      items: [],
    },
    {
      title: "Billing",
      url: "/billing",
      icon: ReceiptIcon,
      items: [],
    },
    {
      title: "How to use",
      url: "/how-to-use",
      icon: BookOpen,
      items: [    ],
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const pathname = usePathname()

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex  aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">WebChat</span>
                  <span className="truncate text-xs">Free Plan</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
    {(pathname.includes('website') && params?.id)&&   <NavWebsiteChats/>}
      </SidebarContent>
      <SidebarFooter>
        <UserButton showName
        appearance={{
          elements:{
            rootBox:' w-full!',
            userButtonBox:'flex-row-reverse!   ',
            userButtonTrigger:''
          }
        }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
