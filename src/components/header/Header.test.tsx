import { render, screen } from '@testing-library/preact';
import { expect, test, describe } from 'vitest';
import Header from './index';

describe('Header Component', () => {
  test('renders site title', () => {
    render(<Header />);
    
    expect(screen.getByText('CustomFades')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /view blog articles/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact information and form/i })).toBeInTheDocument();
  });

  test('home link navigates to root', () => {
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('has proper semantic structure', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});