import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BackButton from './BackButton';

// Mock react-router-dom, including the useNavigate function
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Import original module
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate
  };
});

describe('BackButton Component', () => {
  it('renders the Go Back button', () => {
    render(<BackButton />);

    // Check if the button is rendered
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  }); 
  });

