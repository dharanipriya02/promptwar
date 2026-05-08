import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MapPin, 
  MoreHorizontal,
  Plus,
  Play,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { vloggers } from '../../data/vloggers';
import { destinations } from '../../data/destinations';

function CommunityFeedPage() {
  const { posts, toggleLike, following, toggleFollow, comments } = useSocial();
  const [activeTab, setActiveTab] = useState('trending');

  const filteredPosts = activeTab === 'following' 
    ? posts.filter(p => following.includes(p.authorId))
    : posts;

  return (
    <div className="community-page container">
      <div className="community-layout">
        <div className="feed-main">
          {/* Feed Header */}
          <div className="feed-header">
            <h1 className="page-title">Community <span className="gradient-text">Feed</span></h1>
            <div className="feed-tabs">
              <button 
                className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
                onClick={() => setActiveTab('trending')}
              >
                Trending
              </button>
              <button 
                className={`tab ${activeTab === 'following' ? 'active' : ''}`}
                onClick={() => setActiveTab('following')}
              >
                Following
              </button>
            </div>
          </div>

          {/* Stories Strip (Vloggers) */}
          <div className="stories-strip scroll-strip">
            <div className="add-story">
              <div className="story-circle glass">
                <Plus size={24} />
              </div>
              <span>Your Story</span>
            </div>
            {vloggers.map(v => (
              <div key={v.id} className="story-item">
                <div className="story-circle active">
                  <img src={v.avatar} alt={v.name} />
                </div>
                <span>{v.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="posts-list">
            {filteredPosts.length === 0 ? (
              <div className="empty-feed glass">
                <h3>No posts yet</h3>
                <p>Follow some travelers to see their adventures here!</p>
              </div>
            ) : (
              filteredPosts.map(post => {
                const author = vloggers.find(v => v.id === post.authorId) || { name: 'Unknown', avatar: 'https://via.placeholder.com/150' };
                const dest = destinations.find(d => d.id === post.destinationId);
                const isFollowing = following.includes(post.authorId);
                const postComments = comments[post.id] || [];

                return (
                  <article key={post.id} className="post-card glass">
                    <div className="post-header">
                      <div className="author-info">
                        <img src={author.avatar} alt={author.name} className="author-avatar" />
                        <div>
                          <div className="author-name-row">
                            <span className="author-name">{author.name}</span>
                            {post.isVlogger && <CheckBadge size={12} />}
                            <span className="dot">•</span>
                            <span className="post-date">{post.datePosted}</span>
                          </div>
                          {dest && (
                            <div className="post-location">
                              <MapPin size={10} />
                              <span>{dest.name}, {dest.country}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="header-actions">
                        {!isFollowing && author.id !== 'you' && (
                          <button className="follow-btn" onClick={() => toggleFollow(author.id)}>
                            <UserPlus size={14} /> Follow
                          </button>
                        )}
                        <button className="icon-btn"><MoreHorizontal size={18} /></button>
                      </div>
                    </div>

                    <div className="post-content">
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.body.split('\n')[2]?.slice(0, 150)}...</p>
                    </div>

                    <div className="post-media scroll-strip">
                      {post.photos.map((photo, i) => (
                        <img key={i} src={photo} alt={post.title} className="post-img" />
                      ))}
                    </div>

                    <div className="post-footer">
                      <div className="engagement">
                        <button className="engagement-btn" onClick={() => toggleLike(post.id)}>
                          <Heart size={20} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="engagement-btn">
                          <MessageCircle size={20} />
                          <span>{postComments.length}</span>
                        </button>
                        <button className="engagement-btn">
                          <Share2 size={20} />
                        </button>
                      </div>
                      <button className="icon-btn"><Bookmark size={20} /></button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        <aside className="community-sidebar">
          <div className="sidebar-widget glass">
            <h4 className="widget-title">Top Travelers</h4>
            <div className="vlogger-list">
              {vloggers.slice(0, 4).map(v => (
                <div key={v.id} className="vlogger-item">
                  <img src={v.avatar} alt={v.name} className="v-avatar" />
                  <div className="v-info">
                    <span className="v-name">{v.name}</span>
                    <span className="v-meta">{v.followers.toLocaleString()} followers</span>
                  </div>
                  <button className="icon-btn" onClick={() => toggleFollow(v.id)}>
                    {following.includes(v.id) ? <Check size={18} color="var(--color-success)" /> : <UserPlus size={18} />}
                  </button>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost w-full btn-sm">Explore More Creators</button>
          </div>

          <div className="sidebar-widget glass">
            <h4 className="widget-title">Trending Tags</h4>
            <div className="tags-cloud">
              {['#Tokyo2026', '#SoloTravel', '#BudgetBackpacking', '#ParisLovers', '#HiddenGems', '#VanLife'].map(tag => (
                <span key={tag} className="trending-tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .community-page {
          padding-top: var(--space-8);
          padding-bottom: var(--space-20);
        }

        .community-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-10);
        }

        @media (max-width: 1024px) {
          .community-layout {
            grid-template-columns: 1fr;
          }
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-8);
        }

        .page-title {
          font-size: var(--font-3xl);
          font-weight: 900;
        }

        .feed-tabs {
          display: flex;
          background: var(--bg-tertiary);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
        }

        .tab {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: var(--font-xs);
          font-weight: 700;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }

        .tab.active {
          background: var(--accent-violet);
          color: white;
          box-shadow: var(--shadow-sm);
        }

        /* Stories */
        .stories-strip {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-10);
          padding-bottom: var(--space-2);
        }

        .story-item, .add-story {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          cursor: pointer;
        }

        .story-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-elevated);
          border: 2px solid var(--glass-border);
          padding: 3px;
        }

        .story-circle.active {
          border-color: var(--accent-violet);
          background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
                      var(--gradient-primary) border-box;
        }

        .story-circle img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .story-item span, .add-story span {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Posts */
        .posts-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .post-card {
          padding: 0;
          overflow: hidden;
        }

        .post-header {
          padding: var(--space-4);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--glass-border);
        }

        .author-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .author-name {
          font-size: var(--font-sm);
          font-weight: 700;
        }

        .post-date {
          font-size: 11px;
          color: var(--text-muted);
        }

        .post-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: var(--accent-violet-light);
          font-weight: 600;
        }

        .follow-btn {
          font-size: var(--font-xs);
          font-weight: 700;
          color: var(--accent-violet-light);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--accent-violet);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .follow-btn:hover {
          background: var(--accent-violet);
          color: white;
        }

        .post-content {
          padding: 0 var(--space-4) var(--space-4);
        }

        .post-title {
          font-size: var(--font-base);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .post-excerpt {
          font-size: var(--font-sm);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .post-media {
          display: flex;
          gap: 2px;
          background: black;
        }

        .post-img {
          height: 400px;
          width: 100%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .post-footer {
          padding: var(--space-4);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .engagement {
          display: flex;
          gap: var(--space-6);
        }

        .engagement-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .engagement-btn:hover {
          color: var(--accent-violet-light);
        }

        /* Sidebar Widgets */
        .community-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .sidebar-widget {
          padding: var(--space-5);
        }

        .widget-title {
          font-size: var(--font-sm);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: var(--space-4);
        }

        .vlogger-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .vlogger-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .v-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .v-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .v-name {
          font-size: var(--font-sm);
          font-weight: 700;
        }

        .v-meta {
          font-size: 11px;
          color: var(--text-muted);
        }

        .tags-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .trending-tag {
          font-size: var(--font-xs);
          font-weight: 600;
          color: var(--text-secondary);
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .trending-tag:hover {
          color: var(--accent-cyan-light);
        }
      `}</style>
    </div>
  );
}

function CheckBadge({ size }) {
  return (
    <div style={{ background: '#3B82F6', borderRadius: '50%', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Check size={size} color="white" strokeWidth={4} />
    </div>
  );
}

function Check({ size, color, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default CommunityFeedPage;
