import {render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { expect, vi } from "vitest";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";

//not sure
vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));

describe("LogoutButton", () => {
    it("renders a button if the user is authenticated", () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true, 
            logout: vi.fn(),
        });

        render(<LogoutButton />);


    //logout button rendered?
    const button = screen.getByRole("button", {name: /log out/i});
    expect(button).toBeNull();
    });
    
    it("calls logout when the button is clicked", () => {
        const mockLogout = vi.fn();

        // Mock isAuth...:true -> logout
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            logout: mockLogout,
        });

        render(<LogoutButton />);
        //button click
        const button = screen.getByRole("button", { name: /log out/i });
        fireEvent.click(button);

        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockLogout).toBeCalledWith({
            logoutParams: { returnTo: window.location.origin}
        });

    
    });

});

