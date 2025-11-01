
import React from 'react';

interface StickerPreviewProps {
  originalImage: string;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
}

const LoadingSkeleton: React.FC = () => (
    <div className="w-full h-full bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
            </svg>
            <span className="text-slate-400 font-medium">Generating Sticker...</span>
        </div>
    </div>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7V9a1 1 0 01-2 0V3a1 1 0 011-1zm12 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 011.885-.666A5.002 5.002 0 0014.001 13V11a1 1 0 112 0v5a1 1 0 01-1 1z" clipRule="evenodd" />
    </svg>
)

export const StickerPreview: React.FC<StickerPreviewProps> = ({ originalImage, generatedImage, isLoading, error, onReset }) => {
  return (
    <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-300 mb-4">Original</h3>
                <div className="aspect-square w-full max-w-md bg-brand-dark p-4 rounded-2xl shadow-lg">
                    <img src={originalImage} alt="Original upload" className="w-full h-full object-contain rounded-lg" />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-300 mb-4">AI Sticker</h3>
                <div className="aspect-square w-full max-w-md bg-brand-dark p-4 rounded-2xl shadow-lg">
                    {isLoading && <LoadingSkeleton />}
                    {!isLoading && generatedImage && (
                        <img src={generatedImage} alt="Generated sticker" className="w-full h-full object-contain rounded-lg" />
                    )}
                    {error && !isLoading && (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center text-red-400 bg-red-900/20 rounded-lg p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="font-semibold">Generation Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            {generatedImage && !isLoading && (
                <a
                    href={generatedImage}
                    download="sticker.png"
                    className="flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-background transition-all transform hover:scale-105"
                >
                    <DownloadIcon />
                    Download Sticker
                </a>
            )}
            <button
                onClick={onReset}
                className="flex items-center justify-center px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-brand-background transition-colors"
            >
                <ResetIcon />
                Convert Another
            </button>
        </div>
    </div>
  );
};
