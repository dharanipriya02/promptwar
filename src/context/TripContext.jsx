import { createContext, useContext, useReducer, useEffect } from 'react';

const TripContext = createContext(null);

const STORAGE_KEY = 'wandr_trips';
const loadTrips = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }};

function tripReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRIP': return [...state, { ...action.payload, id: Date.now().toString(), createdAt: new Date().toISOString() }];
    case 'UPDATE_TRIP': return state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t);
    case 'DELETE_TRIP': return state.filter(t => t.id !== action.payload);
    case 'ADD_TO_ITINERARY': return state.map(t => {
      if (t.id !== action.payload.tripId) return t;
      const itinerary = [...(t.itinerary || [])];
      const dayIdx = itinerary.findIndex(d => d.day === action.payload.day);
      if (dayIdx >= 0) {
        itinerary[dayIdx] = { ...itinerary[dayIdx], [action.payload.slot]: action.payload.activity };
      }
      return { ...t, itinerary };
    });
    default: return state;
  }
}

export function TripProvider({ children }) {
  const [trips, dispatch] = useReducer(tripReducer, [], loadTrips);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(trips)); }, [trips]);

  return (
    <TripContext.Provider value={{ trips, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrips = () => useContext(TripContext);
