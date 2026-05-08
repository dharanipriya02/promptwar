export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

export const MAP_LIBRARIES = ['places', 'geometry'];

export const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b7280' }] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a2e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#252540' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0c1445' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#111128' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0d1a0d' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#15152a' }]
  }
];

export const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 }; // India center
export const DEFAULT_ZOOM = 4;
