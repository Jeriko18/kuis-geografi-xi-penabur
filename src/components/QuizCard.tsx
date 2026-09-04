import React from 'react';
import { Question } from '../types/quiz';
import { CheckCircle2, HelpCircle, AlertCircle, Bookmark } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | 'E';
  isChecked: boolean;
  onSelectOption: (option: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  onCheckAnswer: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedOption,
  isChecked,
  onSelectOption,
  onCheckAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const optionsKeys: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      {/* Header Badges */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-navy-900 text-white font-extrabold text-sm px-3 py-1 rounded-md">
            Soal #{question.id}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            {question.section}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {question.subtopic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
            {question.cognitiveLevel}
          </span>
          <span className="text-xs font-medium text-slate-500">
            Tingkat: {question.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Indikator */}
        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2">
          <Bookmark className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span><strong>Indikator:</strong> {question.indicator}</span>
        </div>

        {/* Stimulus */}
        {question.stimulus && (
          <div className="bg-teal-50/60 border-l-4 border-teal-600 p-4 rounded-r-xl text-sm text-slate-800 leading-relaxed italic">
            "{question.stimulus}"
          </div>
        )}

        {/* Pertanyaan */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {optionsKeys.map((key) => {
            const isSelected = selectedOption === key;
            const isCorrect = key === question.answer;

            let optionStyle = "border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-800";
            let badgeStyle = "bg-slate-100 text-slate-600 border-slate-300";

            if (isChecked) {
              if (isCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else if (isSelected && !isCorrect) {
                optionStyle = "border-rose-500 bg-rose-50 text-rose-900";
                badgeStyle = "bg-rose-600 text-white border-rose-600";
              } else {
                optionStyle = "border-slate-200 opacity-60 text-slate-500";
              }
            } else if (isSelected) {
              optionStyle = "border-teal-600 bg-teal-50/50 text-teal-900 font-medium shadow-sm";
              badgeStyle = "bg-teal-600 text-white border-teal-600";
            }

            return (
              <button
                key={key}
                disabled={isChecked}
                onClick={() => onSelectOption(key)}
                className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base flex items-start gap-3 transition-all ${optionStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg border font-bold flex items-center justify-center shrink-0 text-sm ${badgeStyle}`}>
                  {key}
                </span>
                <span className="mt-0.5 leading-relaxed flex-1">
                  {question.options[key]}
                </span>
                {isChecked && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isChecked && isSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button: Periksa Jawaban */}
        {!isChecked && (
          <div className="pt-2">
            <button
              disabled={!selectedOption}
              onClick={onCheckAnswer}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                selectedOption
                  ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-900/20'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Periksa Jawaban
            </button>
          </div>
        )}

        {/* Explanation Panel */}
        {isChecked && (
          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl space-y-3 border border-slate-800 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pembahasan & Kunci Jawaban: Pilihan ({question.answer})</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {question.explanation}
            </p>

            {question.wrongAnswerExplanation && (
              <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 italic">
                {question.wrongAnswerExplanation}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs text-slate-400 font-semibold mr-1">Konsep Kunci:</span>
              {question.keyConcepts.map((concept, idx) => (
                <span key={idx} className="text-xs bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
                  #{concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            disabled={isFirst}
            onClick={onPrev}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              isFirst
                ? 'opacity-40 border-slate-200 cursor-not-allowed text-slate-400'
                : 'border-slate-300 hover:bg-slate-100 text-slate-700'
            }`}
          >
            ← Soal Sebelumnya
          </button>

          <button
            disabled={isLast}
            onClick={onNext}
            className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm ${
              isLast
                ? 'opacity-40 bg-slate-400 cursor-not-allowed'
                : 'bg-navy-900 hover:bg-slate-800'
            }`}
          >
            Soal Berikutnya →
          </button>
        </div>
      </div>
    </div>
  );
};
