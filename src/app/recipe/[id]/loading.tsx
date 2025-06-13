
import { Loader2, Image as ImageIcon, ListChecks, Hash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="bg-card shadow-xl rounded-lg overflow-hidden">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-64 md:h-96 bg-muted/50" />
        
        <div className="p-6">
          {/* Title Skeleton */}
          <Skeleton className="h-10 w-3/4 mb-3 bg-muted/50" />
          {/* Description Skeleton */}
          <Skeleton className="h-6 w-full mb-6 bg-muted/40" />
          <Skeleton className="h-6 w-5/6 mb-6 bg-muted/40" />

          {/* Badges Skeleton */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border">
            <Skeleton className="h-8 w-24 rounded-full bg-muted/30" />
            <Skeleton className="h-8 w-24 rounded-full bg-muted/30" />
            <Skeleton className="h-8 w-24 rounded-full bg-muted/30" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Ingredients Skeleton */}
            <div className="md:col-span-1 space-y-3">
              <Skeleton className="h-8 w-1/2 mb-2 bg-muted/50" />
              <Skeleton className="h-5 w-full bg-muted/30" />
              <Skeleton className="h-5 w-5/6 bg-muted/30" />
              <Skeleton className="h-5 w-full bg-muted/30" />
              <Skeleton className="h-5 w-4/6 bg-muted/30" />
            </div>
            {/* Instructions Skeleton */}
            <div className="md:col-span-2 space-y-3">
              <Skeleton className="h-8 w-1/2 mb-2 bg-muted/50" />
              <Skeleton className="h-5 w-full bg-muted/30" />
              <Skeleton className="h-5 w-full bg-muted/30" />
              <Skeleton className="h-5 w-5/6 bg-muted/30" />
              <Skeleton className="h-5 w-full bg-muted/30" />
              <Skeleton className="h-5 w-4/6 bg-muted/30" />
            </div>
          </div>
        </div>
        
        {/* Footer Skeleton */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20 border-t border-border">
          <Skeleton className="h-8 w-32 rounded-md bg-muted/40" />
          <Skeleton className="h-10 w-40 rounded-md bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
