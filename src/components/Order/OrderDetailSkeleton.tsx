import { Skeleton } from "@/components/ui/skeleton";

const OrderDetailSkeleton = () => {
  return (
    <div className="w-full h-[90dvh] py-4 overflow-y-auto overflow-x-hidden flex items-start justify-center">
      <div className="w-full flex flex-col gap-4 border border-gray-300 rounded-md lg:p-8 md:p-6 p-2 lg:w-[60vw] max-w-[900px] md:w-[90vw] mt-2">
        {/* Header */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="w-full flex flex-row justify-between mt-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="w-full flex flex-row justify-between mt-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>

        {/* Add new dish button */}
        <div className="flex w-full justify-end">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Order items */}
        <div className="w-full flex flex-col gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full border-b border-gray-400 py-1">
              <div className="w-full h-full flex flex-row justify-between">
                <div className="flex flex-row gap-x-3 items-center">
                  <Skeleton className="h-24 w-24 rounded-md" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex w-full items-center justify-center gap-x-[20px]">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="min-h-32 min-w-32 flex flex-row items-center justify-center">
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="min-h-32 min-w-32 flex flex-row gap-2 items-center justify-center">
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with buttons and price summary */}
        <div className="w-full flex flex-row justify-between">
          <div className="w-[150px] flex flex-col gap-3">
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <div className="w-[150px] flex flex-col gap-3">
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <div className="min-w-[22rem] min-h-[10rem] p-6 rounded-md">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="w-full flex flex-row justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="w-full flex flex-row justify-between pb-5 border-b border-gray-300">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-8" />
              </div>
              <div className="w-full flex flex-row justify-between mt-2">
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-7 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
