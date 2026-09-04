import React from 'react';
import { UserAnswers, CheckedQuestions, Question } from '../types/quiz';

interface QuestionNavigatorProps {
  questions: Question[];
  currentIndex: number;
  userAnswers: UserAnswers;
  checkedQuestions: CheckedQuestions;
  onSelectQuestion: (index: number) => void;
  activeFilter: 'semua' | 'maritim' | 'flora-fauna';
  onFilterChange: (filter: 'semua' | 'maritim' | 'flora-fauna') => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentIndex,
  userAnswers,
  checkedQuestions,
  onSelectQuestion,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="font-bold text-slate-800 text-sm">Navigasi Soal (1–60)</h4>
        <span className="text-xs text-slate-500 font-mono">
          {Object.keys(userAnswers).length} / {questions.length} Dijawab
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
        <button
          onClick={() => onFilterChange('semua')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeFilter === 'semua' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Semua (60)
        </button>
        <button
          onClick={() => onFilterChange('maritim')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeFilter === 'maritim' ? 'bg-white shadow text-teal-800' : 'text-slate-500 hover:text-teal-800'
          }`}
        >
          Maritim (30)
        </button>
        <button
          onClick={() => onFilterChange('flora-fauna')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeFilter === 'flora-fauna' ? 'bg-white shadow text-emerald-800' : 'text-slate-500 hover:text-emerald-800'
          }`}
        >
          Flora-Fauna (30)
        </button>
      </div>

      {/* Grid Numbers */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 max-h-72 overflow-y-auto pr-1 pt-1">
        {questions.map((q, idx) => {
          if (activeFilter === 'maritim' && q.section !== 'Poros Maritim Indonesia') return null;
          if (activeFilter === 'flora-fauna' && q.section !== 'Flora dan Fauna Indonesia') return null;

          const isCurrent = idx === currentIndex;
          const isAnswered = userAnswers[q.id] !== undefined;
          const isChecked = checkedQuestions[q.id] === true;
          const isCorrect = isChecked && userAnswers[q.id] === q.answer;
          const isWrong = isChecked && userAnswers[q.id] !== q.answer;

          let btnClass = "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200";

          if (isCurrent) {
            btnClass = "ring-2 ring-teal-500 ring-offset-1 font-extrabold bg-navy-900 text-white border-navy-900";
          } else if (isWrong) {
            btnClass = "bg-rose-100 text-rose-800 border-rose-300 font-bold";
          } else if (isCorrect) {
            btnClass = "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
          } else if (isAnswered) {
            btnClass = "bg-teal-100 text-teal-800 border-teal-300 font-semibold";
          }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`h-9 w-full rounded-lg text-xs font-mono border flex items-center justify-center transition-all ${btnClass}`}
            >
              {q.id}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300"></span>
          <span>Belum dikerjakan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-teal-100 border border-teal-300"></span>
          <span>Sudah dipilih</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>
          <span>Jawaban Benar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300"></span>
          <span>Jawaban Salah</span>
        </div>
      </div>
    </div>
  );
};
