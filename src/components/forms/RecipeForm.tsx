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
import { useState, useRef } from "react";
import { Loader2, Upload, X, Camera, Image as ImageIcon } from "lucide-react";

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

interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void;
  selectedPhoto: File | null;
}

const PhotoUpload = ({ onPhotoChange, selectedPhoto }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onPhotoChange(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removePhoto = () => {
    onPhotoChange(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="font-headline text-lg">Recipe Photo (Optional)</FormLabel>
        {selectedPhoto && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removePhoto}
            className="text-destructive hover:text-destructive/80"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      {!selectedPhoto ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Drop your recipe photo here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB (won't actually be saved)
              </p>
            </div>
            
            <Button type="button" variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Recipe preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {selectedPhoto.name}
              </span>
              <span className="text-xs text-muted-foreground">
                ({(selectedPhoto.size / 1024 / 1024).toFixed(1)} MB)
              </span>
            </div>
          </div>
        </div>
      )}

      <FormDescription>
        Add a mouth-watering photo of your fantastical creation! (This is just for show - no files will actually be uploaded)
      </FormDescription>
    </div>
  );
};

export function RecipeForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

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
      
      const result = await submitRecipe(recipeDataToSubmit);

      if (result.success) {
        toast({
          title: "Recipe Submitted!",
          description: selectedPhoto 
            ? `Your fantastical recipe and beautiful photo are now part of the Fake Bake legend! (Photo: ${selectedPhoto.name} - not actually saved)`
            : result.message || "Your fantastical recipe is now part of the Fake Bake legend (almost!).",
          variant: "default",
          duration: 5000,
        });
        form.reset();
        setSelectedPhoto(null);
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

        {/* Photo Upload Section */}
        <PhotoUpload 
          onPhotoChange={setSelectedPhoto}
          selectedPhoto={selectedPhoto}
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
