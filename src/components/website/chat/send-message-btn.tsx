"use client"
import { Button } from '@/components/ui/button'
import { useAction } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'

const SendMessageBtn = ({id}:{id:Id<"chat">}) => {
    const m = useAction(api.website.chat.mutate.SendMsg)
  return (
    <div>
      <Button
      onClick={async()=>{
        await m({content:"how install firecrawl node sdk",id})
      }}
      >
        Test
      </Button>
    </div>
  )
}

export default SendMessageBtn
