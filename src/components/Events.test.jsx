import { render, screen } from '@testing-library/react'
import Events from '../components/Events'; 
import eventData from '../assets/data/events.json';
import { vi } from 'vitest';

vi.mock('../assets/data/events.json', async(importOriginal) => {
    const actual = await importOriginal()
    return{
        ...actual,
      1: {
        host: 'Jazmin (@purplcat)',
        title: 'Cozy Book & Drawing Session',
        description: "Bring your favorite book and join me for a cozy reading and drawing session! We'll spend some time reading, then dive into some sketching based on what we read or just doodle whatever comes to mind. Tea and snacks provided!",
        location: 'Local café',
        time: 'Saturday, 3 PM',
      },
      2: {
        host: 'Sierra (@pinkcat)',
        title: 'Paint & Code Hangout',
        description: "Let's get together for a creative mix of painting and coding. Whether you're new to coding or a pro, come have fun painting a canvas or helping to code a cool project. Supplies provided for both",
        location: 'Local art gallery',
        time: 'Friday, 5 PM',
      },
      3: {
        host: 'Michaela (@tabbycat)',
        title: 'Shrimp Boat Adventure & Picnic',
        description: "Join me on a shrimp boat trip, followed by a fun picnic by the water! We'll spend the day enjoying the waves, catching shrimp, and hanging out. Feel free to bring snacks, sunscreen, and a sketchbook if you want to draw the scenery",
        location: 'Local marina',
        time: 'Sunday, 4 AM',
      },
    }
})
  
  
  describe('Events Component', () => {
    test('renders all events with correct content of users', () => {
      render(<Events />);
  
      // Check for event titles
      expect(screen.getByText(/Cozy Book & Drawing Session/i)).toBeInTheDocument();
      expect(screen.getByText(/Paint & Code Hangout/i)).toBeInTheDocument();
      expect(screen.getByText(/Shrimp Boat Adventure & Picnic/i)).toBeInTheDocument();
  
      // Check for hosts
      expect(screen.getByText(/Jazmin \(@purplcat\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Sierra \(@pinkcat\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Michaela \(@tabbycat\)/i)).toBeInTheDocument();
  
      // check for descriptions
      expect(
        screen.getByText(/Bring your favorite book and join me for a cozy reading/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Let's get together for a creative mix of painting and coding/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Join me on a shrimp boat trip, followed by a fun picnic/i)
      ).toBeInTheDocument();
  
      // Check for locations
      expect(screen.getByText(/Local café/i)).toBeInTheDocument();
      expect(screen.getByText(/Local art gallery/i)).toBeInTheDocument();
      expect(screen.getByText(/Local marina/i)).toBeInTheDocument();
  
      // Check for times
      expect(screen.getByText(/Saturday, 3 PM/i)).toBeInTheDocument();
      expect(screen.getByText(/Friday, 5 PM/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunday, 4 AM/i)).toBeInTheDocument();
  
      // Check if "Sign Up" buttons are present for each event
      const signUpButtons = screen.getAllByRole('button', { name: /sign up/i });
      expect(signUpButtons.length).toBe(3);
    });
  });


