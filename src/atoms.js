// atoms.js
import { atom } from 'jotai';

// Define atoms for all state variables
export const genderAtom = atom("male");
export const ageAtom = atom("");
export const weightAtom = atom("");
export const heightAtom = atom("");
export const activityLevelAtom = atom(1.2);
export const bmiAtom = atom(null);
export const tdeeAtom = atom(null);
export const errorAtom = atom("");