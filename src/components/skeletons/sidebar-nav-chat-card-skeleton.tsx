"use client"
import React from "react"
import { Collapsible } from "@/components/ui/collapsible"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

const NavWebsiteChatCardSkeleton = () => {
  return (
    <Collapsible asChild defaultOpen>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={false}>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-[4px]" />
            <Skeleton className="w-[80px] h-4" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default NavWebsiteChatCardSkeleton
