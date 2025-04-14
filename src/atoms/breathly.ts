import { atom } from 'jotai';
import { BreathingStep } from '~/types';
import type { Language } from '~/types';
import { MAX_BREATH_DURATION } from '~/constants';

// Default initial tempo value (4 tempos = 4 seconds per breath phase)
const DEFAULT_INITIAL_TEMPO = 4;

// Language and UI atoms
export const languageAtom = atom<Language>('pt');
export const showSettingsAtom = atom<boolean>(false);

// Core breathing atoms
export const isActiveAtom = atom<boolean>(false);
export const stepAtom = atom<BreathingStep>(BreathingStep.IDLE);
export const countAtom = atom<number>(DEFAULT_INITIAL_TEMPO);
export const temposInAtom = atom<number>(DEFAULT_INITIAL_TEMPO);
export const totalSessionsAtom = atom<number>(2);
export const currentSessionAtom = atom<number>(1);
export const completedSessionsAtom = atom<number>(0);
export const countUpAtom = atom<boolean>(true);
export const tempoAtom = atom<number>(1);
export const preparingCountAtom = atom<number>(3);

// Derived atoms
export const isPreparingAtom = atom(
  (get) => get(stepAtom) === BreathingStep.PREPARING
);

// Action atoms
export const updateTemposInAtom = atom(
  null,
  (get, set, newTempos: number) => {
    if (newTempos > MAX_BREATH_DURATION) return;
    set(temposInAtom, newTempos);
    set(countAtom, newTempos);
  }
);

export const updateTempoAtom = atom(
  null,
  (get, set, newTempo: number) => {
    if (newTempo < 1 || newTempo > 10) return;
    set(tempoAtom, newTempo);
  }
);

export const toggleCountDirectionAtom = atom(
  null,
  (get, set) => {
    set(countUpAtom, !get(countUpAtom));
  }
);

export const startSessionAtom = atom(
  null,
  (get, set) => {
    set(isActiveAtom, true);
    set(stepAtom, BreathingStep.PREPARING);
    set(countAtom, get(countUpAtom) ? 1 : get(temposInAtom));
    set(currentSessionAtom, 1);
    set(preparingCountAtom, 3);
  }
);

export const finishSessionAtom = atom(
  null,
  (get, set) => {
    set(isActiveAtom, false);
    set(stepAtom, BreathingStep.INHALE);
    set(countAtom, get(countUpAtom) ? 1 : get(temposInAtom));
    set(completedSessionsAtom, get(completedSessionsAtom) + get(currentSessionAtom));
    set(currentSessionAtom, 1);
    set(preparingCountAtom, 3);
  }
);

export const resetSessionAtom = atom(
  null,
  (get, set) => {
    set(isActiveAtom, false);
    set(stepAtom, BreathingStep.INHALE);
    set(countAtom, get(countUpAtom) ? 1 : get(temposInAtom));
    set(currentSessionAtom, 1);
    set(preparingCountAtom, 3);
  }
);

// UI helper atoms
export const borderClassAtom = atom((get) => {
  const isActive = get(isActiveAtom);
  const isPreparing = get(isPreparingAtom);
  const step = get(stepAtom);

  if (!isActive || isPreparing) return "";
  return step === BreathingStep.INHALE ? "border-4 border-indigo-600" : "border-2 border-pink-300";
});

export const backgroundClassAtom = atom((get) => {
  const isActive = get(isActiveAtom);
  const isPreparing = get(isPreparingAtom);
  const step = get(stepAtom);

  if (!isActive || isPreparing) {
    return "bg-gradient-to-br from-indigo-400 via-indigo-300 to-pink-200";
  }
  return step === BreathingStep.INHALE
    ? "bg-gradient-to-br from-green-300 via-green-200 to-emerald-200"
    : "bg-gradient-to-br from-blue-300 via-blue-200 to-cyan-200";
});
