"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import WebsiteCard from './website-card'
import WebsiteCardSkeletonList from '../skeletons/website-card-skeleton-list'

const WebsiteCardView = () => {
    const  {results,loadMore,isLoading} = usePaginatedQuery(api.website.crud.GetUserWebsites,{},{initialNumItems:10})
  return (
    <div className='w-full flex flex-wrap items-center gap-5 pt-6 px-4'>
     {results.map((e)=>{
        return (
            <WebsiteCard id={e._id} data={e.metadata}/>
        )
     })}
     {isLoading && <WebsiteCardSkeletonList/>}
    </div>
  )
}

export default WebsiteCardView
