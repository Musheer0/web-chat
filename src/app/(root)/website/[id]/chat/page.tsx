import CreateChatInput from '@/components/website/chat/create-chat-input'
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'

const page =async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params
  return (
    <CreateChatInput id={id as Id<"website_data">}/>
  )
}

export default page
