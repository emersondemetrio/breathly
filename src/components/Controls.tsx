"use client";
import { useAtom } from "jotai";
import { BreathingStep } from "~/types";
import { createTranslations } from "~/lang/translations";
import {
  languageAtom,
  stepAtom,
  startSessionAtom,
  finishSessionAtom
} from "~/atoms/breathly";

export function Controls() {
  const [language] = useAtom(languageAtom);
  const [step] = useAtom(stepAtom);
  const [, startSession] = useAtom(startSessionAtom);
  const [, finishSession] = useAtom(finishSessionAtom);

  const { t } = createTranslations(language);

  return (
    <div className="mt-8 flex justify-center gap-4">
      {step === BreathingStep.IDLE ? (
        <button
          onClick={startSession}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          {t("start")}
        </button>
      ) : step !== BreathingStep.PREPARING &&
        step !== BreathingStep.FINISHED ? (
        <button
          onClick={finishSession}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          {t("finish")}
        </button>
      ) : null}
    </div>
  );
}
