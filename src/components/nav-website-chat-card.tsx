"use client"
import React from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { Collapsible } from './ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { MoreHorizontal, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useSiteTitlte } from '@/hooks/use-site-header'
import { useRouter } from 'next/navigation'
interface itemT{
    name:string,
    id:Id<"chat">,
    created_at:number,
    isActive:boolean,
    website_id:Id<"website_data">
}
const NavWebsiteChatCard = ({item}:{item:itemT}) => {
  const {setSiteTitle} = useSiteTitlte();
  const router = useRouter()
  return (
   <Collapsible key={item.name} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton 
              isActive={item.isActive}
              asChild tooltip={item.name}>
              <div className='flex items-center justify-between w-full'>
                  <Link 
                  onClick={(e)=>{
                    e.preventDefault();
                    setSiteTitle(item.name);
                      router.push( `/website/${item.website_id}/chat/${item.id}`)
                  }}
                  href={`/website/${item.website_id}/chat/${item.id}`} className='flex flex-1 items-center gap-3'>
                  <span className='line-clamp-1'>{item.name}</span>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}>
                  <MoreHorizontal/>
                </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className='cursor-pointer text-destructive '>
                     <DropdownMenuLabel className='flex-1 hover:text-destructive' >
                        Delete
                      </DropdownMenuLabel>
                      <Trash2Icon className='text-destructive' />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              </SidebarMenuButton>
            
            </SidebarMenuItem>
          </Collapsible>
  )
}

export default NavWebsiteChatCard
