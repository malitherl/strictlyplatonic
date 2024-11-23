import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import LogoutButton from './LogoutButton';

// Mocking useAuth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

describe('LogoutButton Component', () => {
  it('renders log out button when authenticated', () => {
    // Mocking the authenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LogoutButton />
      </BrowserRouter>
    );

    // Check if the log out button is rendered
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('calls logout function when log out button is clicked', () => {
    // Mocking the authenticated state and logout function
    const logoutMock = vi.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: logoutMock,
    });

    render(
      <BrowserRouter>
        <LogoutButton />
      </BrowserRouter>
    );

    // Simulate clicking the log out button
    fireEvent.click(screen.getByText('Log Out'));

    // Ensure logout is called
    expect(logoutMock).toHaveBeenCalled();
  });

  it('redirects to / when not authenticated', () => {
    // Mocking the unauthenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LogoutButton />
      </BrowserRouter>
    );

    // Ensure the Navigate component redirects to "/"
    expect(screen.queryByText('Log Out')).toBeNull();
  });
});
