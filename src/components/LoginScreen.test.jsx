import React from 'react';
import { render, screen } from '@testing-library/react'
import {Home} from './Home'; 
import { describe, vi } from 'vitest';


vi.mock('./LoginButton', () => ({
  default: () => <button>Login</button>,
}));

vi.mock('./Navigation', () => ({
  Navigation: () => <nav>Navigation</nav>,
}));

describe('Home Component', ()=> {
test('renders home page', () => {
  render(<Home />)
    expect(screen.getByAltText('Main pic')).toBeInTheDocument(); // Main image
    expect(screen.getByText('Strictly Platonic')).toBeInTheDocument(); // Heading
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(); // LoginButton
    expect(screen.getByText('Navigation')).toBeInTheDocument(); // Navigation
});
});


