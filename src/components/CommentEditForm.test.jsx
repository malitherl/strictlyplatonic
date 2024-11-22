import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CommentEditForm } from './CommentEditForm';

describe('CommentEditForm Component', () => {
  const mockHandleCommentEdit = vi.fn();
  const mockHandleEditToggle = vi.fn();
  const mockComment = {
    id: 1,
    comment: 'This is a test comment',
    username: 'test_user',
  };

  it('renders the form and textarea with initial state', () => {
    render(
      <CommentEditForm
        id={mockComment.id}
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleEditToggle={mockHandleEditToggle}
      />
    );

    // Verify placeholder text and empty textarea
    expect(
      screen.getByPlaceholderText('edit your comment here...')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('edit your comment here...').value).toBe('');
  });

  it('updates the textarea value when typing', () => {
    render(
      <CommentEditForm
        id={mockComment.id}
        comment={mockComment}
        handleCommentEdit={mockHandleCommentEdit}
        handleEditToggle={mockHandleEditToggle}
      />
    );

    const textarea = screen.getByPlaceholderText('edit your comment here...');
    fireEvent.change(textarea, { target: { value: 'Updated comment text' } });
    expect(textarea.value).toBe('Updated comment text');
  });

});
