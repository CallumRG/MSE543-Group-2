import { getRecipeById } from '@/lib/recipes';
import type { Recipe } from '@/types';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReviewForm } from '@/components/forms/ReviewForm';

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const recipe: Recipe | undefined = await getRecipeById(params.id);

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-headline font-bold text-destructive mb-2">Recipe Not Found</h1>
        <p className="text-lg text-foreground/80 mb-6">
          Oops! We couldn't find the recipe you're looking for. It might have been eaten by a grue.
        </p>
        <Button asChild>
          <Link href="/">Back to Recipes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
            Review Recipe
          </CardTitle>
          <CardDescription className="text-lg text-foreground/80 mt-2">
            Share your experience with this fantastical recipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm 
            recipeId={recipe.id} 
            recipeTitle={recipe.title}
            onSubmitSuccess={() => {
              // In a real app, this might redirect back to the recipe page
              // For now, we'll just let the form handle the success state
            }}
          />
        </CardContent>
      </Card>
      
      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link href={`/recipe/${recipe.id}`}>
            ← Back to Recipe
          </Link>
        </Button>
      </div>
    </div>
  );
} 