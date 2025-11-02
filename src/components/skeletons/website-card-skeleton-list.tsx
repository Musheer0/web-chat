"use client"
import React from "react"
import WebsiteCardSkeleton from "./website-card-skeleton"

const WebsiteCardSkeletonList = () => {
  const cards = Array.from({ length: 10 }).map((_, i) => (
    <WebsiteCardSkeleton key={i} />
  ))

  return <>{cards}</>
}

export default WebsiteCardSkeletonList
                  