import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

// Mock useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn(),
}));

describe("LogoutButton Component", () => {
  it("renders the Log Out button when authenticated", () => {
    const mockLogout = vi.fn();
    
    // Mock implementation of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /log out/i });

    expect(button).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(button);
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  it("does not render the button when not authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    render(<LogoutButton />);
    const button = screen.queryByRole("button", { name: /log out/i });

    expect(button).not.toBeInTheDocument();
  });
});
