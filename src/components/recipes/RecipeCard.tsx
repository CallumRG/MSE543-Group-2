'use client';

import Image from 'next/image';
import type { Recipe } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import StarRating from './StarRating';
import { Clock, Users, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 md:h-64">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={recipe.imageHint}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <CardTitle className="font-headline text-2xl mb-2">{recipe.title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">{recipe.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
          {recipe.prepTime && (
            <div className="flex items-center gap-1">
              <Clock size={16} /> <span>Prep: {recipe.prepTime}</span>
            </div>
          )}
          {recipe.cookTime && (
            <div className="flex items-center gap-1">
              <ChefHat size={16} /> <span>Cook: {recipe.cookTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users size={16} /> <span>Serves: {recipe.servings}</span>
            </div>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="font-semibold">Ingredients</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger className="font-semibold">Instructions</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t">
        <StarRating initialRating={recipe.rating} recipeId={recipe.id} readOnly={false} />
        <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
          {recipe.rating.toFixed(1)} stars ({recipe.numRatings} ratings)
        </p>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
