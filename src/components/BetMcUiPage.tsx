import React from 'react';
import { Card } from './Card';

export function BetMcUiPage() {
  const betMcUiCards = [
    {
      title: 'BetMcUi Core',
      image: 'https://images.steamusercontent.com/ugc/2202883306567855831/4721E6DEB6AA3720E44EBE6D2102CBE39E0288BA/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
      name: 'Modern UI Framework',
      description: 'A sleek and modern user interface framework designed for better user experience with clean aesthetics and intuitive navigation.',
      link: '#'
    },
    {
      title: 'Theme Pack',
      image: 'https://images.steamusercontent.com/ugc/2202883306567855831/4721E6DEB6AA3720E44EBE6D2102CBE39E0288BA/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
      name: 'Custom Themes Collection',
      description: 'A comprehensive collection of custom themes and visual styles to personalize your interface according to your preferences.',
      link: '#'
    },
    {
      title: 'secret',
      image: 'https://krita-artists.org/uploads/default/original/3X/3/2/326bd52141d61e604b66b1de97ee50577da0c8a7.gif',
      name: 'You and me',
      description: '...',
      link: 'https://deltarune.com/chapter6/'
    }
  ];

  return (
    <div className="pt-24 px-6 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl pixel-font text-center text-white mb-12">
          BetMcUi Collection
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {betMcUiCards.map((card, index) => (
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
      </div>
    </div>
  );
}