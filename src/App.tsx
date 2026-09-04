import React, { useState, useEffect } from 'react';
import { questions, QUIZ_DURATION_MINUTES } from './data/questions';
import { UserAnswers, CheckedQuestions } from './types/quiz';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuizCard } from './components/QuizCard';
import { QuestionNavigator } from './components/QuestionNavigator';
import { QuizTimer } from './components/QuizTimer';
import { ResultSummary } from './components/ResultSummary';
import { CheckCircle2, RotateCcw, AlertCircle, X, HelpCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [checkedQuestions, setCheckedQuestions] = useState<CheckedQuestions>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_DURATION_MINUTES * 60);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'semua' | 'maritim' | 'flora-fauna'>('semua');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Restore progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('geography_quiz_penabur');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (parsed.checkedQuestions) setCheckedQuestions(parsed.checkedQuestions);
        if (parsed.timeLeft !== undefined && parsed.timeLeft > 0) setTimeLeft(parsed.timeLeft);
        if (parsed.currentIndex !== undefined) setCurrentIndex(parsed.currentIndex);
      } catch (e) {
        console.error("Error restoring quiz state", e);
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!started || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeOut(true);
          setIsFinished(true);
          return 0;
        }
        const updated = prev - 1;
        // Save state to localStorage
        localStorage.setItem(
          'geography_quiz_penabur',
          JSON.stringify({
            userAnswers,
            checkedQuestions,
            timeLeft: updated,
            currentIndex,
          })
        );
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, isFinished, userAnswers, checkedQuestions, currentIndex]);

  const handleStartQuiz = () => {
    setStarted(true);
    setIsFinished(false);
    setIsTimeOut(false);
    setCurrentIndex(0);
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleCheckAnswer = () => {
    const qId = questions[currentIndex].id;
    setCheckedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
  };

  const handleResetQuiz = () => {
    localStorage.removeItem('geography_quiz_penabur');
    setUserAnswers({});
    setCheckedQuestions({});
    setTimeLeft(QUIZ_DURATION_MINUTES * 60);
    setCurrentIndex(0);
    setIsFinished(false);
    setStarted(false);
    setShowResetConfirm(false);
  };

  const handleRestartWrongOnly = () => {
    // Keep answers for correct ones, clear wrong ones
    const newAnswers: UserAnswers = {};
    const newChecked: CheckedQuestions = {};

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        newAnswers[q.id] = q.answer;
        newChecked[q.id] = true;
      }
    });

    setUserAnswers(newAnswers);
    setCheckedQuestions(newChecked);
    setIsFinished(false);
    setStarted(true);
    setCurrentIndex(0);
  };

  const currentQ = questions[currentIndex];
  const timeUsedSeconds = QUIZ_DURATION_MINUTES * 60 - timeLeft;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header
        onGoHome={() => setStarted(false)}
        onOpenInstructions={() => setShowInstructions(true)}
        isQuizActive={started && !isFinished}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!started ? (
          <HeroSection
            onStartQuiz={handleStartQuiz}
            hasSavedProgress={Object.keys(userAnswers).length > 0}
            onResumeQuiz={() => {
              setStarted(true);
            }}
          />
        ) : isFinished ? (
          <ResultSummary
            questions={questions}
            userAnswers={userAnswers}
            timeUsedSeconds={timeUsedSeconds}
            isTimeOut={isTimeOut}
            onRestartAll={handleResetQuiz}
            onRestartWrongOnly={handleRestartWrongOnly}
            onJumpToQuestion={(idx) => {
              setIsFinished(false);
              setCurrentIndex(idx);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Top Controls & Timer Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <QuizTimer timeLeft={timeLeft} />
                <div className="text-xs text-slate-500 hidden sm:block">
                  Progres: <strong className="text-slate-800">{Object.keys(userAnswers).length}</strong> dari 60 Soal
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Kuis</span>
                </button>

                <button
                  onClick={handleFinishQuiz}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan Kuis</span>
                </button>
              </div>
            </div>

            {/* Main Quiz Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuizCard
                  question={currentQ}
                  selectedOption={userAnswers[currentQ.id]}
                  isChecked={checkedQuestions[currentQ.id] || false}
                  onSelectOption={handleSelectOption}
                  onCheckAnswer={handleCheckAnswer}
                  onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                  onPrev={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  isFirst={currentIndex === 0}
                  isLast={currentIndex === questions.length - 1}
                />
              </div>

              <div className="lg:col-span-1">
                <QuestionNavigator
                  questions={questions}
                  currentIndex={currentIndex}
                  userAnswers={userAnswers}
                  checkedQuestions={checkedQuestions}
                  onSelectQuestion={(idx) => setCurrentIndex(idx)}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Petunjuk */}
      {showInstructions && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 relative border border-slate-200">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <span>Petunjuk Pengerjaan Kuis</span>
            </h3>

            <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed">
              <p>1. Pilih salah satu opsi jawaban A–E yang paling tepat untuk setiap soal.</p>
              <p>2. Klik tombol <strong>Periksa Jawaban</strong> untuk mengunci opsi dan melihat kunci serta pembahasan lengkap.</p>
              <p>3. Waktu default pengerjaan adalah <strong>45 menit</strong> dan dihitung mundur secara real-time.</p>
              <p>4. Gunakan panel navigasi nomor soal (1–60) untuk berpindah ke nomor tertentu secara cepat.</p>
              <p>5. Klik <strong>Selesaikan Kuis</strong> kapan saja untuk melihat rangkuman skor akhir dan evaluasi.</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-4 py-2 bg-navy-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
              >
                Paham & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 relative">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>Konfirmasi Ulangi Kuis</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600">
              Apakah Anda yakin ingin mengulang dari awal? Semua jawaban tersimpan dan timer akan di-reset.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-lg hover:bg-rose-700"
              >
                Ya, Reset Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="bg-navy-900 text-slate-400 text-xs py-6 border-t border-navy-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-200">Kuis Geografi Kelas XI SMA BPK PENABUR</p>
            <p className="text-[11px] text-slate-400">Poros Maritim Indonesia | Flora & Fauna Indonesia</p>
          </div>
          <div className="font-extrabold tracking-widest text-sand-200 bg-navy-800 px-3 py-1.5 rounded-md border border-slate-700">
            MADE BY GEOFREY
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
