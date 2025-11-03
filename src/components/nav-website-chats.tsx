"use client"

import { ChevronRight, MessageCircle, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { usePaginatedQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import React from "react"
import NavWebsiteChatCard from "./nav-website-chat-card"
import NavWebsiteChatCardSkeletonList from "./skeletons/sidebar-nav-chat-list-skeleton"
import { Button } from "./ui/button"

export function NavWebsiteChats() {
  const pathname = usePathname()
  const isActive = ()=> pathname.includes('/website') && pathname.includes('/chat');
  const params = useParams();
  const {results,isLoading,loadMore} = usePaginatedQuery(api.website.chat.crud.GetUserWebsiteChats,{
    webiste_id: params?.id as Id<"website_data">,
  
  },{initialNumItems:10});
  const isChatActive = (r:string)=>pathname.includes(r)
 if(isActive() && params?.id)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Website Chats</SidebarGroupLabel>
      <Link href={'/website/'+params.id}>
      <Button variant={'outline'} size={'sm'} className="w-full text-sm flex items-center justify-start">
       <MessageCircle/> New Chat 
        </Button></Link>
      <SidebarMenu>
      {results.map((r)=>{
        return (
          <React.Fragment key={r._id}>
            <NavWebsiteChatCard item={{
              name:r.name,
              created_at:r._creationTime,
              isActive:isChatActive(r._id),
              id:r._id,
              website_id:r.website_id
            }}/>
          </React.Fragment>
        )
      })}
      {isLoading && <NavWebsiteChatCardSkeletonList/>}
      </SidebarMenu>
    </SidebarGroup>
  )
}
