export enum SimulationStatus {
  NONE,
  READY,
  START,
  PAUSE,
  END,
  RESULT
}

export interface Letter {
  content: string;
  key: string;
  wordKey: string;
}

export interface Word {
  letters: Letter[];
  key: string;
  paragraphKey: string;
}

export interface Paragraph {
  words: Word[];
  key: string;
}

export interface PressResult {
  correct: string;
  current: string;
}

export interface SimulationProgress {
  completePercent: number;
  accuracy: number;
  leftLetters: number;
  leftWords: number;
  leftParagraphs: number;
  time: string;
  speed: number;
}

export type SimulationProgressField = keyof SimulationProgress;

export interface SessionResult {
  accuracy: number;
  totalLetters: number;
  totalWords: number;
  totalParagraphs: number;
  time: number;
  date: number;
  speed: number;
}

export interface SessionStats {
  avgAccuracy: number;
  avgSpeed: number;
  totalTime: string;
  totalLetters: number;
  totalWords: number;
  totalParagraphs: number;
}