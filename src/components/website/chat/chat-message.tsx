"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'
interface imessage {
    content:string
    type:"ai"|"user",
    original_rag?:string,
    token_usage?:number,

}
const ChatMessage = ({data}:{data:imessage}) => {
  return (
    <div className={cn(
        'px-4 py-2 bg-muted-foreground/10  w-fit rounded-3xl ',
        data.type==="ai" ? "bg-blue-600 text-zinc-50 rounded-bl-none mr-auto":"rounded-br-none ml-auto"
    )}>
        <article className={`prose prose-slate max-w-none `}>
<ReactMarkdown
children={data.content}
remarkPlugins={[remarkGfm]}
rehypePlugins={[rehypeHighlight]}
// IMPORTANT: do NOT enable "rehype-raw" unless you sanitize the input.
// If you enable raw HTML and don't sanitize, you're asking for an XSS loud and proud.
/>
</article>
    </div>
  )
}

export default ChatMessage
