import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GovernmentHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "eFiling", href: "#" },
    { name: "Case Status", href: "#" },
    { name: "Services", href: "#" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md border-b-4 border-primary-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Government Emblem */}
            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
              <Scale className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-navy font-bold text-xl font-[Noto_Sans]">Department of Justice</h1>
              <p className="text-gray-600 text-sm">Ministry of Law and Justice, Government of India</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-navy hover:text-primary-blue transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-navy hover:text-primary-blue transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
