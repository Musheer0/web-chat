"use client"
import React, { useEffect, useRef } from 'react'
import ChatMessage from './chat-message'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'

const ChatMessages = ({id}:{id:Id<"chat">}) => {
    const {results, loadMore, isLoading} = usePaginatedQuery(api.website.chat.crud.GetPaginatedMessages,
        {chat_id:id},
        {
            initialNumItems:10
        }
    )
    const bottomDivRef = useRef<null|HTMLDivElement>(null);
    useEffect(()=>{
        if(bottomDivRef.current){
            bottomDivRef.current.scrollIntoView({behavior:"smooth"})
        }
    },[results])
  return (
    <div className='flex-1 overflow-hiddenx max-w-4xl mx-auto flex-col flex gap-4'>
             <Button onClick={()=>loadMore(10)}> more</Button>
     {results.reverse().map((e)=>{
        return (
            <React.Fragment key={e._id}>
                <ChatMessage
                data={{
                    content:e.content,
                    original_rag:e.original_rag_content,
                    type:e.type,
                    token_usage:e.token_usage
                }}
                />
            </React.Fragment>
        )
     })}
     {isLoading && <div>Loading...</div>}
     <div className='h-[180px]' ref={bottomDivRef}></div>
    </div>
  )
}

export default ChatMessages
