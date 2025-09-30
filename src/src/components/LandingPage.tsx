import React from 'react';

export function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen pt-20 animate-fade-in">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl pixel-font text-white mb-8 animate-pulse">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-6xl pixel-font text-blue-300 mb-8">
          SamSoSleepy Website
        </h2>
        <div className="max-w-2xl mx-auto deltarune-card p-8">
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Explore our collection of addons, UI modifications, and various tools for your gaming experience.
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="text-gray-300">My Discord:</span>
            <a 
              href="https://discord.gg/FnmWw7nWyq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pixel-font text-blue-400 hover:text-purple-400 transition-colors duration-300 underline decoration-2 underline-offset-4 hover:decoration-purple-400"
            >
              discord.gg/FnmWw7nWyq
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}