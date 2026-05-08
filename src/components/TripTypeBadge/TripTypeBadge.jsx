import React from 'react';
import { TRIP_TYPES } from '../../data/destinations';

function TripTypeBadge({ type, showLabel = true }) {
  const config = TRIP_TYPES.find(t => t.id === type) || { label: type, icon: '📍', color: 'var(--text-muted)' };

  return (
    <div className="trip-badge" style={{ '--badge-color': config.color }}>
      <span className="badge-icon">{config.icon}</span>
      {showLabel && <span className="badge-label">{config.label}</span>}

      <style jsx>{`
        .trip-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        
        .trip-badge:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--badge-color);
          color: var(--text-primary);
        }

        .badge-icon {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default TripTypeBadge;
