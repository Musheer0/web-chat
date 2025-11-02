"use client"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"

const WebsiteCardSkeleton = () => {
  return (
    <Card
      className="w-[400px] relative h-[200px] pb-0 flex overflow-hidden bg-muted border-0"
    >
      <Button size={"icon"} variant={"outline"} className="absolute cursor-pointer top-5 right-5">
        <Skeleton className="w-4 h-4 rounded-sm" />
      </Button>

      <CardContent className="mt-auto h-fit flex items-end justify-between gap-2 bg-linear-to-b to-black pb-5">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-[50px] h-[50px] rounded-full bg-primary shadow-2xl" />
          <CardTitle className="space-y-1">
            <Skeleton className="w-[200px] h-4" />
            <Skeleton className="w-[150px] h-4" />
          </CardTitle>
        </div>

        <div className="actions">
          <Button size={"sm"} disabled >
            <Skeleton className="w-[80px] h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WebsiteCardSkeleton
