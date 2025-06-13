import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
          <Cookie className="h-8 w-8" />
          Fake Bake
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/" className="text-foreground hover:text-primary transition-colors">Recipes</Link>
              </Button>
            </li>
            <li>
              <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/submit-recipe">Submit Recipe</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
