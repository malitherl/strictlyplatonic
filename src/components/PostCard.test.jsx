import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { PostCard } from './PostCard';
import { useUserInfo } from '../utils/userContext';

// Mocking `useUserInfo` hook
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(),
}));

// Mocking `updateUserFriends`
vi.mock('../services/user_services', () => ({
  updateUserFriends: vi.fn(),
}));

describe('PostCard Component', () => {
  const mockPost = {
    title: 'Sample Post',
    desc: 'This is a test post description.',
    image: 'https://via.placeholder.com/300',
    creator: 'user123',
    creator_pic: 'https://via.placeholder.com/50',
    user_name: 'Test User',
    date: '2024-12-01',
    comments: [],
    reactions: { '👍': 2, '❤️': 1 },
  };

  const mockUser = {
    sub: 'user456',
  };

  const mockUserInfo = [
    {
      user_metadata: {
        friends: ['user123'], // Mocked list of friends
      },
    },
  ];

  const handleCommentSubmit = vi.fn();
  const removePost = vi.fn();
  const handleEmojiClick = vi.fn();
  const handleCommentEdit = vi.fn();
  const handleCommentDelete = vi.fn();

  beforeEach(() => {
    // Setting up the mocked `useUserInfo` hook
    useUserInfo.mockReturnValue({
      userInfo: mockUserInfo,
      fetchData: vi.fn(),
    });
  });

  it('renders the PostCard with the correct content', () => {
    render(
      <PostCard
        post={mockPost}
        id="1"
        user={mockUser}
        handleCommentSubmit={handleCommentSubmit}
        postsData={[]}
        removePost={removePost}
        handleEmojiClick={handleEmojiClick}
        handleCommentEdit={handleCommentEdit}
        handleCommentDelete={handleCommentDelete}
      />
    );

    // Check for post title, description, and image
    expect(screen.getByText(/Sample Post/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test post description./i)).toBeInTheDocument();
    expect(screen.getByAltText(/Post/i)).toBeInTheDocument();

    // Check for reactions
    expect(screen.getByText(/👍 2/i)).toBeInTheDocument();
    expect(screen.getByText(/❤️ 1/i)).toBeInTheDocument();
  });

  it('handles follow/unfollow functionality', () => {
    render(
      <PostCard
        post={mockPost}
        id="1"
        user={mockUser}
        handleCommentSubmit={handleCommentSubmit}
        postsData={[]}
        removePost={removePost}
        handleEmojiClick={handleEmojiClick}
        handleCommentEdit={handleCommentEdit}
        handleCommentDelete={handleCommentDelete}
      />
    );

    // Initially following
    const followButton = screen.getByText(/Unfollow/i);
    expect(followButton).toBeInTheDocument();

    fireEvent.click(followButton);
    expect(useUserInfo().fetchData).toHaveBeenCalled(); // Ensure fetchData was called on unfollow
  });

  it('handles post deletion', () => {
    render(
      <PostCard
        post={mockPost}
        id="1"
        user={{ ...mockUser, sub: 'user123' }} // Simulate post owner
        handleCommentSubmit={handleCommentSubmit}
        postsData={[]}
        removePost={removePost}
        handleEmojiClick={handleEmojiClick}
        handleCommentEdit={handleCommentEdit}
        handleCommentDelete={handleCommentDelete}
      />
    );

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(removePost).toHaveBeenCalledWith('1'); // Ensures the delete action was triggered
  });

});
