import type { Recipe } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Invisible Ink Lemonade Cookies',
    description: 'Magically delicious cookies that reveal a secret message when dipped in milk! (Not really, but they taste like it.)',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cookies lemonade',
    ingredients: [
      '1 cup "Vanishing" Flour (all-purpose)',
      '1/2 tsp Baking Soda of Invisibility',
      '1/4 tsp Salt of Secrets',
      '1/2 cup Unsalted Butter, softened to room temperature whispers',
      '3/4 cup Granulated Sugar Crystals',
      '1 Large Egg of Enigma',
      '1 tbsp Lemon Zest (for a zesty illusion)',
      '1 tbsp "Invisible" Lemon Juice Concentrate',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper of stealth.',
      'In a medium bowl, whisk together flour, baking soda, and salt until they almost disappear.',
      'In a large bowl, beat butter and sugar with an electric mixer until light and fluffy, like a cloud.',
      'Beat in egg, lemon zest, and lemon juice concentrate until well combined.',
      'Gradually add dry ingredients to wet ingredients, mixing on low speed until just combined. Do not overmix, or the magic will fade!',
      'Drop rounded tablespoons of dough onto prepared baking sheets, about 2 inches apart.',
      'Bake for 8-10 minutes, or until edges are golden brown and centers are set (but still a bit soft for peak illusion).',
      'Let cookies cool on baking sheets for 5 minutes before transferring to wire racks to cool completely (and solidify their secrets).',
    ],
    prepTime: '20 minutes of mystery',
    cookTime: '10 minutes of magic',
    servings: 'Makes 2 dozen illusions',
    rating: 4.5,
    numRatings: 127,
  },
  {
    id: '2',
    title: 'Zero-Gravity Chocolate Soufflé',
    description: 'A chocolate soufflé so light, it practically defies gravity. Perfect for aspiring astronauts with a sweet tooth.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chocolate souffle',
    ingredients: [
      '4 oz Bittersweet Chocolate, chopped (the darker the void, the better)',
      '1/4 cup Unsalted Butter, plus more for greasing',
      '2 tbsp All-Purpose Flour (for structural integrity in space)',
      '1/2 cup Milk (preferably moon milk)',
      '1/4 cup Granulated Sugar, divided',
      '3 Large Egg Yolks, from free-range space chickens',
      '4 Large Egg Whites, at room temperature (for maximum lift-off)',
      'Pinch of Cream of Tartar (asteroid dust)',
      'Powdered Sugar, for dusting (like stardust)',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Generously butter four 6-ounce ramekins. Coat with granulated sugar, tapping out excess. This creates the anti-gravity field.',
      'In a heatproof bowl set over a pan of simmering water (or use a double boiler from your spaceship galley), melt chocolate and butter, stirring until smooth. Remove from heat.',
      'In a small saucepan, whisk flour into milk until smooth. Cook over medium heat, whisking constantly, until mixture thickens and comes to a boil. Remove from heat and stir in 1/8 cup (2 tbsp) of sugar.',
      'Whisk warm milk mixture into melted chocolate. Then, whisk in egg yolks one at a time until fully incorporated.',
      'In a clean, dry bowl, beat egg whites with an electric mixer on medium speed until foamy. Add cream of tartar, then gradually beat in the remaining 1/8 cup (2 tbsp) of sugar. Continue beating until stiff, glossy peaks form (like cosmic rays).',
      'Gently fold about one-third of the egg whites into the chocolate mixture to lighten it. Then, fold in the remaining egg whites until just combined. Be careful not to deflate your zero-G mixture!',
      'Divide batter evenly among prepared ramekins. Place ramekins on a baking sheet.',
      'Bake for 12-15 minutes, or until soufflés are puffed and set around the edges but still slightly soft in the center. Do not open the oven during baking, or you might disrupt the gravitational field!',
      'Serve immediately, dusted with powdered sugar. Watch them float (in your imagination)!',
    ],
    prepTime: '30 Earth minutes',
    cookTime: '15 minutes (light speed)',
    servings: '4 aspiring astronauts',
    rating: 4.8,
    numRatings: 256,
  },
  {
    id: '3',
    title: 'Gummy Bear Infused Rainbow Bread',
    description: 'A vibrant, chewy bread that tastes like a rainbow and is packed with molten gummy bear goodness. A true fantasy bake!',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'rainbow bread',
    ingredients: [
      '1 cup Warm Water (105-115°F, for awakening the yeast gnomes)',
      '2 1/4 tsp Active Dry Yeast (1 packet of gnome powder)',
      '1/4 cup Granulated Sugar (for sweetening the rainbow)',
      '1 tsp Salt (to balance the mythical flavors)',
      '1 Large Egg, slightly beaten (from a phoenix, if possible)',
      '1/4 cup Unsalted Butter, melted (liquid gold)',
      '3 - 3 1/2 cups All-Purpose Flour (plus more for dusting clouds)',
      '1 1/2 cups Gummy Bears, assorted colors (the more, the merrier the myth)',
      'Food Coloring: Red, Orange, Yellow, Green, Blue, Purple (unicorn tears)',
    ],
    instructions: [
      'In a large bowl, dissolve yeast and 1 tsp of sugar in warm water. Let stand for 5-10 minutes until foamy (the gnomes are awake!).',
      'Add remaining sugar, salt, egg, and melted butter to the yeast mixture. Stir to combine.',
      'Gradually add 3 cups of flour, mixing until a soft dough forms. Turn dough out onto a lightly floured surface.',
      'Knead for 6-8 minutes, adding more flour as needed, until dough is smooth and elastic. This is where the magic takes shape.',
      'Divide dough into 6 equal portions. Knead a few drops of a different food coloring into each portion until evenly colored. You now have six rainbow dough balls!',
      'Lightly grease a large bowl. Place one dough ball in the bowl, turning to grease all sides. Cover and let rise in a warm place for 1 hour, or until doubled in size. Repeat for all colored doughs, or rise them together if your bowl is large enough for a rainbow party.',
      'Punch down each risen dough. On a lightly floured surface, roll each colored dough into a rectangle (approx 12x4 inches).',
      'Sprinkle 1/4 cup of gummy bears over one rectangle. Layer another colored rectangle on top, sprinkle with gummy bears. Repeat until all dough rectangles are stacked, with gummy bears between each layer. Gently press the stack together.',
      'Carefully roll the stacked dough into a log shape, like a rainbow serpent. Place in a greased 9x5 inch loaf pan.',
      'Cover and let rise again in a warm place for 30-45 minutes, or until nearly doubled.',
      'Preheat oven to 375°F (190°C).',
      'Bake for 30-35 minutes, or until golden brown and bread sounds hollow when tapped. If it browns too quickly, tent with foil.',
      'Let cool in pan for 10 minutes before transferring to a wire rack to cool completely before slicing. Witness the molten gummy bear rainbow!',
    ],
    prepTime: '2 hours (includes rising time for rainbows to form)',
    cookTime: '35 minutes of pure fantasy',
    servings: '1 magical loaf',
    rating: 4.2,
    numRatings: 98,
  },
];

// In a real app, you'd fetch this data from an API
export const getRecipes = async (): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes;
};

export const getRecipeById = async (id: string): Promise<Recipe | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecipes.find(recipe => recipe.id === id);
}

// Simulate submitting a recipe
export const submitRecipe = async (recipeData: Omit<Recipe, 'id' | 'rating' | 'numRatings' | 'imageUrl' | 'imageHint'>): Promise<{success: boolean, message: string, id?: string}> => {
  console.log('Submitting recipe:', recipeData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, this would send data to a backend
  // For now, just simulate success and add to mock data if needed for immediate display (not implemented here)
  const newId = String(mockRecipes.length + 1 + Math.random());
  // mockRecipes.push({ ...recipeData, id: newId, rating: 0, numRatings: 0, imageUrl: 'https://placehold.co/600x400.png', imageHint: 'new recipe' });
  return { success: true, message: 'Recipe submitted for whimsical review! (Not really, but thanks for playing!)', id: newId };
}
