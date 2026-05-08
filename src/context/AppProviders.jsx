import React from 'react';
import { UserProvider } from './UserContext';
import { TripProvider } from './TripContext';
import { FavoritesProvider } from './FavoritesContext';
import { SocialProvider } from './SocialContext';

export function AppProviders({ children }) {
  return (
    <UserProvider>
      <TripProvider>
        <FavoritesProvider>
          <SocialProvider>
            {children}
          </SocialProvider>
        </FavoritesProvider>
      </TripProvider>
    </UserProvider>
  );
}
