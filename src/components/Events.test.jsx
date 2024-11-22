import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; // To provide router context
import { Events } from './Events';
import { Event } from '../services/event_services';

// Mock the event services to return fake event data
vi.mock('../services/event_services', () => {
  return {
    Event: vi.fn().mockImplementation(() => ({
      getEventsData: vi.fn().mockResolvedValue([
        ['eventId1', 'eventId2'],
        [
          {
            title: 'Test Event 1',
            description: 'Test description 1',
            location: 'Test location 1',
            time: '2024-11-21T10:00',
            participants: [],
            host: 'Test User',
            hostId: 'userId1',
            signedUp: false,
          },
          {
            title: 'Test Event 2',
            description: 'Test description 2',
            location: 'Test location 2',
            time: '2024-11-22T10:00',
            participants: [],
            host: 'Test User',
            hostId: 'userId2',
            signedUp: false,
          },
        ]]),
      createEvents: vi.fn().mockResolvedValue('newEventId'), // Ensure createEvents is mocked properly
    })),
  };
});

// Mock the useLocation hook to pass a mock user
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
      state: {
        user: {
          name: 'Test User',
          sub: 'userId1',
        },
      },
    }),
  };
});

describe('Events Component', () => {
  it('fetches and displays events', async () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    // Check if the events data is loaded
    await waitFor(() => expect(screen.getByText(/Test Event 1/i)).toBeInTheDocument());
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
  });

  it('handles event creation form', async () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Description of the new event' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'New Location' } });
    fireEvent.change(screen.getByLabelText(/Date & Time/i), { target: { value: '2024-11-30T12:00' } });
    fireEvent.click(screen.getByText(/Create Event/i));

    // Wait for the create event call to finish
    await waitFor(() => {
      // Check if createEvents was called
      expect(Event.prototype.createEvents).toHaveBeenCalled();
      
      // Validate the call with the expected data
      expect(Event.prototype.createEvents).toHaveBeenCalledWith({
        title: 'New Event',
        description: 'Description of the new event',
        location: 'New Location',
        time: '2024-11-30T12:00',
        time_created: expect.any(Number), // Expect a number (timestamp) for time_created
        participants: [],
        host: 'Test User',
        hostId: 'userId1',
        isRecurring: false,
        recurrenceInterval: 'weekly',
        signedUp: false,
      });
    });
  });
});
