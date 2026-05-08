import React from 'react';
import { 
  Compass, 
  Map as MapIcon, 
  Calendar, 
  Heart, 
  Camera, 
  Users, 
  Music, 
  Star, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const NAV_ITEMS = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'planner', label: 'AI Planner', icon: Calendar },
  { id: 'events', label: 'What\'s On', icon: Music },
  { id: 'experiences', label: 'Experiences', icon: Star },
  { id: 'celebrity', label: 'Celebrity Spots', icon: Users },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'journal', label: 'My Journal', icon: Camera },
  { id: 'favorites', label: 'Wishlist', icon: Heart },
];

function Sidebar({ currentRoute }) {
  const { user, signOut } = useUser();

  const handleNav = (id) => {
    window.location.hash = id;
  };

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">W</div>
          <span className="logo-text">Wandr</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id}
            className={`nav-item ${currentRoute === item.id ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <item.icon size={20} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
            {currentRoute === item.id && <ChevronRight size={14} className="active-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user ? (
          <div className="user-profile glass">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <button onClick={signOut} className="sign-out-btn">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary w-full" onClick={() => handleNav('explore')}>
            Sign In
          </button>
        )}
      </div>

      <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          display: flex;
          flex-direction: column;
          border-radius: 0;
          border-left: none;
          border-top: none;
          border-bottom: none;
          z-index: var(--z-sticky);
          position: sticky;
          top: 0;
        }

        @media (max-width: 767px) {
          .sidebar {
            display: none;
          }
        }

        .sidebar-header {
          padding: var(--space-8) var(--space-6);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: var(--font-lg);
        }

        .logo-text {
          font-size: var(--font-xl);
          font-weight: 800;
          letter-spacing: -0.5px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-base);
          position: relative;
        }

        .nav-item:hover {
          background: var(--glass-bg-hover);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(124, 58, 237, 0.1);
          color: var(--accent-violet-light);
          font-weight: 600;
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: var(--accent-violet);
          border-radius: 0 4px 4px 0;
        }

        .nav-icon {
          flex-shrink: 0;
        }

        .nav-label {
          flex: 1;
          font-size: var(--font-sm);
        }

        .active-indicator {
          opacity: 0.5;
        }

        .sidebar-footer {
          padding: var(--space-6);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          border: 2px solid var(--glass-border);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .user-name {
          font-size: var(--font-sm);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sign-out-btn {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-xs);
          color: var(--text-muted);
          margin-top: 2px;
          transition: color var(--transition-fast);
        }

        .sign-out-btn:hover {
          color: var(--color-error);
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
