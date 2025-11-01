import React, { useCallback, useState } from 'react';
import type { ImageFile, StickerStyle } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile) => void;
  stickerStyle: StickerStyle;
  setStickerStyle: (style: StickerStyle) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 group-hover:text-brand-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
)

const RedrawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const StickerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
  </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, stickerStyle, setStickerStyle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const base64 = url.split(',')[1];
        onImageUpload({
          name: file.name,
          type: file.type,
          size: file.size,
          url,
          base64,
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const onBrowseClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center pt-20">
      <div className="glass-card rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Create Your AI Sticker</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Choose a style, then upload your image. Our AI will work its magic instantly.</p>
        
        <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-300 mb-4 tracking-wide">1. Choose Your Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setStickerStyle('redraw')}
                    className={`p-6 border-2 rounded-lg text-left transition-all duration-300 ${stickerStyle === 'redraw' ? 'style-card-active bg-white/10' : 'border-transparent bg-white/5 hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-4">
                        <RedrawIcon />
                        <span className="font-semibold text-lg">Redraw Style</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Generates a new, vibrant cartoon version of your image.</p>
                </button>
                <button
                    type="button"
                    onClick={() => setStickerStyle('stickerify')}
                    className={`p-6 border-2 rounded-lg text-left transition-all duration-300 ${stickerStyle === 'stickerify' ? 'style-card-active bg-white/10' : 'border-transparent bg-white/5 hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-4">
                        <StickerifyIcon />
                        <span className="font-semibold text-lg">Stickerify Original</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Keeps your original image and adds a classic sticker outline.</p>
                </button>
            </div>
        </div>

        <div>
           <h3 className="text-lg font-bold text-slate-300 mb-4 tracking-wide">2. Upload Your Image</h3>
            <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`group relative flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-brand-primary bg-brand-dark/50 scale-105' : 'border-slate-700 hover:border-brand-secondary'}`}
                onClick={onBrowseClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={onFileChange}
                />
                <div className="flex flex-col items-center gap-4">
                  <UploadIcon />
                  <p className="text-lg font-medium text-slate-300">Drag & drop your image here</p>
                  <p className="text-slate-500">or</p>
                  <div
                      className="px-6 py-2 gradient-button text-white font-semibold rounded-lg shadow-lg"
                  >
                      Browse Files
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};