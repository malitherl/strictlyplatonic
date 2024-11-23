import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CommentForm } from './CommentForm';

describe('CommentForm Component', () => {
  const mockUser = {
    name: 'Test User',
    sub: '123',
  };

  const mockPostId = 1;
  const mockHandleCommentSubmit = vi.fn();

  it('renders the form and displays the user name', () => {
    render(
      <CommentForm
        user={mockUser}
        postId={mockPostId}
        handleCommentSubmit={mockHandleCommentSubmit}
      />
    );

    // Use a function matcher to find text that spans multiple elements
    const commentingAsText = screen.getByText((content, element) => {
      return element.textContent === 'Commenting as Test User';
    });
    expect(commentingAsText).toBeInTheDocument();

    // Check for textarea and submit button
    expect(
      screen.getByPlaceholderText('add your comment here...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('updates the textarea value when typing', () => {
    render(
      <CommentForm
        user={mockUser}
        postId={mockPostId}
        handleCommentSubmit={mockHandleCommentSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText('add your comment here...');
    fireEvent.change(textarea, { target: { value: 'New Comment' } });

    expect(textarea.value).toBe('New Comment');
  });

  it('calls handleCommentSubmit with the correct data on form submission', () => {
    render(
      <CommentForm
        user={mockUser}
        postId={mockPostId}
        handleCommentSubmit={mockHandleCommentSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText('add your comment here...');
    fireEvent.change(textarea, { target: { value: 'This is a test comment' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockHandleCommentSubmit).toHaveBeenCalledWith(mockPostId, {
      user_id: mockUser.sub,
      username: mockUser.name,
      comment: 'This is a test comment',
      image: '',
      time: expect.any(String), // Matches any string (timestamp)
    });

    expect(textarea.value).toBe(''); // Clears textarea after submission
  });
});
