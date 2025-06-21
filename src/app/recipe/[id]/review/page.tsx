'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipeById } from '@/lib/recipes';
import type { Recipe } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Star, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ReviewPageProps {
  params: {
    id: string;
  };
}

interface StarRatingInputProps {
  label: string;
  value: number;
  onChange: (rating: number) => void;
  maxStars?: number;
}

const StarRatingInput = ({ label, value, onChange, maxStars = 5 }: StarRatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-1">
        {[...Array(maxStars)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={ratingValue}
              type="button"
              onClick={() => onChange(ratingValue)}
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:scale-110"
              aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? 's' : ''}`}
            >
              <Star
                size={24}
                className={cn(
                  ratingValue <= (hoverRating || value) ? "text-yellow-500" : "text-muted-foreground/50",
                  "transition-colors duration-100"
                )}
                fill={ratingValue <= (hoverRating || value) ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
        <span className="ml-2 text-sm text-muted-foreground">
          {value > 0 ? `${value}/${maxStars}` : 'Not rated'}
        </span>
      </div>
    </div>
  );
};

export default function ReviewPage({ params }: ReviewPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Review state
  const [overallRating, setOverallRating] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [wouldMakeAgain, setWouldMakeAgain] = useState('');
  const [tasteRating, setTasteRating] = useState(0);
  const [presentationRating, setPresentationRating] = useState(0);
  const [instructionsRating, setInstructionsRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock recipe data - in a real app, you'd fetch this
  const [recipe] = useState<Recipe | null>({
    id: params.id,
    title: 'Mock Recipe Title',
    description: 'Mock recipe description',
    imageUrl: '/foodpic1.jpg',
    imageHint: 'mock',
    ingredients: [],
    instructions: [],
    rating: 4.5,
    numRatings: 100,
  });

  const handleSubmitReview = async () => {
    if (overallRating === 0) {
      toast({
        title: "Missing Rating",
        description: "Please provide an overall rating for this recipe.",
        variant: "destructive",
      });
      return;
    }

    if (!difficulty || !wouldMakeAgain) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Review Submitted! 🎉",
      description: "Thanks for your fake review! (It won't actually be saved anywhere.)",
      duration: 4000,
    });

    setIsSubmitting(false);
    
    // Redirect back to recipe page
    router.push(`/recipe/${params.id}`);
  };

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p>Recipe not found</p>
            <Button asChild className="mt-4">
              <Link href="/">Back to Recipes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/recipe/${params.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipe
          </Link>
        </Button>
        <h1 className="text-3xl font-headline font-bold text-primary mb-2">
          Leave a Review
        </h1>
        <p className="text-muted-foreground">
          Share your thoughts on this fantastical recipe! (Remember, this is all pretend fun!)
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Review: {recipe.title}</CardTitle>
          <CardDescription>
            Help other fantasy bakers with your honest (fake) feedback!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Overall Rating */}
          <StarRatingInput
            label="Overall Rating *"
            value={overallRating}
            onChange={setOverallRating}
          />

          {/* Difficulty Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Difficulty Level *</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy" className="cursor-pointer">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Easy</Badge>
                  <span className="ml-2 text-sm">Perfect for kitchen novices</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                  <span className="ml-2 text-sm">Some experience helpful</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard" className="cursor-pointer">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">Hard</Badge>
                  <span className="ml-2 text-sm">For experienced fantasy chefs</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Would Make Again */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Would you make this again? *</Label>
            <RadioGroup value={wouldMakeAgain} onValueChange={setWouldMakeAgain}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Yes - I'd definitely make this again!
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="cursor-pointer">
                  No - Once was enough for this fantasy
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Specific Aspect Ratings */}
          <div className="space-y-6 pt-4 border-t">
            <h3 className="text-lg font-semibold">Rate Specific Aspects</h3>
            
            <StarRatingInput
              label="Taste"
              value={tasteRating}
              onChange={setTasteRating}
            />
            
            <StarRatingInput
              label="Presentation"
              value={presentationRating}
              onChange={setPresentationRating}
            />
            
            <StarRatingInput
              label="Instructions Clarity"
              value={instructionsRating}
              onChange={setInstructionsRating}
            />
          </div>

          {/* Optional Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review-text" className="text-sm font-medium">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="review-text"
              placeholder="Share your experience making this fantastical recipe..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[100px] resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting Review...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Fantasy Review
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 