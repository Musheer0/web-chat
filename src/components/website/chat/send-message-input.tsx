"use client"
import { Button } from '@/components/ui/button'
import { useAction } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import Textarea from 'react-textarea-autosize'
import { SendIcon } from 'lucide-react'

const   SendMessageInput = ({id}:{id:Id<"chat">}) => {
  const m = useAction(api.website.chat.mutate.SendMsg)

  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = async()=>{
    if(!content.trim()) return
    try {
      setError(null)
      setLoading(true)
      await m({content,id})
      setContent("") // reset input after success
    } catch(err:any) {
      setError("bro backend skill issue happened")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col fixed left-1/2 -translate-x-1/2 bottom-5 gap-2 w-full bg-zinc-300 dark:bg-zinc-900 rounded-4xl max-w-3xl mx-auto px-6 p-3 pt-4'>
      {error && <p className='text-red-500 text-xs'>{error}</p>}

      <Textarea
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        className='resize-none'
        maxRows={6}
        placeholder='Ask Anything about the document'
        minRows={3} 
      />

      <Button
        disabled={loading}
        onClick={send}
        size='icon'
        className='ml-auto rounded-full'
      >
        <SendIcon className={loading ? "animate-spin" : ""}/>
      </Button>
    </div>
  )
}

export default SendMessageInput
