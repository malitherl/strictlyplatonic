import { render, screen, fireEvent, within} from '@testing-library/react';
import { Posts } from '../components/Posts';
import postData from '../assets/data/postData.json';
import { describe, expect, test } from 'vitest';

describe('Posts Component', () => {
  test('renders all posts with correct content of user', () => {
    render(<Posts />);

    postData.forEach(post => {
      const postContainer = screen.getByText(post.username).closest('.postContainer');

      // USERNAME
      expect(within(postContainer).getByText(post.username)).toBeInTheDocument();
      // INTERESTS
      expect(within(postContainer).getByText(/Interests:/)).toBeInTheDocument();
      expect(within(postContainer).getByText(post.interests.join(', '))).toBeInTheDocument(); 
      // POST STUFF
      expect(within(postContainer).getByText(post.post)).toBeInTheDocument(); 
      // DATE
      expect(within(postContainer).getByText(/Date:/)).toBeInTheDocument();
      expect(within(postContainer).getByText(post.date)).toBeInTheDocument();
      // LOCATION
      expect(within(postContainer).getByText(/Location:/)).toBeInTheDocument();
      expect(within(postContainer).getByText(post.location)).toBeInTheDocument();
      // YES OR NO
      const eventPlannedText = post.event_planned ? 'Yes' : 'No';
      expect(within(postContainer).getByText(eventPlannedText)).toBeInTheDocument();
    });
  });

  test('renders initial comments for each post', () => {
    render(<Posts />);

    postData.forEach(post => {
      post.comments.forEach(comment => {
        expect(screen.getByText(new RegExp(`${comment.username}:`, 'i'))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(comment.comment, 'i'))).toBeInTheDocument();
      });
    });
  });

  test('allows users to add a new comment to a post', () => {
    render(<Posts />);

    const usernameInput = screen.getAllByPlaceholderText('your display name')[0];
    const commentInput = screen.getAllByPlaceholderText('add your comment here...')[0];
    const submitButton = screen.getAllByRole('button', { name: /submit/i })[0];

    // Add a new comment
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment!' } });
    fireEvent.click(submitButton);

    // Verify the new comment is added to the first post's comments section
    expect(screen.getByText('Piggy:')).toBeInTheDocument();
    expect(screen.getByText('I LOVE PIGGIES!')).toBeInTheDocument();
  });

  test('clears the input fields after submitting a comment', () => {
    render(<Posts />);

    const usernameInput = screen.getAllByPlaceholderText('your display name')[0];
    const commentInput = screen.getAllByPlaceholderText('add your comment here...')[0];
    const submitButton = screen.getAllByRole('button', { name: /submit/i })[0];

    // Add a new comment
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(commentInput, { target: { value: 'This is another test comment!' } });
    fireEvent.click(submitButton);

    // check the goods
    expect(usernameInput).toHaveValue('');
    expect(commentInput).toHaveValue('');
  });
});
