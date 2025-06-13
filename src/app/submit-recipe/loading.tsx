import { Loader2 } from 'lucide-react';

export default function SubmitRecipeLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"> {/* Adjust min-h based on header/footer */}
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-md text-foreground">Preparing the recipe book...</p>
    </div>
  );
}
