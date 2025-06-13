'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onRatingSubmit?: (rating: number) => void;
  recipeId: string;
  readOnly?: boolean;
  size?: number;
}

const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  onRatingSubmit,
  recipeId,
  readOnly = false,
  size = 20,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating);
  const { toast } = useToast();

  const handleMouseEnter = (rating: number) => {
    if (readOnly) return;
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const handleClick = (rating: number) => {
    if (readOnly) return;
    setCurrentRating(rating);
    if (onRatingSubmit) {
      onRatingSubmit(rating);
    }
    toast({
      title: "Rating Submitted!",
      description: `You gave this recipe ${rating} star(s). (Just for fun!)`,
      duration: 3000,
    });
  };

  const starColor = "text-accent"; // Use accent color for stars

  return (
    <div className={cn("flex items-center gap-1", readOnly ? "cursor-default" : "cursor-pointer")} aria-label={`Rating: ${currentRating} out of ${totalStars} stars`}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            className={cn(
              "transition-all duration-150 ease-in-out transform focus:outline-none",
              !readOnly && "hover:scale-125 focus:scale-110"
            )}
            aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              className={cn(
                ratingValue <= (hoverRating || currentRating) ? starColor : "text-muted-foreground/50",
                "transition-colors duration-100"
              )}
              fill={ratingValue <= (hoverRating || currentRating) ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
