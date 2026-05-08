import React from 'react';
import { 
  Compass, 
  Map as MapIcon, 
  Calendar, 
  Heart, 
  Users 
} from 'lucide-react';

const MOBILE_NAV = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'planner', label: 'Plan', icon: Calendar },
  { id: 'community', label: 'Social', icon: Users },
  { id: 'favorites', label: 'Wishlist', icon: Heart },
];

function BottomNav({ currentRoute }) {
  const handleNav = (id) => {
    window.location.hash = id;
  };

  return (
    <nav className="bottom-nav glass">
      {MOBILE_NAV.map((item) => (
        <button 
          key={item.id}
          className={`bottom-nav-item ${currentRoute === item.id ? 'active' : ''}`}
          onClick={() => handleNav(item.id)}
        >
          <item.icon size={22} className="nav-icon" />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--bottom-nav-height);
          display: none;
          justify-content: space-around;
          align-items: center;
          padding: 0 var(--space-2);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          border-bottom: none;
          border-left: none;
          border-right: none;
          z-index: var(--z-sticky);
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 767px) {
          .bottom-nav {
            display: flex;
          }
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-muted);
          transition: all var(--transition-base);
          flex: 1;
          height: 100%;
        }

        .bottom-nav-item.active {
          color: var(--accent-violet-light);
        }

        .nav-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .bottom-nav-item.active .nav-icon {
          transform: translateY(-2px);
          filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.4));
        }
      `}</style>
    </nav>
  );
}

export default BottomNav;
