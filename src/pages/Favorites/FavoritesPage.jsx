import React from 'react';
import { destinations } from '../../data/destinations';
import { experiences } from '../../data/experiences';
import { useFavorites } from '../../context/FavoritesContext';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { Heart } from 'lucide-react';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const favDestinations = destinations.filter(d => favorites.destinations.includes(d.id));
  const favExperiences = experiences.filter(e => favorites.experiences.includes(e.id));

  return (
    <div className="favorites-page container">
      <h1 className="page-title">My <span className="gradient-text">Wishlist</span></h1>

      {favDestinations.length === 0 && favExperiences.length === 0 ? (
        <div className="empty-state glass">
          <Heart size={48} color="var(--text-faint)" />
          <h2>Your wishlist is empty</h2>
          <p>Start hearting places and activities you'd love to visit!</p>
          <button className="btn btn-primary" onClick={() => window.location.hash = 'explore'}>Explore Destinations</button>
        </div>
      ) : (
        <div className="fav-sections">
          {favDestinations.length > 0 && (
            <section className="fav-section">
              <h2 className="section-title">Destinations</h2>
              <div className="grid">
                {favDestinations.map(d => <DestinationCard key={d.id} destination={d} />)}
              </div>
            </section>
          )}

          {favExperiences.length > 0 && (
            <section className="fav-section">
              <h2 className="section-title">Experiences</h2>
              <div className="grid">
                {favExperiences.map(e => <ExperienceCard key={e.id} experience={e} />)}
              </div>
            </section>
          )}
        </div>
      )}

      <style jsx>{`
        .favorites-page { padding: var(--space-8) 0; }
        .page-title { margin-bottom: var(--space-12); font-size: var(--font-3xl); font-weight: 900; }
        .fav-section { margin-bottom: var(--space-12); }
        .section-title { font-size: var(--font-xl); font-weight: 800; margin-bottom: var(--space-6); }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-6);
        }
        .empty-state {
          padding: var(--space-16);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          border-radius: var(--radius-xl);
        }
      `}</style>
    </div>
  );
}

export default FavoritesPage;
