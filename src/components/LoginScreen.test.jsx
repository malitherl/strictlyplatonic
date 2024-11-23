import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';

// Mocking useAuth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

describe('LoginScreen Component', () => {
  it('renders the login button when not authenticated', () => {
    // Mocking the unauthenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );

    // Verify the login button is rendered
    expect(screen.getByText('Log In')).toBeInTheDocument();

  });

  it('calls loginWithPopup when login button is clicked', () => {
    const loginWithPopupMock = vi.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithPopup: loginWithPopupMock,
    });

    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Log In'));
    expect(loginWithPopupMock).toHaveBeenCalled();
  });

  it('redirects to /home when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithPopup: vi.fn(),
    });

    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );

    // Ensure the Navigate component redirects to "/home"
    expect(screen.queryByText('Log In')).toBeNull();
   // expect(screen.queryByText('About')).toBeNull();
  });
});
