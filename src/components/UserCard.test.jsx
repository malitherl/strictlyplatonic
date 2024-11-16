import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserCard from './UserCard';
import { UserProvider, useUserInfo } from '../utils/userContext';
import { useAuth0 } from '@auth0/auth0-react';

// Mocking useAuth0 to simulate authenticated user
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

// Mocking useUserInfo context hook
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(),
  UserProvider: ({ children }) => <div>{children}</div>
}));

// Test data
const mockUser = {
    name: 'Test User',
    nickname: 'testuser123',
    picture: 'https://example.com/profile.jpg',
  };
  

const mockUserInfo = [
  {
    name: 'Updated Name',
    nickname: 'updatedNickname',
    user_metadata: {
      picture: 'https://example.com/updated-profile.jpg',
    },
  },
];

describe('UserCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useUserInfo.mockReturnValue({
  userPicture: 'https://example.com/profile.jpg', // Ensure this matches
  setUserPicture: vi.fn(),
});

useAuth0.mockReturnValue({
  user: {
    name: 'Test User',
    nickname: 'testuser123',
    picture: 'https://example.com/profile.jpg',
  },
  isAuthenticated: true,
});

  });

test('renders user details correctly', () => {
    render(
      <UserProvider>
        <UserCard handleClick={vi.fn()} user={mockUser} userInfo={mockUserInfo} />
      </UserProvider>
    );

    // Check if the profile picture, name, and nickname are rendered
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', mockUser.picture);
  
// Match the correct name and nickname
  expect(screen.getByText('Updated Name')).toBeInTheDocument();
  expect(screen.getByText('@updatedNickname')).toBeInTheDocument();
});
 

test('updates profile details when userInfo changes', () => {
    // Render the UserCard with the required props
    render(
      <UserCard
        user={mockUser}
        handleClick={vi.fn()}
        userInfo={{}}
      />
    );
  
    // Assertions for initial render
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', mockUser.picture);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser123')).toBeInTheDocument();
  });
  
});