import React from 'react';
import { Cloud, Sun, Thermometer, Users } from 'lucide-react';

function BestTimeWidget({ months }) {
  if (!months || months.length === 0) return null;

  return (
    <div className="best-time-widget glass">
      <h4 className="widget-title">Best Time to Visit</h4>
      
      <div className="months-grid scroll-strip">
        {months.map((m, idx) => (
          <div key={idx} className={`month-card ${m.rating}`}>
            <span className="month-name">{m.month}</span>
            <div className="month-data">
              <div className="data-item">
                <Thermometer size={10} />
                <span>{m.temp}</span>
              </div>
              <div className="data-item">
                <Users size={10} />
                <span>{m.crowd}</span>
              </div>
            </div>
            <div className="month-badge">{m.rating}</div>
            <div className="month-note">{m.note}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item"><span className="dot best"></span> Best</div>
        <div className="legend-item"><span className="dot shoulder"></span> Shoulder</div>
        <div className="legend-item"><span className="dot avoid"></span> Avoid</div>
      </div>

      <style jsx>{`
        .best-time-widget {
          padding: var(--space-4);
          border-radius: var(--radius-lg);
        }

        .widget-title {
          font-size: var(--font-sm);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .months-grid {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }

        .month-card {
          min-width: 90px;
          padding: var(--space-3);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          transition: all var(--transition-base);
          position: relative;
        }

        .month-card.best { border-color: var(--time-best); background: rgba(16, 185, 129, 0.05); }
        .month-card.shoulder { border-color: var(--time-shoulder); background: rgba(245, 158, 11, 0.05); }
        .month-card.avoid { border-color: var(--time-avoid); background: rgba(239, 104, 104, 0.05); }

        .month-name {
          font-size: var(--font-sm);
          font-weight: 700;
          color: var(--text-primary);
        }

        .month-data {
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 100%;
        }

        .data-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          color: var(--text-muted);
        }

        .month-badge {
          font-size: 8px;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
        }

        .month-card.best .month-badge { color: var(--time-best); }
        .month-card.shoulder .month-badge { color: var(--time-shoulder); }
        .month-card.avoid .month-badge { color: var(--time-avoid); }

        .month-note {
          font-size: 8px;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.2;
          height: 20px;
        }

        .legend {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot.best { background: var(--time-best); }
        .dot.shoulder { background: var(--time-shoulder); }
        .dot.avoid { background: var(--time-avoid); }
      `}</style>
    </div>
  );
}

export default BestTimeWidget;
