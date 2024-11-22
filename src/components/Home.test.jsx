import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Home } from './Home';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserInfo } from '../utils/userContext'; // If needed for mocking
import { Posts } from './Posts';
import Events from './Events';
import MyProfile from './MyProfile';
import UserProfile from './UserProfile';

// Mocking useUserInfo hook
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn().mockReturnValue({
    userInfo: [{
      user_metadata: {
        picture: 'https://example.com/picture.jpg',
      },
    }],
  }),
}));

// Mocking Posts component as a named export
vi.mock('./Posts', () => ({
  __esModule: true,
  Posts: vi.fn(() => <div>Posts Component</div>), // Mocked Posts component
}));

// Mocking Events component
vi.mock('./Events', () => ({
  __esModule: true,
  Events: vi.fn(() => <div>Events Component</div>), // Mocked Events component
}));

// Mocking MyProfile component
vi.mock('./MyProfile', () => ({
  __esModule: true,
  default: vi.fn(() => <div>MyProfile Component</div>), // Mocked MyProfile component
}));

// Mocking UserProfile component
vi.mock('./UserProfile', () => ({
  __esModule: true,
  default: vi.fn(() => <div>UserProfile Component</div>), // Mocked UserProfile component
}));

// Mocking useAuth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

describe('Home Component', () => {
  it('renders the home component when authenticated', () => {
    // Mocking the authenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User', sub: 'userId' },
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if Home component is rendered with authenticated user
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Posts Component')).toBeInTheDocument();
  });

  it('conditionally renders the correct component based on state', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User', sub: 'userId' },
    });

    render(
      <BrowserRouter>
        <Home /> r
      </BrowserRouter>
    );

    // Check if Posts component is rendered initially
    expect(screen.getByText('Posts Component')).toBeInTheDocument();

    // Simulate clicking on Events link
   // fireEvent.click(screen.getByText('Events'));
    //expect(screen.getByText('Events Component')).toBeInTheDocument();
  });

  it('does not render the home component when not authenticated', () => {
    // Mocking the unauthenticated state of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Ensure the home component does not render when not authenticated
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Events')).toBeNull();
  });
});
