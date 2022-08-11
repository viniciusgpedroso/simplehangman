import { type } from "os";

export interface IEntry {
  words: string;
  category: string;
  hint: string;
}

export interface DecodingResult {
  error: string;
  decoded: IEntry[] | null;
}

export interface HangmanLetterValue {
  clicked: boolean;
  indexes: number[];
}

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WON_SCORE = 10;
