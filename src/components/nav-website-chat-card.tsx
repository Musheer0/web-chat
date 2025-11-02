"use client"
import React from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { Collapsible } from './ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
interface itemT{
    name:string,
    id:Id<"chat">,
    created_at:number,
    isActive:boolean,
    website_id:Id<"website_data">
}
const NavWebsiteChatCard = ({item}:{item:itemT}) => {
  return (
   <Collapsible key={item.name} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton 
              isActive={item.isActive}
              asChild tooltip={item.name}>
                <Link href={`/website/${item.website_id}/chat/${item.id}`}>
                  <MessageCircle/>
                  <span className='line-clamp-1'>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            
            </SidebarMenuItem>
          </Collapsible>
  )
}

export default NavWebsiteChatCard
