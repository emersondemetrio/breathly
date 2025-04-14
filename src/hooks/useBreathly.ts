"use client";

import { useState, useCallback, useEffect } from "react";
import { MAX_BREATH_DURATION } from "~/constants";

type Phase = "inhale" | "exhale";

type BreathlyState = {
  isActive: boolean;
  isPreparing: boolean;
  preparingCount: number;
  phase: Phase;
  count: number;
  secondsIn: number;
  totalSessions: number;
  sessionCount: number;
  completedSessions: number;
  countUp: boolean;
};

export const useBreathly = (initialSecondsIn: number) => {
  const [state, setState] = useState<BreathlyState>({
    isActive: false,
    isPreparing: false,
    preparingCount: 3,
    phase: "inhale",
    count: initialSecondsIn,
    secondsIn: initialSecondsIn,
    totalSessions: 5,
    sessionCount: 1,
    completedSessions: 0,
    countUp: true,
  });

  const setSecondsIn = useCallback((seconds: number) => {
    if (seconds > MAX_BREATH_DURATION) return;
    setState((prev) => ({ ...prev, secondsIn: seconds, count: seconds }));
  }, []);

  const setTotalSessions = useCallback((sessions: number) => {
    setState((prev) => ({ ...prev, totalSessions: sessions }));
  }, []);

  const toggleCountDirection = useCallback(() => {
    setState((prev) => ({ ...prev, countUp: !prev.countUp }));
  }, []);

  const startSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      isPreparing: true,
      preparingCount: 3,
      phase: "inhale",
      count: prev.countUp ? 0 : prev.secondsIn,
      sessionCount: 1,
    }));
  }, []);

  const finishSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
      isPreparing: false,
      preparingCount: 3,
      phase: "inhale",
      count: prev.countUp ? 0 : prev.secondsIn,
      completedSessions: prev.completedSessions + prev.sessionCount - 1,
    }));
  }, []);

  const resetSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
      isPreparing: false,
      preparingCount: 3,
      phase: "inhale",
      count: prev.countUp ? 0 : prev.secondsIn,
      sessionCount: 1,
    }));
  }, []);

  // Get the appropriate border class based on the current state
  const getBorderClass = useCallback(() => {
    if (!state.isActive) return '';
    if (state.isPreparing) return '';
    if (state.phase === 'inhale') return 'border-4 border-indigo-600';
    if (state.phase === 'exhale') return 'border-2 border-pink-300';
    return '';
  }, [state.isActive, state.isPreparing, state.phase]);

  // Get the appropriate background class based on the current state
  const getBackgroundClass = useCallback(() => {
    if (!state.isActive) return 'bg-gradient-to-br from-indigo-400 via-indigo-300 to-pink-200';
    if (state.isPreparing) return 'bg-gradient-to-br from-indigo-400 via-indigo-300 to-pink-200';
    if (state.phase === 'inhale') return 'bg-gradient-to-br from-green-300 via-green-200 to-emerald-200';
    if (state.phase === 'exhale') return 'bg-gradient-to-br from-blue-300 via-blue-200 to-cyan-200';
    return 'bg-gradient-to-br from-indigo-400 via-indigo-300 to-pink-200';
  }, [state.isActive, state.isPreparing, state.phase]);

  useEffect(() => {
    if (!state.isActive) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.isPreparing) {
          if (prev.preparingCount <= 1) {
            return {
              ...prev,
              isPreparing: false,
              phase: "inhale",
              count: prev.countUp ? 0 : prev.secondsIn,
            };
          }
          return {
            ...prev,
            preparingCount: prev.preparingCount - 1,
          };
        }

        if (prev.phase === "inhale") {
          if (prev.countUp ? prev.count >= prev.secondsIn : prev.count <= 0) {
            return {
              ...prev,
              phase: "exhale",
              count: prev.countUp ? 0 : prev.secondsIn * 2,
            };
          }
          return {
            ...prev,
            count: prev.countUp ? prev.count + 1 : prev.count - 1,
          };
        }

        if (prev.phase === "exhale") {
          if (prev.countUp ? prev.count >= prev.secondsIn * 2 : prev.count <= 0) {
            if (prev.sessionCount >= prev.totalSessions) {
              return {
                ...prev,
                isActive: false,
                isPreparing: false,
                preparingCount: 3,
                phase: "inhale",
                count: prev.countUp ? 0 : prev.secondsIn,
                sessionCount: 1,
                completedSessions: prev.completedSessions + prev.totalSessions,
              };
            }
            return {
              ...prev,
              phase: "inhale",
              count: prev.countUp ? 0 : prev.secondsIn,
              sessionCount: prev.sessionCount + 1,
            };
          }
          return {
            ...prev,
            count: prev.countUp ? prev.count + 1 : prev.count - 1,
          };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isActive]);

  return {
    ...state,
    setSecondsIn,
    setTotalSessions,
    toggleCountDirection,
    startSession,
    finishSession,
    resetSession,
    getBorderClass,
    getBackgroundClass,
  };
};