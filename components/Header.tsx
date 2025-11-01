import React from 'react';

const StickerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary drop-shadow-[0_0_10px_rgba(167,139,250,0.7)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.41 11.58l-9-9A2 2 0 0011 2H4a2 2 0 00-2 2v7a2 2 0 00.59 1.42l9 9a2 2 0 002.82 0l7-7a2 2 0 000-2.84zM6.5 8.5A1.5 1.5 0 118 7a1.5 1.5 0 01-1.5 1.5z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex items-center gap-3 p-4">
        <StickerIcon />
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Sticker Maker</h1>
      </div>
    </header>
  );
};