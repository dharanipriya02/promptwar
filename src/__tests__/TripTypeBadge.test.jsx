import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TripTypeBadge from '../components/TripTypeBadge/TripTypeBadge';

describe('TripTypeBadge', () => {
  it('renders correctly with label', () => {
    render(<TripTypeBadge type="beach" />);
    expect(screen.getByText('🏖️')).toBeInTheDocument();
    expect(screen.getByText('Beach')).toBeInTheDocument();
  });

  it('renders only icon when showLabel is false', () => {
    render(<TripTypeBadge type="beach" showLabel={false} />);
    expect(screen.getByText('🏖️')).toBeInTheDocument();
    expect(screen.queryByText('Beach')).not.toBeInTheDocument();
  });

  it('renders fallback for unknown type', () => {
    render(<TripTypeBadge type="unknown" />);
    expect(screen.getByText('📍')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });
});
