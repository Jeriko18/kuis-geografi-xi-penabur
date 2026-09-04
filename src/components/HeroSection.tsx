import React from 'react';
import { Compass, Ship, Trees, Award, Play, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HeroSectionProps {
  onStartQuiz: () => void;
  hasSavedProgress: boolean;
  onResumeQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  hasSavedProgress,
  onResumeQuiz,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-[#0a4657] to-teal-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-2xl my-6 border border-teal-500/20">
      {/* Decorative SVG Wave Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-teal-200">
          <Compass className="w-4 h-4 text-coral-500 animate-spin-slow" />
          <span>Mata Pelajaran Geografi Kelas XI — BPK PENABUR</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
          Evaluasi Pembelajaran <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sand-200 to-coral-500">
            Poros Maritim & Biogeografi Indonesia
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Uji pemahaman analitis Anda melalui 60 soal pilihan ganda interaktif berbasis konteks geografis, peta konsep, kasus lingkungan, dan potensi kemaritiman Indonesia.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
          <div className="bg-navy-900/60 backdrop-blur border border-teal-500/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Ship className="w-4 h-4 text-coral-500" />
              <span>30 Soal</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Poros Maritim Indonesia</p>
          </div>

          <div className="bg-navy-900/60 backdrop-blur border border-teal-500/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Trees className="w-4 h-4 text-teal-400" />
              <span>30 Soal</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Flora & Fauna Indonesia</p>
          </div>

          <div className="bg-navy-900/60 backdrop-blur border border-teal-500/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Award className="w-4 h-4 text-sand-300" />
              <span>C2 — C5</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">HOTS & Analisis Kasus</p>
          </div>

          <div className="bg-navy-900/60 backdrop-blur border border-teal-500/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>45 Menit</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Batas Waktu Standar</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasSavedProgress && (
            <button
              onClick={onResumeQuiz}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Lanjutkan Kuis Tersimpan</span>
            </button>
          )}

          <button
            onClick={onStartQuiz}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 ${
              hasSavedProgress
                ? 'bg-navy-800 hover:bg-slate-700 border border-teal-500/40'
                : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral-900/40'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{hasSavedProgress ? 'Mulai Kuis Baru' : 'Mulai Pengerjaan Kuis'}</span>
          </button>
        </div>

        {/* Branding Footer */}
        <div className="pt-4 border-t border-teal-500/20 flex items-center justify-between text-xs text-slate-400">
          <span>Target Kompetensi: Kurikulum Merdeka / XI</span>
          <span className="font-extrabold tracking-widest text-sand-200">BRANDING: MADE BY GEOFREY</span>
        </div>
      </div>
    </div>
  );
};
