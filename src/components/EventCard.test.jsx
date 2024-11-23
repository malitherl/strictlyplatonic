import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import Vitest functions
import { EventCard } from './EventCard';

describe('EventCard Component', () => {
  const mockEvent = {
    title: 'Sample Event',
    description: 'This is a sample event description.',
    location: 'Sample Location',
    time: '2024-11-25 5:00 PM',
    participants: ['user1', 'user2'],
    host: 'Host User',
    hostId: '123',
    signedUp: false,
    isRecurring: true,
    recurrenceInterval: 'week',
  };

  const mockUser = { sub: '123', name: 'Host User' };
  const mockHandleSignUp = vi.fn();
  const mockHandleEditEvent = vi.fn();
  const mockHandleDeleteEvent = vi.fn();

  it('renders the event details correctly', () => {
    render(
      <EventCard
        event={mockEvent}
        id="1"
        user={mockUser}
        handleSignUp={mockHandleSignUp}
        handleEditEvent={mockHandleEditEvent}
        handleDeleteEvent={mockHandleDeleteEvent}
      />
    );

    // Check event details
    expect(screen.getByText(/Sample Event by \(Host User\)/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
        return element.tagName === 'P' && content.includes('Description: This is a sample event description.');
      })).toBeInTheDocument();    
    expect(screen.getByText(/Location:/i)).toHaveTextContent('Sample Location');
    expect(screen.getByText(/Date & Time:/i)).toHaveTextContent('2024-11-25 5:00 PM');
    expect(screen.getByText(/RSVP:/i)).toHaveTextContent('2');
    expect(screen.getByText(/Recurring Event:/i)).toHaveTextContent('This event happens every week');
  });

  it('handles the sign-up functionality', () => {
    const nonHostUser = { sub: '456', name: 'Non-Host User' };

    render(
      <EventCard
        event={{ ...mockEvent, hostId: '999', signedUp: false }}
        id="1"
        user={nonHostUser}
        handleSignUp={mockHandleSignUp}
        handleEditEvent={mockHandleEditEvent}
        handleDeleteEvent={mockHandleDeleteEvent}
      />
    );

    // Ensure "Sign Up" button is present
    const signUpButton = screen.getByText(/Sign Up/i);
    expect(signUpButton).toBeInTheDocument();

    // Click the "Sign Up" button
    fireEvent.click(signUpButton);
    expect(mockHandleSignUp).toHaveBeenCalledWith('1', mockEvent.participants);
  });
});
