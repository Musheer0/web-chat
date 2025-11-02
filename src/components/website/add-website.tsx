"use client"
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { useAction } from 'convex/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {toast} from 'sonner'
 const AddWebsite = ({children}:{children:React.ReactNode}) => {
        const action = useAction(api.website.mutate.saveWebsite);

const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const onSubmit = async () => {
  try {
    toast.loading("Adding website",{id:url})
    setIsLoading(true)
    setError(null)
    await action({ url })
    setUrl('')
    toast.dismiss(url)
    // success -> close modal or reset input idc
  } catch (e: any) {
    setError(e.message);
    toast.error(e.message)
  } finally {
    setIsLoading(false)
  }
}
        const [url ,setUrl] = useState('')
  return (
    <>
     <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new Website</AlertDialogTitle>
          <AlertDialogDescription>
            when you add a website you can starting talking to it by creating a new chat 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Label>Enter Website Url</Label>
        <Input placeholder='enter website url' value={url} onChange={(e)=>setUrl(e.target.value)}/>
        {error && (
  <p className="text-red-500 text-sm mt-2">
    {error}
  </p>
)}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          disabled={isLoading}
          onClick={onSubmit}
          >Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default AddWebsite
