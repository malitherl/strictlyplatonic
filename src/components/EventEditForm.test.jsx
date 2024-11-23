import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { EventEditForm } from './EventEditForm';

describe('EventEditForm Component', () => {
  const mockEvent = {
    title: 'Sample Event',
    description: 'This is a test event description.',
    location: 'Test Location',
    time: '2024-12-01T12:00',
    isRecurring: true,
    recurrenceInterval: 'weekly',
  };

  const mockHandleEditEvent = vi.fn();

  it('renders the form with the correct initial values', () => {
    render(
      <EventEditForm
        event={mockEvent}
        id="1"
        handleEditEvent={mockHandleEditEvent}
      />
    );

    // Check for initial values
    expect(screen.getByLabelText(/Edit Title:/i)).toHaveValue('Sample Event');
    expect(screen.getByLabelText(/Edit Description:/i)).toHaveValue(
      'This is a test event description.'
    );
    expect(screen.getByLabelText(/Edit Location:/i)).toHaveValue(
      'Test Location'
    );
    expect(screen.getByLabelText(/Edit Date & Time:/i)).toHaveValue(
      '2024-12-01T12:00'
    );
    expect(screen.getByLabelText(/Edit Recurring Event:/i)).toBeChecked();
    expect(screen.getByLabelText(/Recurrence:/i)).toHaveValue('weekly');
  });

  it('handles form input changes correctly', () => {
    render(
      <EventEditForm
        event={mockEvent}
        id="1"
        handleEditEvent={mockHandleEditEvent}
      />
    );

    const titleInput = screen.getByLabelText(/Edit Title:/i);
    const descriptionTextarea = screen.getByLabelText(/Edit Description:/i);

    // Simulate changing the title
    fireEvent.change(titleInput, { target: { value: 'Updated Event Title' } });
    expect(titleInput).toHaveValue('Updated Event Title');

    // Simulate changing the description
    fireEvent.change(descriptionTextarea, {
      target: { value: 'Updated Event Description' },
    });
    expect(descriptionTextarea).toHaveValue('Updated Event Description');
  });

  it('handles form submission correctly', () => {
    render(
      <EventEditForm
        event={mockEvent}
        id="1"
        handleEditEvent={mockHandleEditEvent}
      />
    );

    const submitButton = screen.getByRole('button', { name: /edit event/i });
    fireEvent.click(submitButton);

    expect(mockHandleEditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Sample Event',
        description: 'This is a test event description.',
        location: 'Test Location',
        time: '2024-12-01T12:00',
        isRecurring: true,
        recurrenceInterval: 'weekly',
      }),
      '1'
    );
  });
});
