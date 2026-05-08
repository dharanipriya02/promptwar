import React from 'react';
import { Star, Clock, Info } from 'lucide-react';

function ExperienceCard({ experience }) {
  return (
    <div className="experience-card glass card-hover">
      <div className="exp-image-wrapper">
        <img src={experience.imageUrl} alt={experience.title} className="exp-image" loading="lazy" />
        <div className="exp-type-badge">{experience.type}</div>
      </div>

      <div className="exp-content">
        <h4 className="exp-title">{experience.title}</h4>
        
        <div className="exp-meta">
          <div className="meta-item">
            <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
            <span>{experience.rating}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{experience.duration}</span>
          </div>
        </div>

        <p className="exp-description">{experience.description}</p>

        <div className="exp-footer">
          <div className="exp-price">
            <span className="price-label">From</span>
            <span className="price-value">{experience.currency} {experience.price}</span>
          </div>
          <button className="btn btn-ghost btn-sm">
            <Info size={14} />
            Details
          </button>
        </div>
      </div>

      <style jsx>{`
        .experience-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .exp-image-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .exp-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .exp-type-badge {
          position: absolute;
          top: var(--space-2);
          left: var(--space-2);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: white;
        }

        .exp-content {
          padding: var(--space-4);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .exp-title {
          font-size: var(--font-base);
          font-weight: 700;
          margin-bottom: var(--space-2);
        }

        .exp-meta {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-3);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-xs);
          color: var(--text-secondary);
        }

        .exp-description {
          font-size: var(--font-sm);
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: var(--space-4);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .exp-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--glass-border);
        }

        .exp-price {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .price-value {
          font-size: var(--font-sm);
          font-weight: 700;
          color: var(--accent-cyan-light);
        }
      `}</style>
    </div>
  );
}

export default ExperienceCard;
