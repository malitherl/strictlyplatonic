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

  it('should render profile information when user is logged in', () => {
    render(<MyProfile user={mockUser} userInfo={mockUserInfo} />);
    expect(screen.getByText('Profile Information')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
    expect(screen.getByText('reading, coding')).toBeInTheDocument();
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
    const file = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });

    const fileInput = screen.getByLabelText('Change profile picture:');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const previewImage = await screen.findByAltText('Profile Preview');
    expect(previewImage).toBeInTheDocument();
    expect(previewImage.src).toContain('blob:');
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
