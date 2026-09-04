export type CognitiveLevel = 'C2' | 'C3' | 'C4' | 'C5';
export type Section = 'Poros Maritim Indonesia' | 'Flora dan Fauna Indonesia';
export type Difficulty = 'Mudah' | 'Sedang' | 'Menantang';

export interface Question {
  id: number;
  section: Section;
  subtopic: string;
  indicator: string;
  cognitiveLevel: CognitiveLevel;
  difficulty: Difficulty;
  stimulus?: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  wrongAnswerExplanation?: string;
  keyConcepts: string[];
}

export type UserAnswers = Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>;
export type CheckedQuestions = Record<number, boolean>;

export interface QuizState {
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  checkedQuestions: CheckedQuestions;
  isFinished: boolean;
  timeLeft: number;
  activeFilter: 'semua' | 'maritim' | 'flora-fauna';
}
