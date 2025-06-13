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
import { useToast } from "@/hooks/use-toast";
import { submitRecipe } from "@/lib/recipes"; // Assuming a function to "submit"
import { useState } from "react";
import { Loader2 } from "lucide-react";

const recipeFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
  ingredients: z.string().min(10, {
    message: "Please list at least one ingredient (min 10 characters total).",
  }),
  instructions: z.string().min(20, {
    message: "Instructions must be at least 20 characters.",
  }),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  servings: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

const defaultValues: Partial<RecipeFormValues> = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  prepTime: "",
  cookTime: "",
  servings: "",
};

export function RecipeForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: RecipeFormValues) {
    setIsSubmitting(true);
    try {
      // Split ingredients and instructions by newline for the mock submission
      const recipeDataToSubmit = {
        ...data,
        ingredients: data.ingredients.split('\n').filter(line => line.trim() !== ''),
        instructions: data.instructions.split('\n').filter(line => line.trim() !== ''),
      };
      
      const result = await submitRecipe(recipeDataToSubmit); // This is a mock function

      if (result.success) {
        toast({
          title: "Recipe Submitted!",
          description: result.message || "Your fantastical recipe is now part of the Fake Bake legend (almost!).",
          variant: "default",
          duration: 5000,
        });
        form.reset();
      } else {
        toast({
          title: "Oh Crumbs!",
          description: result.message || "Something went wrong with your recipe submission. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Recipe Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Moon Cheese Scones" {...field} />
              </FormControl>
              <FormDescription>
                Give your fake recipe a catchy and imaginative name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief, tantalizing description of your culinary fiction..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-3 gap-6">
            <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Prep Time (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 20 lightyears" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="cookTime"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Cook Time (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 5 parsecs" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Servings (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 4 hungry aliens" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>


        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List your fantastical ingredients, one per line..."
                  className="resize-y min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be creative! Think unicorn tears, dragon scales, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the magical steps to create your masterpiece, one step per line..."
                  className="resize-y min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail the process, no matter how absurd!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8 transition-transform active:scale-95" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Fake Recipe"
          )}
        </Button>
      </form>
    </Form>
  );
}
