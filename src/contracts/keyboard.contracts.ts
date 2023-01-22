import allKeyUps from "../../src/assets/keyups.json";

export interface KeyUp {
  code: string;
  symbol: string;
  additionalSymbol?: string;
  type: 'manager' | 'letter';
  line?: number;
  alias?: string;
}

export const keyUps = allKeyUps as KeyUp[];

export const letterKeyUps = keyUps.reduce((result, x) => {
  if (x.type === 'letter') {
    return {
      ...result,
      [x.code]: x
    }
  }
  return result;
}, {} as Record<string, KeyUp>);

export const managerKeyUps = keyUps.reduce((result, x) => {
  if (x.type === 'manager') {
    return {
      ...result,
      [x.code]: x
    }
  }
  return result;
}, {} as Record<string, KeyUp>);