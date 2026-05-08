import React, { useState } from 'react';
import { destinations, TRIP_TYPES, CONTINENTS } from '../../data/destinations';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import EventCard from '../../components/EventCard/EventCard';
import { experiences } from '../../data/experiences';
import { events } from '../../data/events';

function ExplorePage() {
  const [activeType, setActiveType] = useState('all');
  const [activeContinent, setActiveContinent] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinations.filter(d => {
    const matchesType = activeType === 'all' || d.tripTypes.includes(activeType);
    const matchesContinent = activeContinent === 'All' || d.continent === activeContinent;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesContinent && matchesSearch;
  });

  const filteredExperiences = experiences.filter(e => {
    const d = destinations.find(dest => dest.id === e.destinationId);
    const matchesType = activeType === 'all' || (d && d.tripTypes.includes(activeType));
    const matchesContinent = activeContinent === 'All' || (d && d.continent === activeContinent);
    return matchesType && matchesContinent;
  }).slice(0, 4);

  const filteredEvents = events.filter(ev => {
    const d = destinations.find(dest => dest.id === ev.destinationId);
    const matchesContinent = activeContinent === 'All' || (d && d.continent === activeContinent);
    return matchesContinent;
  }).slice(0, 4);

  return (
    <div className="explore-page">
      <div className="explore-hero">
        <h1 className="hero-title">Discover your next <span className="gradient-text">Adventure</span></h1>
        <p className="hero-subtitle">Premium travel planning & community-driven experiences.</p>
        
        <div className="hero-search glass">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search destinations (e.g. Paris, Bali, Manali...)" 
            className="hero-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="explore-filters">
        <div className="filter-group">
          <h4 className="filter-label">Continent</h4>
          <div className="scroll-strip">
            {CONTINENTS.map(c => (
              <button 
                key={c} 
                className={`chip ${activeContinent === c ? 'active' : ''}`}
                onClick={() => setActiveContinent(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4 className="filter-label">Trip Type</h4>
          <div className="scroll-strip">
            <button 
              className={`chip ${activeType === 'all' ? 'active' : ''}`}
              onClick={() => setActiveType('all')}
            >
              All Types
            </button>
            {TRIP_TYPES.map(t => (
              <button 
                key={t.id} 
                className={`chip ${activeType === t.id ? 'active' : ''}`}
                onClick={() => setActiveType(t.id)}
              >
                <span className="chip-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="explore-content">
        <section className="explore-section">
          <div className="results-info">
            <h2 className="section-title">Top Destinations</h2>
            <span>Showing {filteredDestinations.length} places</span>
          </div>
          <div className="destinations-grid">
            {filteredDestinations.map(d => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
          {filteredDestinations.length === 0 && (
            <div className="no-results-view glass">
              <Search size={48} className="no-results-icon" />
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </section>

        {filteredExperiences.length > 0 && (
          <section className="explore-section">
            <h2 className="section-title">Trending Experiences</h2>
            <div className="horizontal-grid">
              {filteredExperiences.map(e => (
                <ExperienceCard key={e.id} experience={e} />
              ))}
            </div>
          </section>
        )}

        {filteredEvents.length > 0 && (
          <section className="explore-section">
            <h2 className="section-title">Local Events</h2>
            <div className="horizontal-grid">
              {filteredEvents.map(ev => (
                <EventCard key={ev.id} event={ev} onAdd={() => window.location.hash = 'planner'} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .explore-page {
          width: 100%;
          padding: 0;
        }

        .explore-hero {
          padding: var(--space-12) 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-4);
        }

        .hero-title {
          font-size: var(--font-6xl);
          font-weight: 900;
          letter-spacing: -3px;
          margin-bottom: 0;
          line-height: 1;
        }

        .hero-subtitle {
          font-size: var(--font-xl);
          color: var(--text-secondary);
          max-width: 700px;
          margin-bottom: var(--space-6);
        }

        .hero-search {
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          padding: 0 var(--space-6);
          height: 60px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--glass-border);
        }

        .search-icon {
          color: var(--accent-violet-light);
          margin-right: var(--space-4);
        }

        .hero-input {
          flex: 1;
          font-size: var(--font-lg);
          font-weight: 500;
        }

        .explore-filters {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .filter-label {
          font-size: var(--font-xs);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          font-weight: 800;
        }

        .explore-section {
          margin-bottom: var(--space-16);
        }

        .section-title {
          font-size: var(--font-3xl);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: var(--space-6);
        }

        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-6);
        }

        .results-info span {
          font-size: var(--font-sm);
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: var(--space-2);
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-8);
        }

        .horizontal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-6);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: var(--font-4xl);
          }
          .destinations-grid, .horizontal-grid {
            grid-template-columns: 1fr;
          }
        }

        .no-results-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-16);
          text-align: center;
          gap: var(--space-4);
          border-radius: var(--radius-xl);
        }

        .no-results-icon {
          color: var(--text-faint);
          margin-bottom: var(--space-2);
        }

        .no-results-view h3 {
          font-size: var(--font-xl);
          font-weight: 700;
        }

        .no-results-view p {
          color: var(--text-secondary);
          margin-bottom: var(--space-4);
        }
      `}</style>
    </div>
  );
}

export default ExplorePage;
