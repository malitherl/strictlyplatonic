import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserProfile from './UserProfile'; // Adjust path if necessary
import { retrieveUserList } from '../services/user_services';

// Mocking the `retrieveUserList` function
vi.mock('../services/user_services', () => ({
  retrieveUserList: vi.fn(),
}));

// Mocking `useNavigate` from react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => vi.fn()), // Mock navigate as a no-op function
}));

describe('UserProfile Component', () => {
  it('fetches and renders user data', async () => {
    const mockUserData = [
      {
        posts: 1,
        user_metadata: {
          picture: 'https://example.com/image.jpg',
          socials: [{ twitter: 'https://twitter.com/user' }],
          hobbies: ['Reading', 'Traveling'],
          friends: true,
          schedule: [
            { date: '2024-11-21', time: '10:00 AM', activity: 'Meeting' },
            { date: '2024-11-22', time: '2:00 PM', activity: 'Work' },
          ],
        },
        username: 'user123',
        name: 'User One',
        picture: 'https://example.com/default.jpg',
      },
    ];

    retrieveUserList.mockResolvedValue(mockUserData);

    render(<UserProfile />);

    //expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => screen.getByText(/User One/i));

    expect(screen.getByText(/User One/i)).toBeInTheDocument();
    expect(screen.getByText(/@user123/i)).toBeInTheDocument();
    expect(screen.getByText(/Reading, Traveling/i)).toBeInTheDocument();
  });
});
