import React from 'react';
import { render, screen, fireEvent, within} from '@testing-library/react';
import Schedule from './Schedule';
import scheduleData from '../assets/data/scheduleEvents.json'; 


describe('Schedule Component', () => {
 
  test('renders events in the correct order', () => {
    render(<Schedule />);
    
    // Check for the correct order of events
    const events = screen.getAllByRole('listitem'); 

    //the correct order
    const expectedOrder = [
      'Sunday at 04:00 AM: Shrimp Boat Adventure & Picnic',
      'Friday at 05:00 PM: Paint & Code Hangout',
      'Saturday at 03:00 PM: Cozy Book & Drawing Session',  
      ,             
    ];

   
    expectedOrder.forEach((event, index) => {
      expect(events[index]).toHaveTextContent(event);
    });
  });

  test('allows user to add a new event', () => {
    render(<Schedule />);
    
    const dateSelect = screen.getByRole('combobox', { name: /select day/i });
    const hourSelect = screen.getByRole('combobox', { name: /hour/i });
    const minuteSelect = screen.getByRole('combobox', { name: /minute/i });
    const amPmSelect = screen.getByRole('combobox', { name: /am\/pm/i });
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    const submitButton = screen.getByRole('button', { name: /add to schedule/i });

    // Input new event details
    fireEvent.change(dateSelect, { target: { value: 'Saturday' } });
    fireEvent.change(hourSelect, { target: { value: '02' } }); // 2 PM
    fireEvent.change(minuteSelect, { target: { value: '35' } }); // 35 minutes
    fireEvent.change(amPmSelect, { target: { value: 'PM' } });
    fireEvent.change(descriptionInput, { target: { value: 'Talking with cats' } });

    // Submit the form
    fireEvent.click(submitButton);
    screen.debug();

    const listItems = screen.getAllByRole('listitem');
    
    const eventText = "Saturday at 02:35 PM: Talking with cats";
    const eventExists = listItems.some(item => {
      return item.textContent.includes("Saturday") && 
             item.textContent.includes("02:35 PM") && 
             item.textContent.includes("Talking with cats");
    });

    expect(eventExists).toBe(true);
    });
});

