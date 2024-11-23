import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Comments } from './Comments';

describe('Comments Component', () => {
  const mockUser = { sub: '123', name: 'Test User' };
  const mockComments = [
    {
      user_id: '123',
      username: 'Test User',
      comment: 'This is a test comment',
      image: '',
    },
    {
      user_id: '456',
      username: 'Another User',
      comment: 'Another user comment',
      image: '',
    },
  ];
  const mockHandleCommentEdit = vi.fn();



  it('renders "No comments yet" message if no comments are provided', () => {
    render(
      <Comments
        id={1}
        user={mockUser}
        comments={[]}
        handleCommentEdit={mockHandleCommentEdit}
      />
    );

    expect(screen.getByText(/No comments yet! Be the first and comment below :-\)/i)).toBeInTheDocument();
  });

  it('displays the edit button only for comments created by the user', () => {
    render(
      <Comments
        id={1}
        user={mockUser}
        comments={mockComments}
        handleCommentEdit={mockHandleCommentEdit}
      />
    );

    expect(screen.getByText(/edit/i)).toBeInTheDocument(); // For the first comment
    expect(screen.queryByText(/edit/i, { selector: 'button' })).not.toHaveTextContent(/Another User/i); // Second comment has no edit button
  });

});
