export type Language = 'pt' | 'en';

const translations = {
  pt: {
    title: 'Breathly',
    settings: 'Configurações',
    settingsDescription: 'Ajuste as configurações do seu exercício de respiração',
    tempoLabel: 'Tempo de respiração',
    tempoDescription: 'Velocidade do exercício (1-10) segundos',
    sessionsLabel: 'Número de sessões',
    countDirectionLabel: 'Direção da contagem',
    countUp: 'Crescente',
    countDown: 'Decrescente',
    start: 'Iniciar',
    pause: 'Pausar',
    resume: 'Continuar',
    reset: 'Reiniciar',
    finish: 'Finalizar',
    inhale: 'Inspire',
    exhale: 'Expire',
    description: 'Inspire por {{seconds}} tempos, expire por {{doubleSeconds}} tempos, por {{sessions}} {{sessionsText}}.',
    session: 'Sessão',
    sessions: 'Sessões',
    completedSessions: '{{count}} sessões completadas',
    more: 'mais',
    done: 'Concluir',
    advanced: 'Avançado',
    back: 'Voltar',
    breathDuration: 'Duração da Respiração',
    breathIn: 'Inspiração',
    breathInDescription: 'Tempo de inspiração em tempos',
    tempo: 'Tempo',
    sessionsDescription: 'Número total de sessões',
    decrease: 'Diminuir',
    increase: 'Aumentar',
    languageLabel: 'Idioma',
    hold: 'Segure',
    preparing: 'Preparando',
    resultsTitle: 'Sessões Concluídas!',
    resultsCompleted: 'Você completou {{completed}} de {{total}} sessões',
    resultsCongratulations: 'Parabéns! Você completou todas as sessões de respiração.',
    startOver: 'Começar Novamente',
    startHint: 'Clique em iniciar para começar o exercício',
  },
  en: {
    title: 'Breathly',
    settings: 'Settings',
    settingsDescription: 'Adjust your breathing exercise settings',
    tempoLabel: 'Breath duration',
    tempoDescription: 'Exercise speed (1-10) seconds',
    sessionsLabel: 'Number of sessions',
    countDirectionLabel: 'Count direction',
    countUp: 'Count up',
    countDown: 'Count down',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    finish: 'Finish',
    inhale: 'Inhale',
    exhale: 'Exhale',
    description: 'Inhale for {{seconds}} tempos, exhale for {{doubleSeconds}} tempos, for {{sessions}} {{sessionsText}}.',
    session: 'Session',
    sessions: 'Sessions',
    completedSessions: '{{count}} sessions completed',
    more: 'more',
    done: 'Done',
    advanced: 'Advanced',
    back: 'Back',
    breathDuration: 'Breath Duration',
    breathIn: 'Inhale',
    breathInDescription: 'Inhalation time in tempos',
    tempo: 'Tempo',
    sessionsDescription: 'Total number of sessions',
    decrease: 'Decrease',
    increase: 'Increase',
    languageLabel: 'Language',
    hold: 'Hold',
    preparing: 'Preparing',
    resultsTitle: 'Sessions Completed!',
    resultsCompleted: 'You completed {{completed}} of {{total}} sessions',
    resultsCongratulations: 'Congratulations! You completed all breathing sessions.',
    startOver: 'Start Over',
    startHint: 'Click start to begin the exercise',
  },
} as const;

export type TranslationKeys = keyof typeof translations.en;

export function createTranslations(language: Language) {
  return {
    t: (key: TranslationKeys, params?: Record<string, string | number>) => {
      let text = translations[language][key] as string;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          text = text.replace(`{{${key}}}`, `${value}`);
        });
      }
      return text;
    },
  };
}
