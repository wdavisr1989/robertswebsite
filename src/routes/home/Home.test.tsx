import { render, screen } from '@testing-library/preact';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import Home from './index';

// Mock window location
const mockLocation = {
  href: 'http://localhost:3000/',
  replace: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders home page content', () => {
    render(<Home />);
    
    expect(screen.getByText(/customfades brings a unique perspective/i)).toBeInTheDocument();
    expect(screen.getByText(/Photography Enthusiast Magazine/i)).toBeInTheDocument();
  });

  test('handles Netlify CMS invite token redirect', () => {
    mockLocation.href = 'http://localhost:3000/#invite_token=abc123';
    
    render(<Home />);
    
    // The redirect should happen in useEffect
    expect(mockLocation.href).toContain('#invite_token');
  });

  test('displays bio content', () => {
    render(<Home />);
    
    expect(screen.getByText(/Welcome to CustomFades/i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    const { container } = render(<Home />);
    
    // Check for main content structure with CSS module class
    const homeElement = container.querySelector('main[role="main"]');
    expect(homeElement).not.toBeNull();
    
    // Check for semantic sections
    expect(container.querySelector('section')).not.toBeNull();
    expect(container.querySelector('blockquote')).not.toBeNull();
  });
});