import React from 'react';
import { Category } from '@shared/types';
import { judicialCategories } from '@/lib/judicialData';

interface SidebarProps {
  isOpen: boolean;
  currentCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  currentCategory, 
  onSelectCategory 
}) => {
  // Dynamic classnames based on mobile visibility
  const sidebarClass = `
    w-72 bg-white border-r border-gray-200 
    ${isOpen ? 'block' : 'hidden'} md:block 
    transition-all duration-300 ease-in-out overflow-y-auto
    ${isOpen ? 'absolute z-20 h-full left-0' : ''}
  `;

  return (
    <aside className={sidebarClass}>
      <div className="p-4">
        <h2 className="text-[#000080] font-semibold mb-4 text-lg">Judicial Information</h2>
        
        <div className="space-y-3">
          {judicialCategories.map((category) => (
            <div 
              key={category.id}
              className={`
                bg-gray-50 p-3 rounded-lg border 
                ${currentCategory === category.id ? 'border-[#FF9933]' : 'border-gray-200'} 
                hover:border-[#FF9933] cursor-pointer transition-colors duration-200
              `}
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="flex items-start">
                <span className="material-icons text-[#FF9933] mr-3 mt-0.5">{category.icon}</span>
                <div>
                  <h3 className="font-medium text-[#000080]">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
