import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  Share2, 
  Heart, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { destinations } from '../../data/destinations';
import { experiences } from '../../data/experiences';
import { events } from '../../data/events';
import { celebrities } from '../../data/celebrities';
import { useFavorites } from '../../context/FavoritesContext';
import { useUser } from '../../context/UserContext';
import { useSocial } from '../../context/SocialContext';

// Components
import BestTimeWidget from '../../components/BestTimeWidget/BestTimeWidget';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import EventCard from '../../components/EventCard/EventCard';
import YouTubeSection from '../../components/YouTubeSection/YouTubeSection';
import TranslateButton from '../../components/TranslateButton/TranslateButton';
import TripTypeBadge from '../../components/TripTypeBadge/TripTypeBadge';

function DestinationPage({ id }) {
  const destination = destinations.find(d => d.id === id);
  const [description, setDescription] = useState(destination?.description);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useUser();
  const destExperiences = experiences.filter(e => e.destinationId === id);
  const destEvents = events.filter(ev => ev.destinationId === id);
  const destCelebrities = celebrities.filter(c => c.destinationsVisited.some(v => v.destinationId === id));

  if (!destination) {
    return (
      <div className="error-view">
        <AlertCircle size={48} color="var(--color-error)" />
        <h2>Destination not found</h2>
        <button className="btn btn-primary" onClick={() => window.location.hash = 'explore'}>Back to Explore</button>
      </div>
    );
  }

  const favorited = isFavorite('destinations', destination.id);

  return (
    <div className="destination-page">
      {/* Hero Header */}
      <header className="dest-hero">
        <div className="hero-background">
          <img src={destination.imageUrl} alt={destination.name} className="hero-img" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content container">
          <button className="back-btn glass" onClick={() => window.location.hash = 'explore'}>
            <ArrowLeft size={20} />
          </button>
          
          <div className="hero-info">
            <div className="hero-meta">
              <div className="badge"><MapPin size={12} /> {destination.country}</div>
              <div className="badge"><Star size={12} fill="var(--color-warning)" color="var(--color-warning)" /> {destination.rating}</div>
            </div>
            <h1 className="hero-title">{destination.name}</h1>
            <p className="hero-tagline">{destination.tagline}</p>
          </div>

          <div className="hero-actions">
            <button className={`action-btn glass ${favorited ? 'active' : ''}`} onClick={() => toggleFavorite('destinations', destination.id)}>
              <Heart size={20} fill={favorited ? "currentColor" : "none"} />
              <span>{favorited ? 'Saved' : 'Wishlist'}</span>
            </button>
            <button className="action-btn glass">
              <Share2 size={20} />
              <span>Share</span>
            </button>
            <button className="btn btn-primary btn-lg plan-btn" onClick={() => window.location.hash = 'planner'}>
              <Calendar size={20} />
              Plan a Trip
            </button>
          </div>
        </div>
      </header>

      <div className="dest-body container">
        <div className="dest-main">
          {/* Overview Section */}
          <section className="dest-section">
            <div className="section-header-row">
              <h2 className="section-title">Overview</h2>
              <TranslateButton text={destination.description} onTranslated={setDescription} />
            </div>
            <p className="description-text">{description}</p>
            
            <div className="trip-types-row">
              {destination.tripTypes?.map(type => (
                <TripTypeBadge key={type} type={type} />
              ))}
            </div>
          </section>

          {/* YouTube Section */}
          <YouTubeSection query={destination.name} />

          {/* Experiences Section */}
          <section className="dest-section">
            <h2 className="section-title">Must-Try Experiences</h2>
            <div className="grid-list scroll-strip">
              {destExperiences.map(exp => (
                <div key={exp.id} className="grid-item">
                  <ExperienceCard experience={exp} />
                </div>
              ))}
            </div>
          </section>

          {/* Celebrity Spots Section */}
          {destCelebrities.length > 0 && (
            <section className="dest-section">
              <h2 className="section-title">Celebrity Footprints</h2>
              <div className="celebrity-strip scroll-strip">
                {destCelebrities.map(celeb => {
                  const visit = celeb.destinationsVisited.find(v => v.destinationId === id);
                  return (
                    <div key={celeb.id} className="celeb-card glass">
                      <img src={celeb.photo} alt={celeb.name} className="celeb-img" />
                      <div className="celeb-info">
                        <h4 className="celeb-name">{celeb.name}</h4>
                        <p className="celeb-quote">"{celeb.travelQuote}"</p>
                        <div className="celeb-spots">
                          {visit.spots.map(spot => (
                            <span key={spot} className="celeb-spot"><CheckCircle2 size={10} /> {spot}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Events Section */}
          {destEvents.length > 0 && (
            <section className="dest-section">
              <h2 className="section-title">What's On</h2>
              <p className="section-sub">Live events, concerts and festivals happening here</p>
              <div className="grid-list scroll-strip">
                {destEvents.map(event => (
                  <div key={event.id} className="grid-item">
                    <EventCard event={event} onAdd={() => window.location.hash = 'planner'} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Attractions List */}
          <section className="dest-section">
            <h2 className="section-title">Top Attractions</h2>
            <div className="attractions-list">
              {destination.topAttractions?.map((attr, i) => (
                <div key={attr} className="attraction-item glass">
                  <span className="attr-number">{i + 1}</span>
                  <span className="attr-name">{attr}</span>
                  <ChevronRight size={16} className="attr-arrow" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="dest-sidebar">
          {/* Best Time Widget */}
          <div className="sidebar-widget">
            <BestTimeWidget months={destination.visitMonths} />
          </div>

          {/* Quick Stats Widget */}
          <div className="sidebar-widget glass">
            <h4 className="widget-title">Travel Info</h4>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Currency</span>
                <span className="info-value">{destination.currency}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Language</span>
                <span className="info-value">{destination.language}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Timezone</span>
                <span className="info-value">GMT +1</span>
              </div>
            </div>
          </div>

          {/* Ad/Promo Widget */}
          <div className="sidebar-widget promo-widget glass">
            <div className="promo-icon"><Info size={24} /></div>
            <h4>Sustainable Travel</h4>
            <p>
              {destination.id === 'paris' && "Paris is committed to being carbon neutral by 2050. Consider using the Metro!"}
              {destination.id === 'dubai' && "Dubai is expanding its electric vehicle network. Try the Dubai Metro for a scenic, low-carbon commute!"}
              {destination.id === 'bali' && "Bali is banning single-use plastics. Bring your own reusable water bottle and support local eco-warriors!"}
              {!['paris', 'dubai', 'bali'].includes(destination.id) && `Explore ${destination.name} responsibly by supporting local artisans and minimizing waste.`}
            </p>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .destination-page {
          padding-bottom: var(--space-20);
        }

        /* Hero */
        .dest-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          display: flex;
          align-items: flex-end;
          padding-bottom: var(--space-12);
          margin-bottom: var(--space-8);
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, var(--bg-primary) 0%, rgba(7, 7, 16, 0.4) 50%, rgba(7, 7, 16, 0.2) 100%);
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          position: relative;
          width: 100%;
        }

        .back-btn {
          position: absolute;
          top: calc(-60vh + var(--space-12) + var(--space-6));
          left: 0;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-meta {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-2);
        }

        .hero-title {
          font-size: var(--font-6xl);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          margin-bottom: var(--space-2);
        }

        .hero-tagline {
          font-size: var(--font-xl);
          color: var(--text-secondary);
          max-width: 800px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-top: var(--space-4);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: var(--font-sm);
        }

        .action-btn.active {
          color: var(--color-error);
          border-color: var(--color-error);
        }

        .plan-btn {
          margin-left: auto;
        }

        /* Body Layout */
        .dest-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-12);
        }

        @media (max-width: 1024px) {
          .dest-body {
            grid-template-columns: 1fr;
          }
          .dest-hero {
            height: 50vh;
          }
          .hero-title {
            font-size: var(--font-4xl);
          }
        }

        /* Sections */
        .dest-section {
          margin-bottom: var(--space-12);
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .section-title {
          font-size: var(--font-2xl);
          font-weight: 800;
        }

        .section-sub {
          color: var(--text-muted);
          font-size: var(--font-sm);
          margin-top: calc(-1 * var(--space-3));
          margin-bottom: var(--space-4);
        }

        .description-text {
          font-size: var(--font-base);
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-6);
        }

        .trip-types-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .grid-list {
          display: flex;
          gap: var(--space-4);
          padding-bottom: var(--space-4);
        }

        .grid-item {
          min-width: 300px;
          flex: 1;
        }

        /* Celebrity Cards */
        .celebrity-strip {
          display: flex;
          gap: var(--space-4);
          padding-bottom: var(--space-4);
        }

        .celeb-card {
          min-width: 350px;
          padding: var(--space-4);
          display: flex;
          gap: var(--space-4);
          align-items: center;
        }

        .celeb-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--accent-violet);
        }

        .celeb-info {
          flex: 1;
        }

        .celeb-name {
          font-size: var(--font-lg);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .celeb-quote {
          font-style: italic;
          font-size: var(--font-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-3);
        }

        .celeb-spots {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .celeb-spot {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-violet-light);
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* Attractions */
        .attractions-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
        }

        .attraction-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .attraction-item:hover {
          background: var(--glass-bg-hover);
          transform: translateX(4px);
        }

        .attr-number {
          font-size: var(--font-lg);
          font-weight: 900;
          color: var(--accent-violet);
          opacity: 0.5;
        }

        .attr-name {
          flex: 1;
          font-weight: 600;
        }

        .attr-arrow {
          color: var(--text-faint);
        }

        /* Sidebar Widgets */
        .dest-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .sidebar-widget {
          padding: var(--space-6);
          border-radius: var(--radius-xl);
        }

        .widget-title {
          font-size: var(--font-sm);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: var(--space-4);
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-sm);
        }

        .info-label {
          color: var(--text-muted);
        }

        .info-value {
          font-weight: 700;
          color: var(--text-primary);
        }

        .promo-widget {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1));
          border-color: rgba(124, 58, 237, 0.2);
          text-align: center;
        }

        .promo-icon {
          color: var(--accent-violet-light);
          margin-bottom: var(--space-3);
        }

        .promo-widget h4 {
          margin-bottom: var(--space-2);
          font-weight: 700;
        }

        .promo-widget p {
          font-size: var(--font-xs);
          color: var(--text-secondary);
        }

        .error-view {
          height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-6);
        }
      `}</style>
    </div>
  );
}

export default DestinationPage;
