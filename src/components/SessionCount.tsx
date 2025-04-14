"use client";

import { useAtom } from "jotai";
import { createTranslations } from "~/lang/translations";
import {
  languageAtom,
  completedSessionsAtom
} from "~/atoms/breathly";

export function SessionCount() {
  const [language] = useAtom(languageAtom);
  const [completedSessions] = useAtom(completedSessionsAtom);
  const { t } = createTranslations(language);

  return (
    <div className="h-8 flex items-center justify-center">
      <p className="text-gray-500 text-base">
        {t('completedSessions', { count: completedSessions })}
      </p>
    </div>
  );
}