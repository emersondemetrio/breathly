"use client";

import { useAtom } from "jotai";
import { BreathingStep } from "~/types";
import { Description } from "./Description";
import { BreathingPhase } from "./BreathingPhase";
import { Controls } from "./Controls";
import { SessionCount } from "./SessionCount";
import { SettingsPanel } from "./SettingsPanel";
import {
  showSettingsAtom,
  languageAtom,
  stepAtom,
  currentSessionAtom,
  totalSessionsAtom,
} from "~/atoms/breathly";
import { useBreathingTimer } from "~/hooks/useBreathingTimer";
import { Results } from "./Results";
import { createTranslations } from "~/lang/translations";

export const Breathly: React.FC = () => {
  const [showSettings, setShowSettings] = useAtom(showSettingsAtom);
  const [language] = useAtom(languageAtom);
  const [step] = useAtom(stepAtom);
  const [currentSession] = useAtom(currentSessionAtom);
  const [totalSessions] = useAtom(totalSessionsAtom);

  const { t } = createTranslations(language);

  // Initialize the breathing timer
  useBreathingTimer();

  const isCompleted = currentSession > totalSessions;

  if (isCompleted) {
    return <Results />;
  }

  return (
    <div className="flex min-h-[600px] w-full max-w-md flex-col rounded-2xl border-4 border-indigo-200 bg-white p-8 shadow-xl">
      {/* Header - Fixed height */}
      <div className="mb-4 flex h-16 items-center justify-between rounded-lg bg-indigo-50 px-4">
        <h1 className="text-2xl font-bold text-indigo-600">{t("title")}</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-2xl transition-transform hover:scale-110"
          aria-label={showSettings ? t("back") : t("settings")}
        >
          {showSettings ? "←" : "⚙️"}
        </button>
      </div>

      {showSettings ? (
        <SettingsPanel />
      ) : (
        <>
          <div className="flex flex-1 flex-col">
            <>
              {/* Instructions - Fixed height */}
              <div className="mb-4 h-16 rounded-lg bg-blue-50">
                <Description />
              </div>

              {/* Breathing Phase - Fixed height */}
              <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-green-50">
                {step !== BreathingStep.IDLE && <BreathingPhase />}
              </div>

              {/* Controls - Fixed height */}
              <div className="mb-4 flex h-16 items-center justify-center rounded-lg bg-yellow-50">
                <Controls />
              </div>

              {/* Session Count - Fixed height */}
              <div className="mb-4 flex h-12 items-center justify-center rounded-lg bg-purple-50">
                <SessionCount />
              </div>
            </>
          </div>

          {/* Hint - Fixed height with placeholder */}
          <div className="mt-auto flex h-12 items-center justify-center rounded-lg bg-pink-50 text-sm text-gray-500">
            {!showSettings && step === BreathingStep.IDLE
              ? t("startHint")
              : "\u00A0"}
          </div>
        </>
      )}
    </div>
  );
};
