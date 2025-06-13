import { Utensils } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center gap-2">
        <Utensils className="h-6 w-6 text-primary" />
        <p className="text-sm">
          &copy; {currentYear} Fake Bake. All imaginary rights reserved.
        </p>
        <p className="text-xs">For entertainment purposes only. Do not attempt to cook these recipes.</p>
      </div>
    </footer>
  );
};

export default Footer;
