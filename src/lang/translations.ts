export type Language = "pt" | "en";

type TranslationParams = Record<string, number | string>;

type TranslationFunction = (key: string, params?: TranslationParams) => string;

type Translations = Record<Language, Record<string, string>>;

const createT = (translations: Record<string, string>): TranslationFunction => {
  return (key: string, params?: TranslationParams) => {
    let text = translations[key] ?? key;

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');

        // Special handling for sessionsText
        if (paramKey === 'sessions' && typeof value === 'number') {
          const isPlural = value !== 1;
          const pluralKey = isPlural ? 'sessions' : 'session';
          const pluralText = translations[pluralKey];
          if (pluralText) {
            text = text.replace(/{{sessionsText}}/g, pluralText);
          }
        }

        text = text.replace(regex, value.toString());
      });
    }

    return text;
  };
};

export const createTranslations = (language: Language) => {
  const translations: Translations = {
    pt: {
      title: "Breathly",
      description: "Inspire por {{seconds}} segundos, expire por {{doubleSeconds}} segundos, por {{sessions}} {{sessionsText}}.",
      inhale: "Inspire",
      exhale: "Expire",
      startButton: "Iniciar",
      pause: "Pausar",
      resume: "Continuar",
      reset: "Reiniciar",
      session: "Sessão",
      sessions: "Sessões",
      seconds: "segundos",
      preparing: "Prepare-se...",
      more: "mais",
      countUp: "↑ Contar para cima",
      countDown: "↓ Contar para baixo",
      finish: "Finalizar",
      completedSessions: "Sessões completadas: {{count}}"
    },
    en: {
      title: "Breathly",
      description: "Inhale for {{seconds}} seconds, exhale for {{doubleSeconds}} seconds, for {{sessions}} {{sessionsText}}.",
      inhale: "Inhale",
      exhale: "Exhale",
      startButton: "Start",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      session: "Session",
      sessions: "Sessions",
      seconds: "seconds",
      preparing: "Get ready...",
      more: "more",
      countUp: "↑ Count Up",
      countDown: "↓ Count Down",
      finish: "Finish",
      completedSessions: "Completed sessions: {{count}}"
    },
  };

  return {
    t: createT(translations[language]),
  };
};