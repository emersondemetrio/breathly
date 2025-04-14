import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { BreathingStep } from '~/types';
import {
  isActiveAtom,
  stepAtom,
  countAtom,
  temposInAtom,
  currentSessionAtom,
  totalSessionsAtom,
  countUpAtom,
  tempoAtom,
  preparingCountAtom,
  completedSessionsAtom,
  isPreparingAtom,
} from '~/atoms/breathly';

export const useBreathingTimer = () => {
  // Read-only atoms
  const [isActive] = useAtom(isActiveAtom);
  const [isPreparing] = useAtom(isPreparingAtom);
  const [step] = useAtom(stepAtom);
  const [temposIn] = useAtom(temposInAtom);
  const [currentSession] = useAtom(currentSessionAtom);
  const [totalSessions] = useAtom(totalSessionsAtom);
  const [countUp] = useAtom(countUpAtom);
  const [tempo] = useAtom(tempoAtom);

  // Writable atoms
  const setStep = useSetAtom(stepAtom);
  const setCount = useSetAtom(countAtom);
  const setCurrentSession = useSetAtom(currentSessionAtom);
  const setCompletedSessions = useSetAtom(completedSessionsAtom);
  const setIsActive = useSetAtom(isActiveAtom);
  const setPreparingCount = useSetAtom(preparingCountAtom);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (isPreparing) {
        setPreparingCount(prev => {
          if (prev <= 1) {
            setStep(BreathingStep.INHALE);
            // Set initial count based on count direction
            setCount(countUp ? 1 : temposIn);
            return 3;
          }
          return prev - 1;
        });
        return;
      }

      setCount(prevCount => {
        const newCount = countUp ? prevCount + 1 : prevCount - 1;

        if (step === BreathingStep.INHALE) {
          // For inhale: count from 1 to temposIn or from temposIn to 1
          if (countUp ? newCount > temposIn : newCount < 1) {
            setStep(BreathingStep.EXHALE);
            // Set initial count for exhale based on count direction
            return countUp ? 1 : temposIn * 2;
          }
        } else {
          // For exhale: count from 1 to temposIn*2 or from temposIn*2 to 1
          if (countUp ? newCount > temposIn * 2 : newCount < 1) {
            // Increment completed sessions when a session is finished
            setCompletedSessions(prev => prev + 1);

            if (currentSession >= totalSessions) {
              // All sessions completed
              setIsActive(false);
              setStep(BreathingStep.IDLE);
              setCurrentSession(totalSessions + 1); // Set to total + 1 to trigger completion view
              return 1;
            }
            // Move to next session
            setStep(BreathingStep.INHALE);
            setCurrentSession(prev => prev + 1);
            // Set initial count for next inhale based on count direction
            return countUp ? 1 : temposIn;
          }
        }

        return newCount;
      });
    }, 1000 * tempo);

    return () => clearInterval(interval);
  }, [
    isActive,
    isPreparing,
    step,
    temposIn,
    currentSession,
    totalSessions,
    countUp,
    tempo,
    setCount,
    setStep,
    setCurrentSession,
    setCompletedSessions,
    setIsActive,
    setPreparingCount,
  ]);
};
