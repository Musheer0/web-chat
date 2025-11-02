"use client"
import { WebsiteMetadata } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Id } from '../../../convex/_generated/dataModel'
import { Button } from '../ui/button'
import { MessageCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'

const WebsiteCard = ({data,id}:{data:WebsiteMetadata,id:Id<"website_data">}) => {
  return (
    <Card key={id}
    className='w-[400px] relative  h-[200px] pb-0 flex overflow-hidden bg-cover border-0'
    style={{
        backgroundImage:`url(${data.banner})`
    }}
    >
    <Button size={'icon'} variant={'outline'} className='absolute cursor-pointer top-5 right-5'> 
    <MoreVertical/>
    </Button>
    <CardContent className='mt-auto h-fit flex items-end  justify-between gap-2 bg-linear-to-b to-black  pb-5'>
          <div className='flex flex-col gap-3'>
              <img src={data.favicon} width={50} height={50} alt="website favicon" className='rounded-full bg-primary p-0.5 shadow-2xl'/>
        <CardTitle className='line-clamp-2'>
            {data.title}
        </CardTitle>
          </div>
          <div className="actions">
            <Link href={`/website/${id}/chat`} className='cursor-pointer'>
            <Button size={'sm'} >
                New Chat <MessageCircle/>
            </Button>
            </Link>
          </div>
    </CardContent>
    </Card>
  )
}

export default WebsiteCard
