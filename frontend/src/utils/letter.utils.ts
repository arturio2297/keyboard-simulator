import {Letter, PressResult} from "../contracts/simulation.contracts";

export const isSpace = (letter: Letter): boolean => {
  return letter.content === ' ';
}

export const isNewLine = (letter: Letter): boolean => {
  return letter.content === 'nl';
}

export const isCurrent = (letter1: Letter, letter2?: Letter): boolean => {
  if (!letter2) return false;
  return letter1.key === letter2.key;
}

export const formatLetter = (letter: Letter): string => {
  if (letter.content === 'nl') return '';
  return letter.content;
}

export const isCorrect = (result?: PressResult): boolean => {
  if (!result) return false;
  return result.correct === result.current;
}

export const isIncorrect = (result?: PressResult): boolean => {
  if (!result) return false;
  return result.correct !== result.current;
}