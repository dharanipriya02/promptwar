import React from 'react';
import { celebrities } from '../../data/celebrities';
import { destinations } from '../../data/destinations';
import { Star, MapPin, Instagram, Users } from 'lucide-react';

function CelebrityPage() {
  return (
    <div className="celebrity-page container">
      <div className="page-header">
        <h1 className="page-title">Celebrity <span className="gradient-text">Footprints</span></h1>
        <p className="page-sub">Explore the spots visited by your favorite icons and influencers.</p>
      </div>

      <div className="celeb-grid">
        {celebrities.map(celeb => (
          <div key={celeb.id} className="celeb-full-card glass card-hover">
            <div className="celeb-banner">
              <img src={celeb.photo} alt={celeb.name} className="celeb-photo" />
              <div className="celeb-badge">{celeb.profession}</div>
            </div>
            <div className="celeb-content">
              <h3 className="celeb-name">{celeb.name}</h3>
              <p className="celeb-bio">{celeb.bio}</p>
              
              <div className="celeb-destinations">
                <h5 className="section-title">Recently Visited</h5>
                <div className="dest-chips">
                  {celeb.destinationsVisited.map(v => {
                    const d = destinations.find(dest => dest.id === v.destinationId);
                    return (
                      <button key={v.destinationId} className="dest-chip glass" onClick={() => window.location.hash = `destination/${v.destinationId}`}>
                        <MapPin size={12} />
                        <span>{d?.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="celeb-quote-box glass">
                <Star size={16} fill="var(--accent-violet-light)" color="var(--accent-violet-light)" />
                <p>"{celeb.travelQuote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .celebrity-page { padding: var(--space-8) 0; }
        .page-header { margin-bottom: var(--space-12); }
        .page-title { font-size: var(--font-4xl); font-weight: 900; margin-bottom: 4px; }
        .page-sub { color: var(--text-muted); font-size: var(--font-lg); }
        
        .celeb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: var(--space-8);
        }

        .celeb-full-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .celeb-banner {
          position: relative;
          height: 200px;
        }

        .celeb-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .celeb-badge {
          position: absolute;
          bottom: var(--space-4);
          left: var(--space-4);
          background: var(--accent-violet);
          color: white;
          padding: 2px 10px;
          border-radius: var(--radius-sm);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .celeb-content {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .celeb-name {
          font-size: var(--font-xl);
          font-weight: 800;
        }

        .celeb-bio {
          font-size: var(--font-sm);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .section-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: var(--space-3);
          font-weight: 800;
        }

        .dest-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .dest-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-violet-light);
        }

        .celeb-quote-box {
          margin-top: var(--space-2);
          padding: var(--space-4);
          display: flex;
          gap: 12px;
          align-items: flex-start;
          border-color: rgba(124, 58, 237, 0.2);
        }

        .celeb-quote-box p {
          font-style: italic;
          font-size: var(--font-sm);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}

export default CelebrityPage;
