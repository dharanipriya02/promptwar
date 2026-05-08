import React, { useState } from 'react';
import { 
  Camera, 
  Grid, 
  Map as MapIcon, 
  Plus, 
  Settings, 
  Heart, 
  MessageCircle, 
  ChevronRight,
  Search
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { useUser } from '../../context/UserContext';
import { destinations } from '../../data/destinations';

function JournalPage() {
  const { user } = useUser();
  const { posts, journal } = useSocial();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  // Filter posts that belong to the user's journal
  const myPosts = posts.filter(p => journal.includes(p.id) || p.authorId === 'you');

  if (!user) {
    return (
      <div className="login-prompt glass container">
        <Camera size={64} className="prompt-icon" />
        <h2>Your Personal Travel Journal</h2>
        <p>Capture memories, upload photos, and share your adventures with the community.</p>
        <button className="btn btn-primary btn-lg" onClick={() => window.location.hash = 'explore'}>
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="journal-page container">
      {/* Journal Header */}
      <header className="journal-header">
        <div className="user-profile-large">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <div className="online-indicator"></div>
          </div>
          <div className="profile-info">
            <div className="name-row">
              <h1 className="user-name">{user.name}</h1>
              <button className="icon-btn glass"><Settings size={20} /></button>
            </div>
            <p className="user-bio">Exploring the world, one frame at a time. 🌍✨</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{myPosts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Destinations</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.2k</span>
                <span className="stat-label">Hearts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => window.location.hash = 'community'}>
            <Plus size={20} /> New Story
          </button>
        </div>
      </header>

      {/* Journal Content */}
      <div className="journal-content">
        <div className="content-nav">
          <div className="view-switcher glass">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} /> Posts
            </button>
            <button 
              className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <MapIcon size={18} /> Map
            </button>
          </div>
          <div className="content-search glass">
            <Search size={16} />
            <input type="text" placeholder="Search my memories..." />
          </div>
        </div>

        {myPosts.length === 0 ? (
          <div className="empty-journal glass">
            <Camera size={48} />
            <h3>Your journal is empty</h3>
            <p>Start sharing your travel stories to see them here.</p>
            <button className="btn btn-ghost" onClick={() => window.location.hash = 'community'}>
              Create First Post
            </button>
          </div>
        ) : (
          <div className={`journal-grid ${viewMode}`}>
            {myPosts.map(post => {
              const dest = destinations.find(d => d.id === post.destinationId);
              return (
                <div key={post.id} className="journal-item card-hover glass">
                  <div className="item-media">
                    <img src={post.photos[0]} alt={post.title} />
                    <div className="item-overlay">
                      <div className="item-stats">
                        <span><Heart size={16} fill="white" /> {post.likes}</span>
                        <span><MessageCircle size={16} fill="white" /> 4</span>
                      </div>
                    </div>
                  </div>
                  <div className="item-info">
                    <h4 className="item-title">{post.title}</h4>
                    {dest && (
                      <div className="item-dest">
                        <MapIcon size={12} />
                        <span>{dest.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .journal-page {
          padding-top: var(--space-8);
          padding-bottom: var(--space-20);
        }

        .journal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-12);
        }

        .user-profile-large {
          display: flex;
          gap: var(--space-8);
          align-items: center;
        }

        .avatar-wrapper {
          position: relative;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid var(--glass-border);
          padding: 4px;
          background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
                      var(--gradient-primary) border-box;
        }

        .online-indicator {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background: var(--color-success);
          border: 4px solid var(--bg-primary);
          border-radius: 50%;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-2);
        }

        .user-name {
          font-size: var(--font-3xl);
          font-weight: 900;
        }

        .user-bio {
          color: var(--text-secondary);
          margin-bottom: var(--space-4);
        }

        .profile-stats {
          display: flex;
          gap: var(--space-8);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: var(--font-xl);
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: var(--font-xs);
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        /* Content section */
        .journal-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        .content-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .view-switcher {
          display: flex;
          padding: 4px;
          border-radius: var(--radius-full);
        }

        .view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: var(--font-sm);
          font-weight: 700;
          color: var(--text-muted);
          transition: all var(--transition-base);
        }

        .view-btn.active {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .content-search {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 var(--space-4);
          height: 40px;
          border-radius: var(--radius-full);
          width: 260px;
        }

        .content-search input {
          font-size: var(--font-sm);
          width: 100%;
        }

        .empty-journal {
          padding: var(--space-16);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-4);
          color: var(--text-muted);
        }

        .journal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-6);
        }

        .journal-item {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
        }

        .item-media {
          position: relative;
          aspect-ratio: 1;
        }

        .item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .journal-item:hover .item-overlay {
          opacity: 1;
        }

        .item-stats {
          display: flex;
          gap: var(--space-6);
          color: white;
          font-weight: 700;
        }

        .item-stats span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .item-info {
          padding: var(--space-4);
        }

        .item-title {
          font-size: var(--font-base);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .item-dest {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--font-xs);
          color: var(--accent-violet-light);
          font-weight: 600;
        }

        .login-prompt {
          height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: var(--space-6);
        }

        .prompt-icon {
          color: var(--accent-violet);
          opacity: 0.5;
        }

        @media (max-width: 767px) {
          .journal-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: var(--space-6);
          }
          .user-profile-large {
            flex-direction: column;
            gap: var(--space-4);
          }
          .profile-stats {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default JournalPage;
