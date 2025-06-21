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

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Review {
  id: string;
  recipeId: string;
  rating: number; // 1-5 stars
  difficultyLevel: DifficultyLevel;
  wouldMakeAgain: boolean;
  aspectRatings: {
    taste: number; // 1-5 stars
    presentation: number; // 1-5 stars
    instructionsClarity: number; // 1-5 stars
  };
  comment?: string;
  reviewerName?: string;
  createdAt: Date;
}
