import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DestinationCard from '../components/DestinationCard/DestinationCard';
import { FavoritesProvider } from '../context/FavoritesContext';

// Mock the context since it depends on localStorage
vi.mock('../context/FavoritesContext', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    toggleFavorite: vi.fn(),
  }),
  FavoritesProvider: ({ children }) => <div>{children}</div>,
}));

describe('DestinationCard', () => {
  const mockDestination = {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    tagline: 'The City of Light',
    imageUrl: '/images/paris.png',
    rating: 4.8,
    tripTypes: ['couple', 'city'],
  };

  it('renders destination details correctly', () => {
    render(<DestinationCard destination={mockDestination} />);
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('The City of Light')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('navigates on click', () => {
    const originalHash = window.location.hash;
    render(<DestinationCard destination={mockDestination} />);
    
    fireEvent.click(screen.getByText('Paris'));
    expect(window.location.hash).toBe('#destination/paris');
    
    // Cleanup
    window.location.hash = originalHash;
  });
});
