import React from 'react';
import { Star, Heart, MapPin } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import TripTypeBadge from '../TripTypeBadge/TripTypeBadge';

function DestinationCard({ destination }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite('destinations', destination.id);

  const handleCardClick = () => {
    window.location.hash = `destination/${destination.id}`;
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite('destinations', destination.id);
  };

  return (
    <div className="dest-card glass card-hover" onClick={handleCardClick}>
      <div className="dest-image-wrapper">
        <img src={destination.imageUrl} alt={destination.name} className="dest-image" loading="lazy" />
        <button 
          className={`favorite-btn ${favorited ? 'active' : ''}`} 
          onClick={handleFavorite}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={favorited ? "currentColor" : "none"} />
        </button>
        <div className="dest-badge-strip">
          {destination.tripTypes?.slice(0, 2).map(type => (
            <TripTypeBadge key={type} type={type} showLabel={false} />
          ))}
        </div>
      </div>

      <div className="dest-content">
        <div className="dest-header">
          <h3 className="dest-name">{destination.name}</h3>
          <div className="dest-rating">
            <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
            <span>{destination.rating}</span>
          </div>
        </div>
        
        <div className="dest-location">
          <MapPin size={12} />
          <span>{destination.country}</span>
        </div>

        <p className="dest-tagline">{destination.tagline}</p>
      </div>

      <style jsx>{`
        .dest-card {
          cursor: pointer;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dest-image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .dest-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .dest-card:hover .dest-image {
          transform: scale(1.1);
        }

        .favorite-btn {
          position: absolute;
          top: var(--space-3);
          right: var(--space-3);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all var(--transition-base);
          z-index: 2;
        }

        .favorite-btn:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: scale(1.1);
        }

        .favorite-btn.active {
          color: var(--color-error);
          background: rgba(239, 68, 68, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .dest-badge-strip {
          position: absolute;
          bottom: var(--space-3);
          left: var(--space-3);
          display: flex;
          gap: var(--space-1);
          z-index: 2;
        }

        .dest-content {
          padding: var(--space-4);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .dest-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-1);
        }

        .dest-name {
          font-size: var(--font-lg);
          font-weight: 700;
          color: var(--text-primary);
        }

        .dest-rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-sm);
          font-weight: 600;
          color: var(--text-secondary);
        }

        .dest-location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-xs);
          color: var(--text-muted);
          margin-bottom: var(--space-3);
        }

        .dest-tagline {
          font-size: var(--font-sm);
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default DestinationCard;
