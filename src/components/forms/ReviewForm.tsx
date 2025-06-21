"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";

const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
  wouldMakeAgain: z.enum(["yes", "no"]),
  aspectRatings: z.object({
    taste: z.number().min(1).max(5),
    presentation: z.number().min(1).max(5),
    instructionsClarity: z.number().min(1).max(5),
  }),
  comment: z.string().optional(),
  reviewerName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must not exceed 50 characters"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  recipeId: string;
  recipeTitle: string;
  onSubmitSuccess?: () => void;
}

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  label: string;
  size?: number;
}

const StarRatingInput = ({ value, onChange, label, size = 24 }: StarRatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHoverRating(rating)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:scale-110"
          >
            <Star
              size={size}
              className={cn(
                rating <= (hoverRating || value) ? "text-yellow-500" : "text-muted-foreground/50",
                "transition-colors duration-100"
              )}
              fill={rating <= (hoverRating || value) ? 'currentColor' : 'none'}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {value > 0 ? `${value} star${value > 1 ? 's' : ''}` : 'No rating'}
        </span>
      </div>
    </div>
  );
};

export function ReviewForm({ recipeId, recipeTitle, onSubmitSuccess }: ReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      difficultyLevel: "Medium",
      wouldMakeAgain: "yes",
      aspectRatings: {
        taste: 0,
        presentation: 0,
        instructionsClarity: 0,
      },
      comment: "",
      reviewerName: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would submit to a backend
      console.log('Review submitted:', {
        ...data,
        recipeId,
        wouldMakeAgain: data.wouldMakeAgain === "yes",
        createdAt: new Date(),
      });

      toast({
        title: "Review Submitted!",
        description: `Thank you for reviewing "${recipeTitle}"! Your fantastical feedback helps other bakers.`,
        duration: 5000,
      });

      form.reset();
      onSubmitSuccess?.();
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong while submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-headline font-bold text-primary mb-2">
            Leave a Review
          </h2>
          <p className="text-muted-foreground">
            Share your experience with "{recipeTitle}"
          </p>
        </div>

        {/* Overall Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Overall Rating</FormLabel>
              <FormControl>
                <StarRatingInput
                  value={field.value}
                  onChange={field.onChange}
                  label=""
                  size={32}
                />
              </FormControl>
              <FormDescription>
                How would you rate this recipe overall?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reviewer Name */}
        <FormField
          control={form.control}
          name="reviewerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                Let others know who's sharing this fantastic review!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Difficulty Level */}
        <FormField
          control={form.control}
          name="difficultyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Difficulty Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Easy" id="easy" />
                    <label htmlFor="easy" className="cursor-pointer">Easy - A magical breeze!</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Medium" id="medium" />
                    <label htmlFor="medium" className="cursor-pointer">Medium - Some enchantment required</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Hard" id="hard" />
                    <label htmlFor="hard" className="cursor-pointer">Hard - Master wizard level</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                How challenging was this recipe to make?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Would Make Again */}
        <FormField
          control={form.control}
          name="wouldMakeAgain"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Would You Make This Again?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <label htmlFor="yes" className="cursor-pointer">Yes, absolutely!</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <label htmlFor="no" className="cursor-pointer">No, once was enough</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Aspect Ratings */}
        <div className="space-y-6">
          <h3 className="font-headline text-lg">Rate Specific Aspects</h3>
          
          <FormField
            control={form.control}
            name="aspectRatings.taste"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StarRatingInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Taste"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aspectRatings.presentation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StarRatingInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Presentation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aspectRatings.instructionsClarity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StarRatingInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Instructions Clarity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Optional Comment */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Additional Comments (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share any additional thoughts, tips, or magical moments you experienced while making this recipe..."
                  className="resize-y min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell others about your fantastical baking adventure!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8 transition-transform active:scale-95" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Review...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </Form>
  );
} 