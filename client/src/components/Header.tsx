import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="indian-flag-strip w-full"></div>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 flex-shrink-0">
            <svg 
              viewBox="0 0 100 100" 
              className="h-full w-full text-[#FF9933]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="#fff" stroke="#000080" strokeWidth="2" />
              <circle cx="50" cy="50" r="12" fill="#000080" />
              <g stroke="#000080" strokeWidth="1.5">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 50 + 12 * Math.cos(angle);
                  const y1 = 50 + 12 * Math.sin(angle);
                  const x2 = 50 + 20 * Math.cos(angle);
                  const y2 = 50 + 20 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
            </svg>
          </div>
          <div>
            <h1 className="text-[#000080] font-semibold text-lg md:text-xl">Department of Justice</h1>
            <p className="text-gray-600 text-xs md:text-sm">Ministry of Law and Justice, Government of India</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-[#000080]" 
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-[#000080] hover:text-[#FF9933] text-sm">Home</a>
            <a href="#" className="text-[#000080] hover:text-[#FF9933] text-sm">About</a>
            <a href="#" className="text-[#000080] hover:text-[#FF9933] text-sm">Services</a>
            <a href="#" className="text-[#000080] hover:text-[#FF9933] text-sm">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
