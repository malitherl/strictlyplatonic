import { render, screen, fireEvent } from '@testing-library/react';
import Schedule from './Schedule';
import { test, describe, expect } from 'vitest';
import events from '../assets/data/scheduleEvents.json'; 

describe('Schedule Component', () => {
    test('renders events in the correct order', () => {
        render(<Schedule initialSchedule={events} />); // Make sure to pass the correct events

        const eventItems = screen.getAllByRole('listitem');

        // Verify the content and order of the events
        expect(eventItems[0]).toHaveTextContent('Friday at 5 PM: Paint & Code Hangout');
        expect(eventItems[1]).toHaveTextContent('Saturday at 3 PM: Cozy Book & Drawing Session');
        expect(eventItems[2]).toHaveTextContent('Sunday at 4 AM: Shrimp Boat Adventure & Picnic');
    });

    test('allows user input and adding new event to schedule', () => {
        render(<Schedule initialSchedule={events} />);

        const dateInput = screen.getByPlaceholderText('Enter date');
        const timeInput = screen.getByPlaceholderText('Enter time');
        const descriptionInput = screen.getByPlaceholderText('Enter description');
        const addButton = screen.getByRole('button', { name: /add to schedule/i });

        // new event
        fireEvent.change(dateInput, { target: { value: 'Monday' } });
        fireEvent.change(timeInput, { target: { value: '2 PM' } });
        fireEvent.change(descriptionInput, { target: { value: 'Lunch with cats' } });

        fireEvent.click(addButton);

        // Check if the new event was added to the schedule
        expect(screen.getByText(/Monday at 2 PM/i)).toBeInTheDocument();
        expect(screen.getByText(/Lunch with cats/i)).toBeInTheDocument();
    });
});
