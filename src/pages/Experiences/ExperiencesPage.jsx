import React, { useState } from 'react';
import { experiences } from '../../data/experiences';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { Search, Filter } from 'lucide-react';

function ExperiencesPage() {
  const [filter, setFilter] = useState('all');
  const types = ['all', ...new Set(experiences.map(e => e.type))];

  const filtered = filter === 'all' 
    ? experiences 
    : experiences.filter(e => e.type === filter);

  return (
    <div className="experiences-page container">
      <h1 className="page-title">Top <span className="gradient-text">Experiences</span></h1>
      
      <div className="filter-bar scroll-strip">
        {types.map(t => (
          <button 
            key={t} 
            className={`chip ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map(exp => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>

      <style jsx>{`
        .experiences-page { padding: var(--space-8) 0; }
        .page-title { margin-bottom: var(--space-8); font-size: var(--font-3xl); font-weight: 900; }
        .filter-bar { margin-bottom: var(--space-8); display: flex; gap: var(--space-2); }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-6);
        }
      `}</style>
    </div>
  );
}

export default ExperiencesPage;
