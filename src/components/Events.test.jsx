import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Events from './Events'; // Assuming the component is in the same folder

// Mock the external hooks and services
vi.mock('../hooks/useProfileData', () => ({
  useProfileData: vi.fn(() => [{ user_id: 'user123' }]), // Mock user data
}));

vi.mock('../services/event_services', () => ({
  Event: vi.fn().mockImplementation(() => ({
    getEventsData: vi.fn().mockResolvedValue([['event123'], [
      {
        id: 'event123', 
        title: 'Cozy Book & Drawing Session',
        description: 'A cozy session for book lovers and artists.',
        location: 'Library',
        time: '2024-11-21T10:00',
        participants: [],
        host: 'user123',
        isRecurring: false
      }
    ]]),  // Mock event data
  })),
}));

test('renders events correctly', async () => {
  render(<Events user="user123" />);

  // Check if the location input field exists (form)
  const locationInput = screen.getByLabelText(/Location:/i);
  expect(locationInput).toBeInTheDocument();

  // Create a new event (mock data or simulate a user interaction)
  fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Event' } });
  fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'A brand new exciting event!' } });
  fireEvent.change(locationInput, { target: { value: 'New York' } });
  fireEvent.change(screen.getByLabelText(/Date & Time:/i), { target: { value: '2024-11-25T14:00' } });

  // Simulate form submission
  fireEvent.click(screen.getByText(/Create Event/i));

  // Wait for the new event to appear in the DOM
  await waitFor(() => screen.findByText('New Event'));

  // Check if the event location is rendered correctly (from event list)
  expect(screen.getByText('Location: New York')).toBeInTheDocument();
});


  test('creates a new event', async () => {
    render(<Events user="user123" />);

    // Fill out the form to create a new event
    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'A brand new exciting event!' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/Date & Time:/i), { target: { value: '2024-11-25T14:00' } });

    fireEvent.click(screen.getByText(/Create Event/i));

    // Wait for the new event to be rendered
    await waitFor(() => screen.findByText('New Event'));

    // Check if the new event was added
    expect(screen.getByText('New Event')).toBeInTheDocument();
    expect(screen.getByText('A brand new exciting event!')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('2024-11-25T14:00')).toBeInTheDocument();
  });


  test('signs up for an event', async () => {
    render(<Events user="user123" />);

    // Wait for the event to be rendered
    await waitFor(() => screen.getByText(/Cozy Book & Drawing Session/i));

    // Click the "Sign Up" button
    fireEvent.click(screen.getByText(/Sign Up/i));

    // Check if the RSVP count increases and the sign-up confirmation is shown
    await waitFor(() => expect(screen.getByText(/Yay! You are signed up for this event!/i)).toBeInTheDocument());
    expect(screen.getByText(/RSVP: 1/i)).toBeInTheDocument(); // Assuming the user is the first to sign up
  });

