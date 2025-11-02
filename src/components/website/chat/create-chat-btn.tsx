"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { Id } from '../../../../convex/_generated/dataModel'

const CreateChatBtn = ({id}:{id:string}) => {
        const m = useMutation(api.website.mutate.CreateChatFromWebsite)

  return (
    <div>
      <Button
      onClick={async()=>{
        m
        ({id:id as Id<"website_data">})
      }}
      >{id}</Button>
    </div>
  )
}

export default CreateChatBtn
