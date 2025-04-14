"use client";

import { useAtom } from "jotai";
import { BreathingStep } from "~/types";
import { createTranslations } from "~/lang/translations";
import {
  languageAtom,
  stepAtom,
  completedSessionsAtom,
  preparingCountAtom,
  countAtom
} from "~/atoms/breathly";

export function BreathingPhase() {
  const [language] = useAtom(languageAtom);
  const [step] = useAtom(stepAtom);
  const [completedSessions] = useAtom(completedSessionsAtom);
  const [preparingCount] = useAtom(preparingCountAtom);
  const [count] = useAtom(countAtom);

  const { t } = createTranslations(language);

  const getDisplayText = () => {
    switch (step) {
      case BreathingStep.PREPARING:
        return t('preparing');
      case BreathingStep.INHALE:
        return t('inhale');
      case BreathingStep.EXHALE:
        return t('exhale');
      case BreathingStep.FINISHED:
        return t('completedSessions', { count: completedSessions.toString() });
      default:
        return '';
    }
  };

  const getDisplayCount = (): number | string => {
    if (step === BreathingStep.PREPARING) {
      return preparingCount;
    }
    if (step === BreathingStep.FINISHED) {
      return '';
    }
    return count;
  };

  return (
    <div className="h-32 flex flex-col items-center justify-center">
      <div className="h-12 flex items-center justify-center">
        <div className="text-4xl font-bold text-indigo-600 min-w-[200px] text-center">
          {getDisplayText()}
        </div>
      </div>
      <div className="h-12 flex items-center justify-center">
        <div className="text-3xl font-mono text-indigo-500 min-w-[80px] text-center">
          {getDisplayCount()}
        </div>
      </div>
    </div>
  );
}