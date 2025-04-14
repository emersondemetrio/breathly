"use client";

import { useState } from "react";
import { type Language, createTranslations } from "~/lang/translations";
import { useBreathly } from "~/hooks/useBreathly";
import { MAX_BREATH_DURATION } from "~/constants";

const HomePage = () => {
  const [language, setLanguage] = useState<Language>("pt");
  const { t } = createTranslations(language);
  const breathly = useBreathly(4);

  return (
    <main className={`min-h-screen ${breathly.getBackgroundClass()} px-[10%] py-8 flex items-center justify-center`}>
      <div id="app" className={`w-full bg-white rounded-2xl shadow-xl p-8 ${breathly.getBorderClass()}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-indigo-700">{t('title')}</h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-indigo-100 border border-indigo-300 text-indigo-700 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="h-[400px] flex flex-col justify-center" id="breathly-container">
          {!breathly.isActive && (
            <>
              <p className="text-indigo-400 mb-8">
                {t('description', {
                  seconds: breathly.secondsIn,
                  doubleSeconds: breathly.secondsIn * 2,
                  sessions: breathly.totalSessions
                })}
              </p>
              {breathly.completedSessions > 0 && (
                <p className="text-indigo-600 mb-4 text-center">
                  {t('completedSessions', { count: breathly.completedSessions })}
                </p>
              )}
              <div className="space-y-6">
                {/* Time selection buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => breathly.setSecondsIn(2)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      breathly.secondsIn === 2
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    2 {t('seconds')}
                  </button>
                  <button
                    onClick={() => breathly.setSecondsIn(4)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      breathly.secondsIn === 4
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    4 {t('seconds')}
                  </button>
                  <button
                    onClick={() => breathly.setSecondsIn(breathly.secondsIn + 1)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      breathly.secondsIn >= MAX_BREATH_DURATION
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                    disabled={breathly.secondsIn >= MAX_BREATH_DURATION}
                  >
                    + {t('more')}
                  </button>
                </div>

                {/* Repetitions control */}
                <div className="flex justify-center">
                  <button
                    onClick={() => breathly.setTotalSessions(breathly.totalSessions + 1)}
                    className="px-6 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                  >
                    {breathly.totalSessions} {t(breathly.totalSessions === 1 ? 'session' : 'sessions')} (+)
                  </button>
                </div>

                {/* Count direction toggle */}
                <div className="flex justify-center">
                  <button
                    onClick={breathly.toggleCountDirection}
                    className="px-6 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                  >
                    {t(breathly.countUp ? 'countUp' : 'countDown')}
                  </button>
                </div>

                {/* Start button */}
                <button
                  onClick={breathly.startSession}
                  className="w-full bg-indigo-500 text-white px-4 py-3 rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  {t('startButton')}
                </button>
              </div>
            </>
          )}

          {breathly.isActive && (
            <div className="text-center space-y-4 p-8 rounded-xl transition-colors">
              {breathly.isPreparing && (
                <>
                  <p className="text-2xl text-indigo-400">{t('preparing')}</p>
                  <p className="text-8xl font-bold text-indigo-700">
                    {breathly.preparingCount}
                  </p>
                </>
              )}

              {!breathly.isPreparing && (
                <>
                  <p className="text-2xl text-indigo-700">
                    {breathly.phase === 'inhale' ? t('inhale') : t('exhale')}
                  </p>
                  <p className="text-8xl font-bold text-indigo-700">
                    {breathly.count}
                  </p>
                  <p className="text-xl text-indigo-400">
                    {t('session')} {breathly.sessionCount}/{breathly.totalSessions}
                  </p>
                </>
              )}

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={breathly.finishSession}
                  className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                >
                  {t('finish')}
                </button>
                <button
                  onClick={breathly.resetSession}
                  className="px-6 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                >
                  {t('reset')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
