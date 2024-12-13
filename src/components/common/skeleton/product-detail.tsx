import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonProductDetail() {
  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <Skeleton className="h-[125px] w-full rounded-xl bg-gray-100" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-100" />
        <Skeleton className="h-4 w-full bg-gray-100" />
      </div>
    </div>
  )
}
