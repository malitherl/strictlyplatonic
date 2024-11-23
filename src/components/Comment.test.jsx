import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Comment } from './Comment';

// Mock the CommentEditForm component
vi.mock('./CommentEditForm', () => ({
  CommentEditForm: ({ handleEditToggle }) => (
    <div>
      <p>Comment Edit Form</p>
      <button onClick={handleEditToggle}>Cancel Edit</button>
    </div>
  ),
}));

describe('Comment Component', () => {
  const mockUser = { sub: '12345' };
  const mockComment = {
    username: 'test_user',
    comment: 'This is a test comment',
    user_id: '12345',
    image: 'https://example.com/test.jpg',
  };
  const mockHandleCommentEdit = vi.fn();
  const mockHandleCommentDelete = vi.fn();

  it('renders the comment with username and text', () => {
    render(
      <Comment
        user={mockUser}
        id="1"
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleCommentDelete={mockHandleCommentDelete}
      />
    );

    expect(screen.getByText(/test_user:/)).toBeInTheDocument();
    expect(screen.getByText(/This is a test comment/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Comment/i })).toHaveAttribute('src', mockComment.image);
  });

  it('shows edit and delete buttons for the user’s comment', () => {
    render(
      <Comment
        user={mockUser}
        id="1"
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleCommentDelete={mockHandleCommentDelete}
      />
    );

    expect(screen.getByText('edit')).toBeInTheDocument();
    expect(screen.getByText('delete')).toBeInTheDocument();
  });

  it('toggles the edit form when edit button is clicked', () => {
    render(
      <Comment
        user={mockUser}
        id="1"
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleCommentDelete={mockHandleCommentDelete}
      />
    );

    fireEvent.click(screen.getByText('edit'));
    expect(screen.getByText('Comment Edit Form')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel Edit'));
    expect(screen.queryByText('Comment Edit Form')).toBeNull();
  });

  it('calls handleCommentDelete when delete button is clicked', () => {
    render(
      <Comment
        user={mockUser}
        id="1"
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleCommentDelete={mockHandleCommentDelete}
      />
    );

    fireEvent.click(screen.getByText('delete'));
    expect(mockHandleCommentDelete).toHaveBeenCalledWith('1', mockComment);
  });

  it('does not show edit or delete buttons for other users’ comments', () => {
    const otherUserComment = { ...mockComment, user_id: '67890' };

    render(
      <Comment
        user={mockUser}
        id="1"
        comment={otherUserComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleCommentDelete={mockHandleCommentDelete}
      />
    );

    expect(screen.queryByText('edit')).toBeNull();
    expect(screen.queryByText('delete')).toBeNull();
  });
});
