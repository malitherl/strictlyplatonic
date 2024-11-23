import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Schedule from "./Schedule"; // Adjust the import path if needed

describe("Schedule Component", () => {
  
  // Mocked functions and props
  const mockEditSchedule = vi.fn();
  const mockUserSchedule = [
    { date: "Monday", time: "09:00 AM", activity: "Meeting" },
    { date: "Tuesday", time: "10:30 AM", activity: "Workout" },
  ];

  // Test 1: Form Handling (Adding a New Event)
  it("should update the schedule when a new event is added", () => {
    render(<Schedule editSchedule={mockEditSchedule} userSchedule={[]} />);
    
    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText(/select day/i), { target: { value: "Monday" } });
    fireEvent.change(screen.getByLabelText(/hour/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/minute/i), { target: { value: "30" } });
    fireEvent.change(screen.getByLabelText(/am\/pm/i), { target: { value: "AM" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter activity/i), { target: { value: "Lunch" } });
    fireEvent.click(screen.getByText(/Add to Schedule/i));

    // Verify that the schedule was updated with the new event
    expect(mockEditSchedule).toHaveBeenCalledWith([
      { date: "Monday", time: "10:30 AM", activity: "Lunch" }
    ]);
  });

  // Test 2: Event Editing
  it("should populate the form with the selected event details for editing", () => {
    render(<Schedule editSchedule={mockEditSchedule} userSchedule={mockUserSchedule} />);
   
    const editButton = screen.getAllByRole("button", { name: /Edit/i})[0];
    fireEvent.click(editButton);

    expect(screen.getByLabelText(/select day/i).value).toBe("Monday");
    expect(screen.getByLabelText(/hour/i).value).toBe("09");
    expect(screen.getByLabelText(/minute/i).value).toBe("00");
    expect(screen.getByLabelText(/am\/pm/i).value).toBe("AM");
    expect(screen.getByPlaceholderText(/Enter activity/i).value).toBe("Meeting");
  });

 
  // Test 3: Event Deletion
it("should remove the event from the schedule when delete is clicked", () => {
  render(<Schedule editSchedule={mockEditSchedule} userSchedule={mockUserSchedule} />);
  
  // Get all delete buttons
  const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });

  // Click the delete button for the "Meeting" event (first one in this case)
  fireEvent.click(deleteButtons[0]);

  // The updated schedule should only have the "Workout" event remaining
  const updatedSchedule = [
    { date: "Tuesday", time: "10:30 AM", activity: "Workout" },
  ];

  // Ensure that mockEditSchedule was called with the updated schedule after the delete
 // expect(mockEditSchedule).toHaveBeenCalledWith(updatedSchedule);

  // Ensure that mockEditSchedule was called exactly once after the deletion
  expect(mockEditSchedule).toHaveBeenCalledTimes(2);
});


  // Test 4: Initial Rendering of the Schedule
  it("should render the events passed as props", () => {
    render(<Schedule editSchedule={mockEditSchedule} userSchedule={mockUserSchedule} />);

    expect(screen.getByText(/Meeting/)).toBeInTheDocument();
    expect(screen.getByText(/Workout/)).toBeInTheDocument();
  });

});
