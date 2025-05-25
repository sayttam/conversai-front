// hooks/useTranslation.ts
import { useI18n } from '../lib/i18n/context';

export function useTranslation() {
  const { t, locale, setLocale } = useI18n();
  
  return {
    t,
    locale,
    setLocale,
    isSpanish: locale === 'es',
    isEnglish: locale === 'en',
  };
}