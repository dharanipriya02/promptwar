import React, { useState } from 'react';
import { Search, Bell, User as UserIcon, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useSearch } from '../../hooks/useSearch';

function Navbar({ currentRoute }) {
  const { user, signInWithGoogle } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchResults = useSearch(searchQuery);

  const handleSearchSelect = (type, id) => {
    window.location.hash = `${type}/${id}`;
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="navbar glass">
      <div className="navbar-container">
        {/* Mobile Logo */}
        <div className="mobile-logo">
          <div className="logo-icon">W</div>
        </div>

        {/* Global Search */}
        <div className="search-container">
          <div className="search-bar-wrapper glass">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search destinations, experiences..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          {showResults && searchQuery.length >= 2 && (
            <div className="search-results glass">
              {searchResults.destinations.length > 0 && (
                <div className="result-section">
                  <h4 className="result-title">Destinations</h4>
                  {searchResults.destinations.map(d => (
                    <button key={d.id} className="result-item" onClick={() => handleSearchSelect('destination', d.id)}>
                      <img src={d.imageUrl} alt={d.name} />
                      <div>
                        <span className="item-name">{d.name}</span>
                        <span className="item-sub">{d.country}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.experiences.length > 0 && (
                <div className="result-section">
                  <h4 className="result-title">Experiences</h4>
                  {searchResults.experiences.map(e => (
                    <button key={e.id} className="result-item" onClick={() => handleSearchSelect('experience', e.id)}>
                      <img src={e.imageUrl} alt={e.title} />
                      <div>
                        <span className="item-name">{e.title}</span>
                        <span className="item-sub">{e.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.destinations.length === 0 && searchResults.experiences.length === 0 && (
                <div className="no-results">No results found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        {/* User Actions */}
        <div className="user-actions">
          <button className="icon-btn glass">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          
          {user ? (
            <button className="avatar-btn">
              <img src={user.avatar} alt={user.name} />
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={signInWithGoogle}>
              Sign In
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: var(--navbar-height);
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
          display: flex;
          align-items: center;
          padding: 0 var(--space-6);
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
        }

        .navbar-container {
          width: 100%;
          max-width: var(--content-max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }

        .mobile-logo {
          display: none;
        }

        @media (max-width: 767px) {
          .mobile-logo {
            display: block;
          }
          .navbar {
            padding: 0 var(--space-4);
          }
          .navbar-container {
            gap: var(--space-4);
          }
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
        }

        .search-container {
          flex: 1;
          position: relative;
          max-width: 500px;
        }

        .search-bar-wrapper {
          display: flex;
          align-items: center;
          padding: 0 var(--space-4);
          height: 40px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: var(--space-3);
        }

        .search-input {
          flex: 1;
          font-size: var(--font-sm);
        }

        .clear-btn {
          color: var(--text-muted);
          padding: 4px;
        }

        .search-results {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          right: 0;
          max-height: 400px;
          overflow-y: auto;
          padding: var(--space-4);
          box-shadow: var(--shadow-xl);
          border-radius: var(--radius-lg);
        }

        .result-section {
          margin-bottom: var(--space-4);
        }

        .result-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: var(--space-2);
          padding-left: var(--space-2);
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-2);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .result-item:hover {
          background: var(--glass-bg-hover);
        }

        .result-item img {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }

        .item-name {
          display: block;
          font-size: var(--font-sm);
          font-weight: 600;
          text-align: left;
        }

        .item-sub {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          text-align: left;
        }

        .no-results {
          padding: var(--space-4);
          text-align: center;
          color: var(--text-muted);
          font-size: var(--font-sm);
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: var(--text-secondary);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: var(--color-error);
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
        }

        .avatar-btn img {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          border: 2px solid var(--glass-border);
        }
      `}</style>
    </header>
  );
}

export default Navbar;
