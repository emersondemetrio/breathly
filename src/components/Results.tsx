import { useAtom } from 'jotai';
import { languageAtom, totalSessionsAtom, completedSessionsAtom, currentSessionAtom, stepAtom, isActiveAtom } from '~/atoms/breathly';
import { createTranslations } from '~/lang/translations';
import { BreathingStep } from '~/types';

export const Results: React.FC = () => {
  const [language] = useAtom(languageAtom);
  const [totalSessions] = useAtom(totalSessionsAtom);
  const [completedSessions] = useAtom(completedSessionsAtom);
  const [, setCurrentSession] = useAtom(currentSessionAtom);
  const [, setStep] = useAtom(stepAtom);
  const [, setIsActive] = useAtom(isActiveAtom);

  const { t } = createTranslations(language);

  const handleStartOver = () => {
    setCurrentSession(1);
    setStep(BreathingStep.IDLE);
    setIsActive(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-4 border-indigo-200 min-h-[600px] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-indigo-600">{t('resultsTitle')}</h2>
        <p className="text-lg text-gray-600">
          {t('resultsCompleted', { completed: completedSessions, total: totalSessions })}
        </p>
        <p className="text-lg text-gray-600">{t('resultsCongratulations')}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleStartOver}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          {t('startOver')}
        </button>
      </div>
    </div>
  );
};