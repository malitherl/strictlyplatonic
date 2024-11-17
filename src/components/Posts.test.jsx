import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Posts } from './Posts';
import { vi } from 'vitest';
import { useUserInfo } from '../utils/userContext';
import axios from 'axios';

// Mocking axios and user context
vi.mock('axios');
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(),
}));

const mockUser = {
  sub: 'user123',
  name: 'John Doe',
};

const mockUserPicture = 'https://example.com/john.jpg';

describe('Posts Component', () => {
  beforeEach(() => {
    useUserInfo.mockReturnValue({ userPicture: mockUserPicture });
    axios.post.mockResolvedValue({ data: { secure_url: 'https://cloudinary.com/image.jpg' } });
  });

  test('renders posts correctly', async () => {
    // Rendering the Posts component with a mock user prop
    render(<Posts user={mockUser} />);

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Simulating posts data fetching
    await waitFor(() => screen.getByText('create a new post!'));

    // Verify the form fields are rendered
    expect(screen.getByPlaceholderText("Post Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument();

    // Verify that no posts are displayed if there is no data
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  test('allows a user to create a post', async () => {
    // Mock the posts data to be returned from localStorage or the API
    const mockPosts = [
      {
        title: 'Test Post',
        desc: 'This is a test post description.',
        creator: 'user123',
        creator_pic: mockUserPicture,
        date: '2024-11-15',
        image: '',
        comments: [],
      },
    ];
    localStorage.setItem('posts', JSON.stringify(mockPosts));

    render(<Posts user={mockUser} />);

    // Simulate creating a new post
    const titleInput = screen.getByPlaceholderText("Post Title");
    const descInput = screen.getByPlaceholderText("What's on your mind?");
    const submitButton = screen.getByText('Post');

    // Enter the title and description
    fireEvent.change(titleInput, { target: { value: 'New Post' } });
    fireEvent.change(descInput, { target: { value: 'This is a new post.' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the new post to be displayed
    await waitFor(() => screen.getByText('New Post'));

    // Check if the new post has been added
    expect(screen.getByText('This is a new post.')).toBeInTheDocument();
  });

  test('uploads an image when a file is selected', async () => {
    const titleInput = screen.getByPlaceholderText("Post Title");
    const descInput = screen.getByPlaceholderText("What's on your mind?");
    const fileInput = screen.getByLabelText(/file/i);
    const submitButton = screen.getByText('Post');

    // Mock selecting an image
    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simulate creating a post with an image
    fireEvent.change(titleInput, { target: { value: 'Test Image Post' } });
    fireEvent.change(descInput, { target: { value: 'This post has an image.' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the image upload process to complete
    await waitFor(() => screen.getByAltText('Preview'));

    // Check if image preview is displayed
    expect(screen.getByAltText('Preview')).toBeInTheDocument();
  });
});
