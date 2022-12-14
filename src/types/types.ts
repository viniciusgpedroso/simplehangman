import { type } from 'os';

export interface IEntry {
  w: string;
  c: string;
  h: string;
}

export interface DecodingResult {
  error: string;
  decoded: IEntry[] | null;
}

export interface HangmanLetterValue {
  clicked: boolean;
  indexes: number[];
}

export interface IProgress {
  current: number;
  total: number;
}

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const WON_SCORE = 10;
