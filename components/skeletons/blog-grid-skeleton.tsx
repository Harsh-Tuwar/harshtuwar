import { Skeleton } from "@/components/ui/skeleton";

export default function BlogGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Skeleton className="h-120 w-full" />
      <Skeleton className="h-120 w-full" />
		  <Skeleton className="h-120 w-full" />
    </div>
  );
}
