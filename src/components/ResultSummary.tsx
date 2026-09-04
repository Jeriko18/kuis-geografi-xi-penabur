import React from 'react';
import { Question, UserAnswers } from '../types/quiz';
import { Trophy, CheckCircle, XCircle, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

interface ResultSummaryProps {
  questions: Question[];
  userAnswers: UserAnswers;
  timeUsedSeconds: number;
  isTimeOut: boolean;
  onRestartAll: () => void;
  onRestartWrongOnly: () => void;
  onJumpToQuestion: (index: number) => void;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  questions,
  userAnswers,
  timeUsedSeconds,
  isTimeOut,
  onRestartAll,
  onRestartWrongOnly,
  onJumpToQuestion,
}) => {
  let correctCount = 0;
  let wrongCount = 0;
  let unassignedCount = 0;

  const wrongQuestionIndices: number[] = [];

  questions.forEach((q, idx) => {
    const userAns = userAnswers[q.id];
    if (!userAns) {
      unassignedCount++;
      wrongQuestionIndices.push(idx);
    } else if (userAns === q.answer) {
      correctCount++;
    } else {
      wrongCount++;
      wrongQuestionIndices.push(idx);
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);

  let category = "Perlu Belajar Lagi";
  let categoryColor = "text-rose-600 bg-rose-50 border-rose-200";

  if (score >= 85) {
    category = "Sangat Memuaskan (Sangat Baik)";
    categoryColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
  } else if (score >= 70) {
    category = "Baik (Memenuhi KKM PENABUR)";
    categoryColor = "text-teal-700 bg-teal-50 border-teal-200";
  } else if (score >= 50) {
    category = "Cukup (Perlu Pengayaan)";
    categoryColor = "text-amber-700 bg-amber-50 border-amber-200";
  }

  const minutesUsed = Math.floor(timeUsedSeconds / 60);
  const secondsUsed = timeUsedSeconds % 60;

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-8 px-4">
      {/* Banner Hasil */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-center p-8 space-y-6 relative">
        {isTimeOut && (
          <div className="bg-rose-500 text-white text-xs font-bold py-1.5 px-4 rounded-full inline-flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Waktu Pengerjaan Telah Habis!</span>
          </div>
        )}

        <div className="inline-flex p-4 bg-teal-50 rounded-full border border-teal-100">
          <Trophy className="w-12 h-12 text-teal-600" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hasil Kuis Geografi XI BPK PENABUR
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Topik: Poros Maritim Indonesia & Flora-Fauna Indonesia
          </p>
        </div>

        {/* Score Display */}
        <div className="inline-block bg-slate-900 text-white px-8 py-6 rounded-2xl shadow-inner">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Skor Akhir</div>
          <div className="text-5xl font-black text-coral-500 my-1">{score} <span className="text-2xl text-slate-400">/ 100</span></div>
          <div className={`mt-2 text-xs font-bold px-3 py-1 rounded-full border ${categoryColor}`}>
            {category}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
            <div className="text-2xl font-black text-emerald-700">{correctCount}</div>
            <div className="text-xs font-medium text-emerald-800">Jawaban Benar</div>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl">
            <div className="text-2xl font-black text-rose-700">{wrongCount}</div>
            <div className="text-xs font-medium text-rose-800">Jawaban Salah</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <div className="text-2xl font-black text-slate-700">{unassignedCount}</div>
            <div className="text-xs font-medium text-slate-600">Tidak Diisi</div>
          </div>

          <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-xl">
            <div className="text-xl font-black text-teal-800 font-mono">
              {minutesUsed}m {secondsUsed}s
            </div>
            <div className="text-xs font-medium text-teal-800">Waktu Terpakai</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRestartAll}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-navy-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Semua Soal</span>
          </button>

          {wrongQuestionIndices.length > 0 && (
            <button
              onClick={onRestartWrongOnly}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Soal yang Salah ({wrongQuestionIndices.length})</span>
            </button>
          )}
        </div>

        {/* Branding Tag */}
        <div className="pt-4 text-xs font-bold tracking-widest text-slate-400 border-t border-slate-100">
          IDENTITAS PEMBUAT: MADE BY GEOFREY
        </div>
      </div>

      {/* Review Wrong Questions */}
      {wrongQuestionIndices.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500" />
            <span>Daftar Soal yang Perlu Dipelajari Kembali ({wrongQuestionIndices.length} Soal)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {wrongQuestionIndices.map((idx) => {
              const q = questions[idx];
              return (
                <button
                  key={q.id}
                  onClick={() => onJumpToQuestion(idx)}
                  className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/80 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-rose-800">
                    <span>Soal #{q.id}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-600 truncate mt-1">
                    {q.subtopic}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
