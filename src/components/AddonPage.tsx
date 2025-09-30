import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Search, X } from 'lucide-react';

export function AddonPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const addonCards = [
    {
      title: 'Text',
      image: 'https://images.steamusercontent.com/ugc/2202883306567856451/94605F55F65C0A7D7CA6FF3C376722B87EBF2AB8/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
      name: 'Enhanced Gaming Experience',
      description: "Text",
      link: '#'
    }
  ];

  // Fuzzy search function
  const fuzzySearch = (query: string, text: string) => {
    if (!query) return true;
    
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Direct substring match (highest priority)
    if (textLower.includes(queryLower)) return true;
    
    // Fuzzy matching - check if characters appear in order
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }
    
    return queryIndex === queryLower.length;
  };

  // Filter addons based on search query (title only)
  const filteredAddons = useMemo(() => {
    if (!searchQuery.trim()) return addonCards;
    
    return addonCards.filter(addon => 
      fuzzySearch(searchQuery, addon.title)
    );
  }, [searchQuery, addonCards]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="pt-24 px-6 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl pixel-font text-center text-white mb-8">
          Addon Collection
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 text-blue-300 ${!searchQuery ? 'search-icon-pulse' : ''}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search addons by title... (e.g., 'action', 'rlcraft', 'riee')"
              className="search-input-deltarune w-full pl-12 pr-12 py-4 rounded-lg focus:outline-none backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Info */}
          <div className="flex items-center justify-between mt-3">
            <span className="search-results-info">
              {searchQuery ? (
                `${filteredAddons.length} addon${filteredAddons.length !== 1 ? 's' : ''} found`
              ) : (
                `${addonCards.length} total addons`
              )}
            </span>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 pixel-font hover:scale-105 transform"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* No Results Message */}
        {searchQuery && filteredAddons.length === 0 && (
          <div className="text-center py-12">
            <div className="no-results-container p-8 max-w-md mx-auto rounded-lg">
              <Search className="h-12 w-12 text-blue-300 mx-auto mb-4 search-icon-pulse" />
              <h3 className="text-xl text-white mb-2 pixel-font">No addons found</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Try searching with fewer letters or different keywords
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-blue-300 pixel-font">Try searching:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setSearchQuery('riee')}
                    className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-xs hover:bg-purple-600/50 transition-colors"
                  >
                    riee
                  </button>
                  <button
                    onClick={() => setSearchQuery('wing')}
                    className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-xs hover:bg-purple-600/50 transition-colors"
                  >
                    wing
                  </button>
                  <button
                    onClick={() => setSearchQuery('world')}
                    className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-xs hover:bg-purple-600/50 transition-colors"
                  >
                    world
                  </button>
                  <button
                    onClick={() => setSearchQuery('rl')}
                    className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-xs hover:bg-purple-600/50 transition-colors"
                  >
                    rl
                  </button>
                </div>
              </div>
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 pixel-font transform hover:scale-105"
              >
                Show all addons
              </button>
            </div>
          </div>
        )}
        
        {/* Addon Grid */}
        {filteredAddons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAddons.map((card, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                title={card.title}
                image={card.image}
                name={card.name}
                description={card.description}
                link={card.link}
              />
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
