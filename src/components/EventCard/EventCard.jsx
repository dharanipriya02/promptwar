import React from 'react';
import { Calendar, MapPin, ExternalLink, Plus } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../data/events';

function EventCard({ event, onAdd }) {
  const category = EVENT_CATEGORIES.find(c => c.id === event.category) || EVENT_CATEGORIES[0];

  return (
    <div className="event-card glass" style={{ '--event-color': category.color }}>
      <div className="event-image-wrapper">
        <img src={event.imageUrl} alt={event.title} className="event-image" loading="lazy" />
        <div className="event-category-badge">
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>
        {event.priceMin === 0 && <div className="free-badge">FREE</div>}
      </div>

      <div className="event-content">
        <div className="event-date">
          <Calendar size={14} />
          <span>{new Date(event.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        <h4 className="event-title">{event.title}</h4>
        <p className="event-artist">{event.artist}</p>
        
        <div className="event-venue">
          <MapPin size={14} />
          <span>{event.venue}</span>
        </div>

        <div className="event-actions">
          <div className="event-price">
            {event.priceMin === 0 ? 'Free Entry' : `${event.currency} ${event.priceMin}+`}
          </div>
          <div className="action-buttons">
            <button className="action-btn add-btn" onClick={() => onAdd?.(event)} title="Add to Itinerary">
              <Plus size={18} />
            </button>
            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="action-btn link-btn" title="Get Tickets">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-card {
          overflow: hidden;
          transition: all var(--transition-base);
          border-left: 4px solid var(--event-color);
        }

        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px var(--event-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .event-image-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: opacity var(--transition-base);
        }

        .event-card:hover .event-image {
          opacity: 1;
        }

        .event-category-badge {
          position: absolute;
          top: var(--space-2);
          left: var(--space-2);
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: var(--event-color);
          border-radius: var(--radius-sm);
          font-size: 10px;
          font-weight: 800;
          color: white;
          box-shadow: var(--shadow-sm);
        }

        .free-badge {
          position: absolute;
          top: var(--space-2);
          right: var(--space-2);
          padding: 2px 8px;
          background: var(--color-success);
          border-radius: var(--radius-sm);
          font-size: 10px;
          font-weight: 800;
          color: white;
        }

        .event-content {
          padding: var(--space-4);
        }

        .event-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--font-xs);
          color: var(--event-color);
          font-weight: 700;
          margin-bottom: var(--space-1);
        }

        .event-title {
          font-size: var(--font-base);
          font-weight: 700;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-artist {
          font-size: var(--font-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-3);
        }

        .event-venue {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--font-xs);
          color: var(--text-muted);
          margin-bottom: var(--space-4);
        }

        .event-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--glass-border);
        }

        .event-price {
          font-size: var(--font-sm);
          font-weight: 700;
          color: var(--text-primary);
        }

        .action-buttons {
          display: flex;
          gap: var(--space-2);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          background: var(--event-color);
          color: white;
          border-color: var(--event-color);
        }

        .add-btn:hover {
          background: var(--accent-violet);
          border-color: var(--accent-violet);
        }
      `}</style>
    </div>
  );
}

export default EventCard;
