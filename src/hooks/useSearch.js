import { useState, useMemo } from 'react';
import { destinations } from '../data/destinations';
import { experiences } from '../data/experiences';

export function useSearch(query) {
  const results = useMemo(() => {
    if (!query || query.length < 2) return { destinations: [], experiences: [] };
    const q = query.toLowerCase();
    return {
      destinations: destinations.filter(d =>
        d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)
      ).slice(0, 5),
      experiences: experiences.filter(e =>
        e.title.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
      ).slice(0, 5)
    };
  }, [query]);
  return results;
}
