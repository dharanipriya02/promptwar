import { useState } from 'react';

const translationCache = {};

export function useTranslate() {
  const [loading, setLoading] = useState(false);
  const key = import.meta.env.VITE_TRANSLATE_API_KEY;

  const translate = async (text, targetLang = navigator.language.split('-')[0]) => {
    if (!key || !text) return text;
    const cacheKey = `${text.slice(0, 50)}_${targetLang}`;
    if (translationCache[cacheKey]) return translationCache[cacheKey];

    setLoading(true);
    try {
      const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: targetLang, format: 'text' })
      });
      const data = await res.json();
      const translated = data?.data?.translations?.[0]?.translatedText || text;
      translationCache[cacheKey] = translated;
      return translated;
    } catch { return text; }
    finally { setLoading(false); }
  };

  return { translate, loading };
}
