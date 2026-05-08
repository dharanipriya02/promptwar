import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Navigation,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { destinations, TRIP_TYPES } from '../../data/destinations';
import { experiences } from '../../data/experiences';
import { DARK_MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, GOOGLE_MAPS_API_KEY, MAP_LIBRARIES } from '../../lib/googleMaps';

function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: MAP_LIBRARIES
  });

  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const filteredPoints = useMemo(() => {
    let pts = [...destinations];
    if (activeType !== 'all') {
      pts = pts.filter(p => p.tripTypes.includes(activeType));
    }
    if (searchQuery) {
      pts = pts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return pts;
  }, [activeType, searchQuery]);

  if (!isLoaded) return <div className="map-loading skeleton container"></div>;

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: DARK_MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: false
          }}
        >
          {filteredPoints.map((p) => (
            <Marker
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              onClick={() => setSelectedPoint(p)}
              icon={{
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
                fillColor: selectedPoint?.id === p.id ? '#7C3AED' : '#06B6D4',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
                scale: 1.5,
                anchor: new window.google.maps.Point(12, 22)
              }}
            />
          ))}

          {selectedPoint && (
            <InfoWindow
              position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
              onCloseClick={() => setSelectedPoint(null)}
            >
              <div className="map-popup">
                <img src={selectedPoint.imageUrl} alt={selectedPoint.name} className="popup-img" />
                <div className="popup-content">
                  <h4 className="popup-title">{selectedPoint.name}</h4>
                  <div className="popup-meta">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{selectedPoint.rating}</span>
                    <span className="dot">•</span>
                    <span>{selectedPoint.country}</span>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => window.location.hash = `destination/${selectedPoint.id}`}>
                    Explore Destination
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Map Controls */}
        <div className="map-overlay">
          <div className="map-sidebar glass">
            <div className="sidebar-header">
              <div className="search-bar glass">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Find places..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-section">
              <h5 className="section-title">Trip Style</h5>
              <div className="type-filters">
                <button 
                  className={`type-chip ${activeType === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveType('all')}
                >
                  All
                </button>
                {TRIP_TYPES.slice(0, 6).map(t => (
                  <button 
                    key={t.id} 
                    className={`type-chip ${activeType === t.id ? 'active' : ''}`}
                    onClick={() => setActiveType(t.id)}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="results-section">
              <h5 className="section-title">Nearby Destinations</h5>
              <div className="map-results-list">
                {filteredPoints.map(p => (
                  <button key={p.id} className="result-item" onClick={() => {
                    setSelectedPoint(p);
                    map?.panTo({ lat: p.lat, lng: p.lng });
                    map?.setZoom(8);
                  }}>
                    <div className="res-img"><img src={p.imageUrl} alt={p.name} /></div>
                    <div className="res-info">
                      <span className="res-name">{p.name}</span>
                      <span className="res-sub">{p.country}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .map-page {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .map-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }

        .map-loading {
          width: 100%;
          height: 80vh;
          border-radius: var(--radius-xl);
        }

        .map-overlay {
          position: absolute;
          top: var(--space-6);
          left: var(--space-6);
          bottom: var(--space-6);
          pointer-events: none;
          z-index: 1;
        }

        .map-sidebar {
          width: 320px;
          height: 100%;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          padding: var(--space-4);
          gap: var(--space-6);
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 var(--space-4);
          height: 48px;
          border-radius: var(--radius-md);
        }

        .search-bar input {
          font-size: var(--font-sm);
          width: 100%;
        }

        .section-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: var(--space-3);
          font-weight: 800;
        }

        .type-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .type-chip {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .type-chip.active {
          background: var(--accent-violet);
          color: white;
          border-color: var(--accent-violet);
        }

        .map-results-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
          text-align: left;
        }

        .result-item:hover {
          background: var(--glass-bg-hover);
        }

        .res-img {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
        }

        .res-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .res-info {
          display: flex;
          flex-direction: column;
        }

        .res-name {
          font-size: var(--font-sm);
          font-weight: 700;
        }

        .res-sub {
          font-size: 10px;
          color: var(--text-muted);
        }

        /* InfoWindow Styles */
        .map-popup {
          width: 200px;
          color: #000;
        }

        .popup-img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 4px 4px 0 0;
        }

        .popup-content {
          padding: 10px;
        }

        .popup-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .popup-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #666;
          margin-bottom: 10px;
        }

        .dot { margin: 0 4px; }
      `}</style>
    </div>
  );
}

export default MapPage;
