
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StickerPreview } from './components/StickerPreview';
import { Footer } from './components/Footer';
import { generateStickerFromImage } from './services/geminiService';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: ImageFile) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
    handleGenerateSticker(file);
  }, []);

  const handleGenerateSticker = async (file: ImageFile) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const stickerDataUrl = await generateStickerFromImage(file.base64, file.type);
      setGeneratedImage(stickerDataUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to generate sticker. Please try again with a different image.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-background text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <StickerPreview
              originalImage={originalImage.url}
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
