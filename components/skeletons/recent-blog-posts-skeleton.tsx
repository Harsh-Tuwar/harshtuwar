import { Skeleton } from '@/components/ui/skeleton';

export default function RecentBlogPostsSkeleton() {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
			<Skeleton className="h-72 w-full" />
			<Skeleton className="h-72 w-full" />
			<Skeleton className="h-72 w-full" />
		</div>
	)
}