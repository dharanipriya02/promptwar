import React, { useState, useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import { TripProvider } from './context/TripContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SocialProvider } from './context/SocialContext';
import Layout from './components/Layout/Layout';

// Pages
import ExplorePage from './pages/Explore/ExplorePage';
import DestinationPage from './pages/Destination/DestinationPage';
import PlannerPage from './pages/Planner/PlannerPage';
import TripsPage from './pages/Trips/TripsPage';
import MapPage from './pages/Map/MapPage';
import ExperiencesPage from './pages/Experiences/ExperiencesPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import EventsPage from './pages/Events/EventsPage';
import CelebrityPage from './pages/Celebrity/CelebrityPage';
import CommunityFeedPage from './pages/Community/CommunityFeedPage';
import JournalPage from './pages/Journal/JournalPage';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'explore');
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'explore';
      
      // Parse params if any (e.g. #destination/paris)
      const parts = hash.split('/');
      const baseRoute = parts[0];
      const params = {};
      if (parts[1]) params.id = parts[1];
      
      setRoute(baseRoute);
      setRouteParams(params);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case 'explore': return <ExplorePage />;
      case 'destination': return <DestinationPage id={routeParams.id} />;
      case 'planner': return <PlannerPage />;
      case 'trips': return <TripsPage />;
      case 'map': return <MapPage />;
      case 'experiences': return <ExperiencesPage />;
      case 'favorites': return <FavoritesPage />;
      case 'events': return <EventsPage />;
      case 'celebrity': return <CelebrityPage />;
      case 'community': return <CommunityFeedPage />;
      case 'journal': return <JournalPage />;
      default: return <ExplorePage />;
    }
  };

  return (
    <UserProvider>
      <TripProvider>
        <FavoritesProvider>
          <SocialProvider>
            <Layout currentRoute={route}>
              {renderPage()}
            </Layout>
          </SocialProvider>
        </FavoritesProvider>
      </TripProvider>
    </UserProvider>
  );
}

export default App;
