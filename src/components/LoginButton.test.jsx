import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import LoginButton from './LoginButton';

// Mocking useAuth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

describe('LoginButton Component', () => {
  it('renders login button when not authenticated', () => {
    // Mocking the unauthenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LoginButton />
      </BrowserRouter>
    );

    // Check if the login button is rendered
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('calls loginWithPopup when login button is clicked', () => {
    // Mocking the unauthenticated state and loginWithPopup function
    const loginWithPopupMock = vi.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: loginWithPopupMock,
    });

    render(
      <BrowserRouter>
        <LoginButton />
      </BrowserRouter>
    );

    // Simulate clicking the login button
    fireEvent.click(screen.getByText('Log In'));

    // Ensure loginWithPopup is called
    expect(loginWithPopupMock).toHaveBeenCalled();
  });

  it('redirects to /home when authenticated', () => {
    // Mocking the authenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithPopup: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LoginButton />
      </BrowserRouter>
    );

    // Check if Navigate to /home is rendered
    expect(screen.queryByText('Log In')).toBeNull();
  });

  it('logs "redirecting to home" when authenticated', () => {
    // Mocking the authenticated state of useAuth0
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithPopup: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LoginButton />
      </BrowserRouter>
    );

    // Ensure the console log is triggered
    expect(consoleLogMock).toHaveBeenCalledWith('redirecting to home');

    // Clean up the mock
    consoleLogMock.mockRestore();
  });
});
