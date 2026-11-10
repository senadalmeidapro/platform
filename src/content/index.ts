import { fr } from './fr';

/**
 * Textes du site (français uniquement).
 * Les clés restent stables pour que le contenu puisse être édité dans `fr.ts`
 * sans toucher aux composants.
 */
export function t(key: string, values?: Record<string, string | number>): string {
  const text = fr[key];
  if (text === undefined) {
    if (import.meta.env.DEV) console.warn(`[content] Clé manquante : ${key}`);
    return key;
  }
  if (!values) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (_, name: string) => String(values[name] ?? ''));
}
