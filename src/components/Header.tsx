import React from 'react';
import { Compass, BookOpen, Clock } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  onOpenInstructions: () => void;
  isQuizActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, onOpenInstructions, isQuizActive }) => {
  return (
    <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-40 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={onGoHome} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="bg-teal-600 p-2 rounded-lg group-hover:bg-teal-500 transition-colors">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl tracking-tight leading-tight">
              Kuis Geografi XI
            </h1>
            <p className="text-xs text-teal-300 font-medium">SMA BPK PENABUR</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenInstructions}
            className="flex items-center space-x-1.5 text-xs sm:text-sm bg-navy-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition-all"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Petunjuk</span>
          </button>
          
          <div className="hidden sm:flex items-center text-xs font-semibold tracking-wider text-sand-200 bg-teal-900/40 border border-teal-500/30 px-3 py-1.5 rounded-full">
            <span>MADE BY GEOFREY</span>
          </div>
        </div>
      </div>
    </header>
  );
};
