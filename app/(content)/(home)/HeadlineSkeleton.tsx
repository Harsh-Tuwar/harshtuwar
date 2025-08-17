import { Skeleton } from "@/components/ui/skeleton";

export default function HeadlineSkeleton() {
  return (
    <div className="flex flex-col items-left gap-3 max-w-2xl">
		  <Skeleton className="h-16 w-full" />
		  <Skeleton className="h-16 w-full" />
		  <Skeleton className="h-16 w-full" />
		  <Skeleton className="h-16 w-full" />
		  <Skeleton className="h-16 w-full" />
    </div>
  );
}
