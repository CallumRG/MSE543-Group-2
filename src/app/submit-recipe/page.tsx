import { RecipeForm } from '@/components/forms/RecipeForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubmitRecipePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
            Share Your Culinary Fantasy!
          </CardTitle>
          <CardDescription className="text-lg text-foreground/80 mt-2">
            Got a recipe that's too good (or too weird) to be true? Submit your fake bake here and let the world marvel at your imagination!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecipeForm />
        </CardContent>
      </Card>
    </div>
  );
}
