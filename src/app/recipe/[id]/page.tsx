
import { getRecipeById } from '@/lib/recipes';
import type { Recipe } from '@/types';
import Image from 'next/image';
import { Clock, Users, ChefHat, Star, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StarRating from '@/components/recipes/StarRating'; // Re-using StarRating for display + interaction
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
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
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden shadow-xl animate-fade-in">
        <CardHeader className="p-0 relative">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={recipe.imageHint}
              priority // Prioritize loading the main image on the recipe page
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
            <CardTitle className="font-headline text-3xl md:text-4xl text-white mb-2 shadow-text">
              {recipe.title}
            </CardTitle>
            <CardDescription className="text-gray-200 text-md md:text-lg shadow-text">
              {recipe.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
            {recipe.prepTime && (
              <Badge variant="outline" className="flex items-center gap-2 py-1 px-3">
                <Clock size={16} /> Prep: {recipe.prepTime}
              </Badge>
            )}
            {recipe.cookTime && (
              <Badge variant="outline" className="flex items-center gap-2 py-1 px-3">
                <ChefHat size={16} /> Cook: {recipe.cookTime}
              </Badge>
            )}
            {recipe.servings && (
              <Badge variant="outline" className="flex items-center gap-2 py-1 px-3">
                <Users size={16} /> Serves: {recipe.servings}
              </Badge>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground/90">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="leading-relaxed">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3 text-foreground/90">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="leading-relaxed">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>

        <Separator className="my-0" />

        <CardFooter className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30">
           <div className="flex items-center gap-2">
            <StarRating initialRating={recipe.rating} recipeId={recipe.id} readOnly={true} />
             <p className="text-sm text-muted-foreground">
              ({recipe.rating.toFixed(1)} stars from {recipe.numRatings} ratings)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild>
              <Link href={`/recipe/${recipe.id}/review`}>Leave Review</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/submit-recipe">Submit Your Own Fantasy!</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}
