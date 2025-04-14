"use client";

import { useAtom } from "jotai";
import { createTranslations } from "~/lang/translations";
import { MAX_BREATH_DURATION } from "~/constants";
import {
  languageAtom,
  temposInAtom,
  totalSessionsAtom,
  tempoAtom,
  countUpAtom,
  updateTemposInAtom,
  updateTempoAtom,
  toggleCountDirectionAtom,
} from "~/atoms/breathly";

export const SettingsPanel = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const [temposIn] = useAtom(temposInAtom);
  const [totalSessions, setTotalSessions] = useAtom(totalSessionsAtom);
  const [tempo] = useAtom(tempoAtom);
  const [countUp] = useAtom(countUpAtom);
  const [, updateTemposIn] = useAtom(updateTemposInAtom);
  const [, updateTempo] = useAtom(updateTempoAtom);
  const [, toggleCountDirection] = useAtom(toggleCountDirectionAtom);

  const { t } = createTranslations(language);

  // Generate description with current values
  const getDescription = () => {
    const params = {
      seconds: temposIn.toString(),
      doubleSeconds: (temposIn * 2).toString(),
      sessions: totalSessions.toString(),
      sessionsText: totalSessions === 1 ? t("session") : t("sessions"),
    };
    return t("description", params);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{t("settings")}</h2>
      </div>

      {/* Instructions Row */}
      <div className="flex flex-col space-y-2">
        <div className="rounded-lg bg-gray-50 p-3 text-gray-600">
          {getDescription()}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Tempo Row */}
      <div className="flex items-center justify-between">
        <div className="w-70%">
          <div className="text-gray-700">{t("tempo")}</div>
          <div className="text-xs text-gray-500">{t("tempoDescription")}</div>
        </div>
        <div className="w-30% flex justify-end space-x-2">
          <button
            onClick={() => updateTempo(Math.max(1, tempo - 0.5))}
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("decrease")}
          >
            -
          </button>
          <span className="text-sm font-medium">{tempo.toFixed(1)}</span>
          <button
            onClick={() => updateTempo(Math.min(10, tempo + 0.5))}
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("increase")}
          >
            +
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Breath Duration Row */}
      <div className="flex items-center justify-between">
        <div className="w-70%">
          <div className="text-gray-700">{t("breathDuration")}</div>
          <div className="text-xs text-gray-500">
            {t("breathInDescription")}
          </div>
        </div>
        <div className="w-30% flex justify-end space-x-2">
          <button
            onClick={() => updateTemposIn(Math.max(2, temposIn - 1))}
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("decrease")}
          >
            -
          </button>
          <span className="text-sm font-medium">{temposIn} tempos</span>
          <button
            onClick={() =>
              updateTemposIn(Math.min(MAX_BREATH_DURATION, temposIn + 1))
            }
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("increase")}
          >
            +
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Breath Out Duration Row */}
      <div className="flex items-center justify-between">
        <div className="w-70%">
          <div className="text-gray-700">Breath Out Duration</div>
          <div className="text-xs text-gray-500">Exhalation time in tempos</div>
        </div>
        <div className="w-30% flex justify-end space-x-2">
          <span className="text-sm font-medium">{temposIn * 2} tempos</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Sessions Row */}
      <div className="flex items-center justify-between">
        <div className="w-70%">
          <div className="text-gray-700">{t("sessionsLabel")}</div>
          <div className="text-xs text-gray-500">
            {t("sessionsDescription")}
          </div>
        </div>
        <div className="w-30% flex justify-end space-x-2">
          <button
            onClick={() => setTotalSessions(Math.max(5, totalSessions - 1))}
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("decrease")}
          >
            -
          </button>
          <span className="text-sm font-medium">{totalSessions}</span>
          <button
            onClick={() => setTotalSessions(totalSessions + 1)}
            className="rounded-lg bg-gray-100 px-3 py-1 text-gray-700"
            aria-label={t("increase")}
          >
            +
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Count Direction Row */}
      <div className="flex items-center justify-between">
        <div className="w-70%">
          <div className="text-gray-700">{t("countDirectionLabel")}</div>
        </div>
        <div className="w-30% flex justify-end space-x-2">
          <button
            onClick={toggleCountDirection}
            className={`rounded-lg px-3 py-1 ${
              countUp ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
            aria-label={t("countUp")}
          >
            ↑
          </button>
          <button
            onClick={toggleCountDirection}
            className={`rounded-lg px-3 py-1 ${
              !countUp
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            aria-label={t("countDown")}
          >
            ↓
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Language Row - Only in settings */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-gray-700">{t("languageLabel")}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("pt")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              language === "pt"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Português"
          >
            PT
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              language === "en"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};
