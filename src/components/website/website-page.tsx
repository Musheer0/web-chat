"use client"
import { useSiteTitlte } from '@/hooks/use-site-header'
import React, { useEffect } from 'react'
import AddWebsite from './add-website';
import { Button } from '../ui/button';
import { PlusCircleIcon } from 'lucide-react';
import WebsiteCardView from './website-card-view';

const WebsitePage = () => {
    const {setSiteTitle} = useSiteTitlte();
      useEffect(()=>{
      setSiteTitle(" Websites")
    },[]);
  return (
    <div className='w-full h-full flex flex-col'>
      <div className="header w-full py-3 px-2 flex items-center justify-between">
        <p className='font-semibold text-xl'>
            Your Websites
        </p>
        <AddWebsite>
            <Button size={'sm'} variant={'outline'}>
                <PlusCircleIcon/>
                Add Website
            </Button>
        </AddWebsite>
      </div>

      <div className="body">
        <WebsiteCardView/>
      </div>
    </div>
  )
}

export default WebsitePage
