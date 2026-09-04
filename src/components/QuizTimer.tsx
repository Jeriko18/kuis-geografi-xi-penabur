import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface QuizTimerProps {
  timeLeft: number; // in seconds
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Warning level
  let timerStyle = "bg-slate-800 border-slate-700 text-teal-300";
  let isCritical = false;

  if (timeLeft <= 60) {
    // Critical: < 1 minute
    timerStyle = "bg-rose-950/80 border-rose-500/80 text-rose-300 animate-pulse";
    isCritical = true;
  } else if (timeLeft <= 300) {
    // Warning: < 5 minutes
    timerStyle = "bg-amber-950/80 border-amber-500/80 text-amber-300";
  } else if (timeLeft <= 600) {
    // Caution: < 10 minutes
    timerStyle = "bg-slate-800 border-amber-500/40 text-amber-200";
  }

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm sm:text-base transition-colors ${timerStyle}`}>
      {isCritical ? (
        <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
      ) : (
        <Clock className="w-4 h-4 text-teal-400" />
      )}
      <span>{formattedTime}</span>
    </div>
  );
};
