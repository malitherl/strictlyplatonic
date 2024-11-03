import { render, screen } from '@testing-library/react'
import Home from './Home'

test('renders home page', () => {
  render(<Home />)
  const element = screen.getByText('StrictlyPlatonic')
  expect(element).toBeDefined()
})


