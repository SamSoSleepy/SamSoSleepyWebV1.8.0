import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { AddonPage } from './components/AddonPage';
import { BetMcUiPage } from './components/BetMcUiPage';
import { OtherPage } from './components/OtherPage';
import { MusicPlayer } from './components/MusicPlayer';
// Note: Replace this with your actual Deltarune background image
import backgroundImage from './assets/deltarune-bg.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'addon':
        return <AddonPage />;
      case 'betmcui':
        return <BetMcUiPage />;
      case 'other':
        return <OtherPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="deltarune-bg">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      
      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Main Content */}
      <main className="relative z-10">
        {renderPage()}
      </main>
      
      {/* Global Music Player - Fixed position */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <MusicPlayer />
      </div>
    </div>
  );
}