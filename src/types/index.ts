export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string; // For AI placeholder image generation
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  rating: number; // Average rating from 0 to 5
  numRatings: number; // Number of user ratings
}
