import React, { useState } from 'react';
import { events, EVENT_CATEGORIES } from '../../data/events';
import EventCard from '../../components/EventCard/EventCard';
import { Calendar, MapPin, Music } from 'lucide-react';

function EventsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <div className="events-page container">
      <h1 className="page-title">What's <span className="gradient-text">On</span></h1>
      <p className="page-sub">Discover live music, festivals, and culture at your next stop.</p>
      
      <div className="filter-bar scroll-strip">
        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Events</button>
        {EVENT_CATEGORIES.map(c => (
          <button 
            key={c.id} 
            className={`chip ${filter === c.id ? 'active' : ''}`}
            onClick={() => setFilter(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map(event => (
          <EventCard key={event.id} event={event} onAdd={() => window.location.hash = 'planner'} />
        ))}
      </div>

      <style jsx>{`
        .events-page { padding: var(--space-8) 0; }
        .page-title { font-size: var(--font-4xl); font-weight: 900; margin-bottom: 4px; }
        .page-sub { color: var(--text-muted); margin-bottom: var(--space-8); }
        .filter-bar { margin-bottom: var(--space-8); display: flex; gap: var(--space-2); }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-8);
        }
      `}</style>
    </div>
  );
}

export default EventsPage;
