"use client"

import { useEffect, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { useAction, useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { useSiteTitlte } from "@/hooks/use-site-header"

export default function CreateChatInput({id}:{id:Id<"website_data">}) {
  const { user } = useUser()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const m = useAction(api.website.mutate.CreateChatFromWebsite)
  const website = useQuery(api.website.crud.GetWebsiteById,{id})
  const {setSiteTitle} = useSiteTitlte()
  useEffect(()=>{
    if(website===null) return ;
    if(website){
      setSiteTitle(website.metadata.title);
    }
  },[website])
  if(website===undefined){
    return 'loading'
  }
  if(!website )
    return 'not found'
  return (
    <div className="w-full h-full flex flex-col items-center justify-center  gap-10">
      <h1 className="text-3xl font-semibold text-neutral-300">
        Good to see you, {user?.firstName || "User"}.
      </h1>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {loading && <p className="text-neutral-400 text-sm">creating chat…</p>}

      <form 
        className="w-full max-w-3xl"
        onSubmit={async(e) => {
          e.preventDefault()
          setError("")
          setLoading(true)
          try {
            const chatId = await m({msg:message,websiteId:id})
            router.push(`/website/${id}/chat/${chatId}`)
          } catch (err:any) {
            setError("bro convex literally blew up. try again.")
          } finally {
            setLoading(false)
          }
        }}
      >
        <div className="rounded-full bg-neutral-900 border border-neutral-700 px-6 py-3 flex items-center">
          
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            disabled={loading}
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            placeholder="Ask anything about the website you selected"
            className="flex-1 bg-transparent outline-none resize-none text-base"
          />

          <Button
            size={'icon'}
            type="submit"
            disabled={loading || message.length < 1}
            className="cursor-pointer rounded-full"
          >
            <SendIcon/>
          </Button>
        </div>
      </form>
    </div>
  )
}
