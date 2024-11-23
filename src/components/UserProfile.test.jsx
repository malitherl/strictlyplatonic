import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserProfile from './UserProfile'; // Adjust path if necessary
import { retrieveUserList } from '../services/user_services';
import { useUserInfo } from '../utils/userContext';
import { useAuth0 } from '@auth0/auth0-react';


// Mocking the `retrieveUserList` function
vi.mock('../services/user_services', () => ({
retrieveUserList: vi.fn(),
}));

// Mocking `useNavigate` from react-router-dom
vi.mock('react-router-dom', () => ({
useNavigate: vi.fn(() => vi.fn()), // Mock navigate as a no-op function
Navigate: ({ to }) => <div>Redirected to {to}</div>,
}));
// Mocking `useUserInfo` and `useAuth0`
vi.mock('../utils/userContext', () => ({
useUserInfo: vi.fn(),
}));
vi.mock('@auth0/auth0-react', () => ({
useAuth0: vi.fn(),
}));


describe('UserProfile Component', () => {
beforeEach(() => {
  useUserInfo.mockReturnValue({
    userInfo: [
      {
        user_metadata: {
          friends: ['user123'],
        },
      },
    ],
  });

  useAuth0.mockReturnValue({
    isAuthenticated: true,
  });
});

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
it('renders message when no friends are found', async () => {
  useUserInfo.mockReturnValueOnce({
    userInfo: [
      {
        user_metadata: {
          friends: [],
        },
      },
    ],
  });

  retrieveUserList.mockResolvedValue([]);

  render(<UserProfile />);

  await waitFor(() => screen.getByText(/When you follow people on the Home page, they will show up here :-\)/i));
  expect(screen.getByText(/When you follow people on the Home page, they will show up here :-\)/i)).toBeInTheDocument();
});

it('redirects to home page if not authenticated', () => {
  useAuth0.mockReturnValueOnce({
    isAuthenticated: false,
  });

  render(<UserProfile />);
  expect(screen.getByText(/Redirected to \//i)).toBeInTheDocument();
});
});

