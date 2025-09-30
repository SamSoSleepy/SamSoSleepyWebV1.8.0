import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CardProps {
  title: string;
  image: string;
  name: string;
  description: string;
  link: string;
}

export function Card({ title, image, name, description, link }: CardProps) {
  return (
    <div className="deltarune-card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <h3 className="pixel-font text-blue-300 mb-4">{title}</h3>
      
      <div className="mb-4">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md border border-gray-600"
        />
      </div>
      
      <h4 className="text-white mb-2">{name}</h4>
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors pixel-font text-xs"
      >
        Download
      </a>
    </div>
  );
}