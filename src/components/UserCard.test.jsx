import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import UserCard from './UserCard';

// Mocking the `useUserInfo` hook
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(() => ({
    userInfo: [
      {
        user_metadata: {
          picture: 'https://example.com/image.jpg',
        },
        name: 'Mock User',
        nickname: 'mockuser',
      },
    ],
  })),
}));

describe('UserCard Component', () => {
  it('renders user data correctly', async () => {
    // Mock user prop
    const mockUser = {
      name: 'Test User',
      nickname: 'testuser',
      picture: 'https://example.com/default.jpg',
    };

    // Render the component within a MemoryRouter to provide routing context
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Mock User/i)); // Wait for mock user data to be rendered

    // Check if the user's name, nickname, and profile picture are rendered
    expect(screen.getByText(/Mock User/i)).toBeInTheDocument();
    expect(screen.getByText(/@mockuser/i)).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', 'https://example.com/image.jpg');

    // Verify the presence of routing elements
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Friends/i)).toBeInTheDocument();
  });
});
