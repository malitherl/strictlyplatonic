import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyProfile } from './MyProfile';
import { vi } from 'vitest';


// mock for schedule
vi.mock('./Schedule', () => () => <div>Schedule Component</div>);

// mock for user data
const mockUser = {
   email: 'test@example.com'
};


describe('MyProfile Component', () => {
   beforeEach(() => {
       localStorage.clear(); // Clear localStorage before each test
   });


   test('renders profile information correctly', () => {
       render(<MyProfile user={mockUser} />);


       expect(screen.getByText(/Profile Information/i)).toBeInTheDocument();
       expect(screen.getByText(/Name:/i)).toBeInTheDocument();
       expect(screen.getByText(/Email:/i)).toBeInTheDocument();
       expect(screen.getByText(/Bio:/i)).toBeInTheDocument();
       expect(screen.getByText(/Hobbies:/i)).toBeInTheDocument();
   });


   test('displays saved profile information from localStorage', () => {
       localStorage.setItem('name', 'Purple cat');
       localStorage.setItem('bio', 'This is my bio.');
       localStorage.setItem('hobbies', 'Coding, Painting');


       render(<MyProfile user={mockUser} />);


       expect(screen.getByText(/Purple cat/i)).toBeInTheDocument();
       expect(screen.getByText(/This is my bio./i)).toBeInTheDocument();
       expect(screen.getByText(/Coding, Painting/i)).toBeInTheDocument();
   });


   test('shows validation errors for empty fields', () => {
       render(<MyProfile user={mockUser} />);


       // Try to submit without filling the form
       fireEvent.click(screen.getByText(/Save Changes/i));


       expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
       expect(screen.getByText(/Hobbies are required/i)).toBeInTheDocument();
   });


   test('validates name length', () => {
       render(<MyProfile user={mockUser} />);


       fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'A lengthy name that is greater or equal to fifty characters limit' } });
       fireEvent.click(screen.getByText(/Save Changes/i));


       expect(screen.getByText(/Name is required and should be less than 50 characters/i)).toBeInTheDocument();
   });


   test('validates bio length', () => {
       render(<MyProfile user={mockUser} />);


       fireEvent.change(screen.getByLabelText(/Bio:/i), { target: { value: 'A very long bio that exceeds three hundred characters limit. '.repeat(10) } });
       fireEvent.click(screen.getByText(/Save Changes/i));


       expect(screen.getByText(/Bio should be less than 300 characters/i)).toBeInTheDocument();
   });


   test('updates localStorage on valid submission', () => {
       render(<MyProfile user={mockUser} />);


       fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Tabby cat' } });
       fireEvent.change(screen.getByLabelText(/Bio:/i), { target: { value: 'This is my bio.' } });
       fireEvent.change(screen.getByLabelText(/Hobbies:/i), { target: { value: 'Shrimp boating, reading' } });


       fireEvent.click(screen.getByText(/Save Changes/i));


       expect(localStorage.getItem('name')).toBe('Tabby cat');
       expect(localStorage.getItem('bio')).toBe('This is my bio.');
       expect(localStorage.getItem('hobbies')).toBe('Shrimp boating, reading');
       expect(screen.getByText(/Your profile has been updated successfully!/i)).toBeInTheDocument();
   });
});
