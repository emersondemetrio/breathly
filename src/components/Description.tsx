"use client";

import { useAtom } from "jotai";
import { createTranslations } from "~/lang/translations";
import {
  languageAtom,
  temposInAtom,
  totalSessionsAtom
} from "~/atoms/breathly";

export function Description() {
  const [language] = useAtom(languageAtom);
  const [temposIn] = useAtom(temposInAtom);
  const [totalSessions] = useAtom(totalSessionsAtom);

  const { t } = createTranslations(language);

  const getDescription = () => {
    const params = {
      seconds: temposIn.toString(),
      doubleSeconds: (temposIn * 2).toString(),
      sessions: totalSessions.toString(),
      sessionsText: totalSessions === 1 ? t('session') : t('sessions')
    };
    return t('description', params);
  };

  return (
    <div className="h-16 flex items-center justify-center">
      <p className="text-gray-600 text-center text-base">{getDescription()}</p>
    </div>
  );
}