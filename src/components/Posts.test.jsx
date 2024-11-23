import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Posts from './Posts';  // Adjust path if necessary
import { Post } from '../services/post_services';
import { useUserInfo } from '../utils/userContext';

// Mocking the Post service and useUserInfo hook
vi.mock('../services/post_services', () => ({
  Post: vi.fn().mockImplementation(() => ({
    getPostsData: vi.fn().mockResolvedValue([
      ['postId1', 'postId2'],  // Mock postIds
      [                         // Mock post data
        { id: 'postId1', comments: [], reactions: {} },
        { id: 'postId2', comments: [], reactions: {} },
      ],
    ]),
  })),

  
    addComment: vi.fn(),
    updateComment: vi.fn(),
    deletePost: vi.fn(),
    updatePosts: vi.fn(),
  })),

vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn().mockReturnValue({
    userPicture: 'https://example.com/user.jpg',
  }),
}));

describe('Posts Component', () => {

  it('fetches and renders posts', async () => {
    // Given: Mock data setup is already done above

    const mockUser = { sub: '123', username: 'testUser' };

    // Render the Posts component
    render(<Posts user={mockUser} />);

    // Wait for the posts to be fetched and rendered
    await waitFor(() => screen.getByText('postId1')); // Ensure postId1 is rendered

    // Assert: Check if the posts are rendered
    expect(screen.getByText('postId1')).toBeInTheDocument();
    expect(screen.getByText('postId2')).toBeInTheDocument();

    // Check that the loading state is initially rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Check if the loading message is replaced with posts after fetching
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('handles comment submission', async () => {
    const mockUser = { sub: '123', username: 'testUser' };

    render(<Posts user={mockUser} />);

    // Wait for posts to load
    await waitFor(() => screen.getByText('postId1'));

    // Simulate adding a comment
    const commentInput = screen.getByRole('textbox');
    const comment = 'This is a test comment';
    commentInput.value = comment;

    // Call the comment submit handler
    const submitButton = screen.getByText(/Submit/i);
    submitButton.click();

    // Check if the comment was added
    await waitFor(() => expect(screen.getByText(comment)).toBeInTheDocument());
  });

  it('handles emoji reaction click', async () => {
    const mockUser = { sub: '123', username: 'testUser' };

    render(<Posts user={mockUser} />);

    // Wait for posts to load
    await waitFor(() => screen.getByText('postId1'));

    // Simulate emoji reaction
    const emojiButton = screen.getByText('👍'); // Assuming there's a button with the emoji
    emojiButton.click();

    // Ensure the emoji reaction was added
    await waitFor(() => expect(screen.getByText('👍')).toBeInTheDocument());
  });
});
