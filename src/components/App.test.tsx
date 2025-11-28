import { render, screen } from '@testing-library/preact';
import { expect, test, describe } from 'vitest';
import App from './app';

describe('App Component', () => {
  test('renders header and main content', () => {
    render(<App />);
    
    // Should render the header
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Should render navigation
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    const { container } = render(<App />);
    
    // Check for main app structure
    expect(container.querySelector('#app')).toBeInTheDocument();
  });

  test('header contains site title', () => {
    render(<App />);
    
    expect(screen.getByText('CustomFades')).toBeInTheDocument();
  });
});