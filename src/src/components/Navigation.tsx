import React from 'react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'addon', label: 'Addon' },
    { id: 'betmcui', label: 'BetMcUi' },
    { id: 'other', label: 'Other' }
  ];

  return (
    <nav className="blur-bar fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-center justify-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`pixel-font px-4 py-2 rounded transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-blue-600/80 text-white hover:bg-blue-500 hover:shadow-md'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}