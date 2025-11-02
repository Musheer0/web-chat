"use client"
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'

const page = () => {
    const m = useAction(api.website.mutate.saveWebsite)
  return (
    <div>
      <Button
      onClick={async()=>{
        await m({url:"https://docs.firecrawl.dev/sdks/node"})
      }}
      >Test</Button>
    </div>
  )
}

export default page
