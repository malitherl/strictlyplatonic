import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { Navigation } from './Navigation';
import { useAuth0 } from '@auth0/auth0-react';

vi.mock('@auth0/auth0-react');
vi.mock('../hooks/useProfileData', () => ({
  useProfileData: () => ({ name: 'Test User', email: 'test@example.com' }),
}));

vi.mock('./Posts', () => ({
  Posts: () => <div>Posts Component</div>,
}));

vi.mock('./Events', () => ({
  default: () => <div>Events Component</div>,
}));

vi.mock('./MyProfile', () => ({
  MyProfile: () => <div>MyProfile Component</div>,
}));

vi.mock('./UserProfile', () => ({
  UserProfile: () => <div>UserProfile Component</div>,
}));

vi.mock('./UserCard', () => ({
  default: ({ user, handleClick }) => (
    <div>
      UserCard Component for {user?.name}
      <button onClick={() => handleClick('myprofile')}>Go to MyProfile</button>
    </div>
  ),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User', email: 'test@example.com' },
    });

    render(<Navigation />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Posts Component')).toBeInTheDocument();
  });

  it('does not render dashboard when not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(<Navigation />);

    expect(screen.queryByRole('dashboardContainer')).not.toBeInTheDocument();
  });

  it('renders correct content when navigation buttons are clicked', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User', email: 'test@example.com' },
    });

    render(<Navigation />);

    fireEvent.click(screen.getByText('Events'));
    expect(screen.getByText('Events Component')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Go to MyProfile')); // From UserCard mock
    expect(screen.getByText('MyProfile Component')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Posts Component')).toBeInTheDocument();
  });

  it('starts with default posts view', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User', email: 'test@example.com' },
    });

    render(<Navigation />);
    expect(screen.getByText('Posts Component')).toBeInTheDocument();
  });
});
