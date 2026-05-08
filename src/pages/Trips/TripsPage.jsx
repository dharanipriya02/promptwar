import React from 'react';
import { 
  Calendar, 
  MapPin, 
  MoreVertical, 
  Plus, 
  ChevronRight, 
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useTrips } from '../../context/TripContext';

function TripsPage() {
  const { trips, dispatch } = useTrips();

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this trip?')) {
      dispatch({ type: 'DELETE_TRIP', payload: id });
    }
  };

  const handleTripClick = (id) => {
    // Navigate to destination for now or trip detail if implemented
    const trip = trips.find(t => t.id === id);
    window.location.hash = `destination/${trip.destinationId}`;
  };

  return (
    <div className="trips-page container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My <span className="gradient-text">Trips</span></h1>
          <p className="page-subtitle">Your collection of adventures and future plans.</p>
        </div>
        <button className="btn btn-primary" onClick={() => window.location.hash = 'planner'}>
          <Plus size={20} />
          Plan New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="empty-trips glass">
          <div className="empty-icon">🏖️</div>
          <h2>No trips yet</h2>
          <p>Your future adventures will appear here once you start planning.</p>
          <button className="btn btn-ghost" onClick={() => window.location.hash = 'planner'}>
            Start Planning
          </button>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card glass card-hover" onClick={() => handleTripClick(trip.id)}>
              <div className="trip-image">
                <img src={trip.imageUrl} alt={trip.name} />
                <div className="trip-type-label">{trip.tripType}</div>
              </div>
              
              <div className="trip-content">
                <div className="trip-header">
                  <h3 className="trip-name">{trip.name}</h3>
                  <button className="menu-btn" onClick={(e) => handleDelete(trip.id, e)}>
                    <TrashIcon size={16} />
                  </button>
                </div>

                <div className="trip-meta">
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{trip.destinationName}, {trip.country}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - 
                      {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="trip-footer">
                  <div className="trip-progress">
                    <div className="progress-text">
                      <span>Itinerary Ready</span>
                      <span>100%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .trips-page {
          padding-top: var(--space-8);
          padding-bottom: var(--space-12);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-12);
        }

        .page-title {
          font-size: var(--font-4xl);
          font-weight: 900;
          letter-spacing: -1px;
        }

        .page-subtitle {
          color: var(--text-secondary);
        }

        .empty-trips {
          padding: var(--space-16);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-4);
          border-radius: var(--radius-xl);
          max-width: 600px;
          margin: 0 auto;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: var(--space-2);
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-8);
        }

        .trip-card {
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .trip-image {
          position: relative;
          aspect-ratio: 16/9;
        }

        .trip-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .trip-type-label {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          padding: 2px 10px;
          border-radius: var(--radius-sm);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .trip-content {
          padding: var(--space-5);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .trip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-2);
        }

        .trip-name {
          font-size: var(--font-lg);
          font-weight: 800;
        }

        .menu-btn {
          color: var(--text-muted);
          padding: 4px;
          transition: color var(--transition-fast);
        }

        .menu-btn:hover {
          color: var(--color-error);
        }

        .trip-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: var(--space-6);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: var(--font-sm);
          color: var(--text-secondary);
        }

        .trip-footer {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          gap: var(--space-4);
        }

        .trip-progress {
          flex: 1;
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .progress-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-fill {
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
        }

        .arrow {
          color: var(--accent-violet-light);
          opacity: 0;
          transform: translate(-10px, 10px);
          transition: all var(--transition-base);
        }

        .trip-card:hover .arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>
    </div>
  );
}

// Simple Trash Icon as Lucide-React might have different names in different versions
function TrashIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default TripsPage;
