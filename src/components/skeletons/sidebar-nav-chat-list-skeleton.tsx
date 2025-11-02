"use client"
import React from "react"
import NavWebsiteChatCardSkeleton from "./sidebar-nav-chat-card-skeleton"

const NavWebsiteChatCardSkeletonList = () => {
  const cards = Array.from({ length: 10 }).map((_, i) => (
    <NavWebsiteChatCardSkeleton key={i} />
  ))

  return <>{cards}</>
}

export default NavWebsiteChatCardSkeletonList
