import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton"; // the PATHHHHH
import { vi } from "vitest";

// Mocking the useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn(),
}));

describe("LoginButton", () => {
  it("renders a button if the user is not authenticated", () => {
    // Mock isAuthenticated as false and loginWithRedirect as a jest function
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: vi.fn(),
    });

    render(<LoginButton />);

    // Check if the login button is rendered
    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeInTheDocument();
  });

  it("does not render a button if the user is authenticated", () => {
    // Mock isAuthenticated as true and loginWithRedirect as a jest function
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: vi.fn(),
    });

    render(<LoginButton />);

    // The button should not be in the document
    const button = screen.queryByRole("button", { name: /log in/i });
    expect(button).toBeNull();
  });

  it("calls loginWithRedirect when the button is clicked", () => {
    const mockLoginWithRedirect = vi.fn();

    // Mock isAuthenticated as false and provide the mock function for loginWithRedirect
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    });

    render(<LoginButton />);

    // Simulate a button click
    const button = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(button);

    // Verify that loginWithRedirect was called
    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });
});


