import { getRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/recipes/RecipeCard';
import type { Recipe } from '@/types';

export default async function HomePage() {
  const recipes: Recipe[] = await getRecipes();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Welcome to Fake Bake!
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Discover a world of fantastically fictional food. Browse our collection of imaginary recipes, rate your favorites, and even submit your own culinary creations (for fun, of course!).
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center text-foreground">
          Featured Fakes
        </h2>
        {recipes.length === 0 ? (
          <p className="text-center text-muted-foreground">No recipes found. Maybe bake some up?</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
