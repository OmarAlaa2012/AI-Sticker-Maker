
import React, { useCallback, useState } from 'react';
import type { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
)

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
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
    <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Upload Your Image</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Drag & drop an image file or click to browse. The AI will instantly transform it into a cool sticker.</p>
        <div
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`relative flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-brand-primary bg-brand-dark/50 scale-105' : 'border-slate-700 hover:border-brand-secondary'}`}
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
              <button
                  type="button"
                  className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-background transition-colors"
              >
                  Browse Files
              </button>
            </div>
        </div>
    </div>
  );
};
