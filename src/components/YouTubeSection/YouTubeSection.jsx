import React from 'react';
import { Play, Youtube, ExternalLink } from 'lucide-react';
import { useYouTube } from '../../hooks/useYouTube';

function YouTubeSection({ query }) {
  const { videos, loading } = useYouTube(query);

  if (!loading && (!videos || videos.length === 0)) return null;

  return (
    <section className="youtube-section glass">
      <div className="section-header">
        <div className="header-title">
          <Youtube color="#FF0000" fill="#FF0000" size={24} />
          <h3>Travel Vlogs</h3>
        </div>
        <p>See {query} through the eyes of top creators</p>
      </div>

      <div className="video-grid scroll-strip">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="video-skeleton skeleton" style={{ minWidth: '300px', height: '180px' }}></div>
          ))
        ) : (
          videos.map(video => (
            <a 
              key={video.id} 
              href={`https://www.youtube.com/watch?v=${video.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-card card-hover"
            >
              <div className="thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="play-overlay">
                  <div className="play-circle">
                    <Play size={20} fill="white" />
                  </div>
                </div>
              </div>
              <div className="video-info">
                <h4 className="video-title" dangerouslySetInnerHTML={{ __html: video.title }}></h4>
                <p className="video-channel">{video.channel}</p>
              </div>
            </a>
          ))
        )}
      </div>

      <style jsx>{`
        .youtube-section {
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-8);
        }

        .section-header {
          margin-bottom: var(--space-6);
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: 4px;
        }

        .header-title h3 {
          font-size: var(--font-xl);
          font-weight: 800;
        }

        .section-header p {
          font-size: var(--font-sm);
          color: var(--text-muted);
        }

        .video-grid {
          display: flex;
          gap: var(--space-4);
          padding-bottom: var(--space-2);
        }

        .video-card {
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          text-decoration: none;
        }

        .thumbnail-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-elevated);
        }

        .video-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-base);
        }

        .video-card:hover .video-thumbnail {
          transform: scale(1.05);
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .video-card:hover .play-overlay {
          opacity: 1;
        }

        .play-circle {
          width: 48px;
          height: 48px;
          background: #FF0000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(255, 0, 0, 0.4);
        }

        .video-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .video-title {
          font-size: var(--font-sm);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .video-channel {
          font-size: var(--font-xs);
          color: var(--text-muted);
        }

        .video-skeleton {
          border-radius: var(--radius-md);
        }
      `}</style>
    </section>
  );
}

export default YouTubeSection;
