import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { PostForm } from './PostForm'; // Adjust path as necessary
import axios from 'axios';
import { useUserInfo } from '../utils/userContext';
import { vi } from 'vitest';

// Mock the useUserInfo hook to return mock user data
vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(),
}));

// Mock axios for image upload
vi.mock('axios');

// Test data for user and posts
const mockUser = {
  sub: 'user123',
  name: 'Test User',
  userPicture: 'https://test.com/profile.jpg',
};

const mockCreatePost = vi.fn();

describe('PostForm Component', () => {
  beforeEach(() => {
    useUserInfo.mockReturnValue({ userPicture: mockUser.userPicture });
    axios.post.mockResolvedValue({ data: { secure_url: 'https://cloudinary.com/image.jpg' } });
  });

  test('renders form with inputs for title, description, and image', () => {
    render(<PostForm user={mockUser} postsData={{}} createPost={mockCreatePost} />);
    
    // Check if the inputs and buttons are rendered correctly
    expect(screen.getByPlaceholderText(/Post Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/What's on your mind\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });


  test('displays alert if title or description is empty upon form submission', async () => {
    render(<PostForm user={mockUser} postsData={{}} createPost={mockCreatePost} />);
    
    const submitButton = screen.getByAltText(/Post/i);
    fireEvent.click(submitButton);

    // Assert alert was triggered for missing inputs
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Please put in a title and a description.'));
  });


  test('does not submit form if title or description are empty', async () => {
    render(<PostForm user={mockUser} postsData={{}} createPost={mockCreatePost} />);

    // Leave title and description empty and try to submit
    const submitButton = screen.getByAltText(/Post/i);
    fireEvent.click(submitButton);

    // Check that createPost was not called
    await waitFor(() => expect(mockCreatePost).not.toHaveBeenCalled());
  });
});
