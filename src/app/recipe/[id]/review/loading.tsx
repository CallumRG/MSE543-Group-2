import { Loader2, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewLoading() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="bg-card shadow-lg rounded-lg border">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        
        <div className="p-6 space-y-8">
          {/* Overall Rating Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-6 rounded" />
              ))}
              <Skeleton className="h-4 w-16 ml-2" />
            </div>
          </div>

          {/* Difficulty Level Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Would Make Again Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </div>

          {/* Specific Aspects Skeleton */}
          <div className="space-y-6 pt-4 border-t">
            <Skeleton className="h-5 w-32" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-6 rounded" />
                  ))}
                  <Skeleton className="h-4 w-16 ml-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Review Text Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Submit Button Skeleton */}
          <div className="pt-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 