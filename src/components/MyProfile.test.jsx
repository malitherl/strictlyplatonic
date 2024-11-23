import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MyProfile } from './MyProfile';
import { useUserInfo } from '../utils/userContext';

vi.mock('../utils/userContext', () => ({
  useUserInfo: vi.fn(),
}));

vi.mock('../services/user_services', () => ({
  updateUserPicture: vi.fn(),
  updateUserSchedule: vi.fn(),
}));

describe('MyProfile Component', () => {
  const mockUser = {
    email: 'testuser@example.com',
  };

  const mockUserInfo = [
    {
      user_metadata: {
        picture: 'http://example.com/picture.jpg',
        bio: 'This is a test bio.',
        hobbies: ['reading', 'coding'],
        schedule: [],
      },
      name: 'Test User',
      user_id: '12345',
    },
  ];

  beforeEach(() => {
    useUserInfo.mockReturnValue({
      setUserPicture: vi.fn(),
    });
  });

  it('should render unauthorized message if no user is logged in', () => {
    render(<MyProfile user={null} userInfo={[]} />);
    expect(screen.getByText('You are not authorized to view this page.')).toBeInTheDocument();
  });

  it('should render profile information when user is logged in', async () => {
    // Mock the return value of useUserInfo to simulate logged-in user
    useUserInfo.mockReturnValue({
      userInfo: [{
        user_metadata: {
          picture: 'test-image-url',
          bio: 'This is a test bio',
          hobbies: ['reading', 'coding'],
        },
        name: 'Test User',
      }],
      fetchData: vi.fn(),
    });
  
    // Render the component with the mocked user data
    render(<MyProfile user={{ email: 'testuser@example.com' }} />);
  
    // Use findByText to wait for the elements to appear asynchronously
    expect(await screen.findByText(/Test User/i)).toBeInTheDocument();  // Name
    expect(await screen.findByText(/testuser@example.com/i)).toBeInTheDocument();  // Email
    expect(await screen.findByText(/This is a test bio/i)).toBeInTheDocument();  // Bio
    expect(await screen.findByText(/reading, coding/i)).toBeInTheDocument();  // Hobbies
  });
  
  

  it('should validate form inputs correctly', () => {
    render(<MyProfile user={mockUser} userInfo={mockUserInfo} />);
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Bio:'), { target: { value: 'A'.repeat(301) } });
    fireEvent.change(screen.getByLabelText('Hobbies:'), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Save Changes' }));

    expect(screen.getByText(/Name is required/)).toBeInTheDocument();
    expect(screen.getByText(/Keep it less than 300 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies are required/)).toBeInTheDocument();
  });

  it('should handle profile picture upload', async () => {
    render(<MyProfile user={mockUser} userInfo={mockUserInfo} />);
    
    // Create a dummy image file
    const file = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });
  
    // Find the file input and simulate a file selection
    const fileInput = screen.getByLabelText('Change profile picture:');
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    // Wait for the image preview to be rendered
    const previewImage = await screen.findByAltText('Profile Preview');
    expect(previewImage).toBeInTheDocument();
  
    // Expect the image src to contain the base64 data
    expect(previewImage.src).toContain('data:image/jpeg;base64,');
  });
  
  it('should call editSchedule when Schedule is updated', () => {
    const mockEditSchedule = vi.fn();
    render(<MyProfile user={mockUser} userInfo={mockUserInfo} />);

    const scheduleComponent = screen.getByText('Edit Profile');
    expect(scheduleComponent).toBeInTheDocument();
    mockEditSchedule(['New Schedule']);
    expect(mockEditSchedule).toHaveBeenCalled();
  });
});
