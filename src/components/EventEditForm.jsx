import { useState } from "react";
export const EventEditForm = ({event, id, handleEditEvent}) => {
    
    const [editEvent, setEditEvent] = useState({
        ...event
     });

    
    const handleEditChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setEditEvent({
          ...editEvent,
         [name]: value,
        });
    };
   
    const handleEditRecurringChange = (e) => {
    setEditEvent({
       ...editEvent,
      isRecurring: e.target.checked,
     });
    };
    const edit = (e) => {
        e.preventDefault();
        handleEditEvent(editEvent, id);
    }
    
    return (
    
    
    <div>

    <form name="editForm" onSubmit={edit}>
    <h3>Edit your event!</h3>
    <label>
      Edit Title:
      <input
        type="text"
        name="title"
        value={editEvent.title}
        onChange={handleEditChange}
        required
      />
    </label>
    <br />
    <label>
      Edit Description:
      <textarea
        name="description"
        value={editEvent.description}
        onChange={handleEditChange}
        required
      />
    </label>
    <br />
    <label>
      Edit Location:
      <input
        type="text"
        name="location"
        value={editEvent.location}
        onChange={handleEditChange}
        required
      />
    </label>
    <br />
    <label>
      Edit Date & Time:
      <input
        type="datetime-local"
        name="time"
        value={editEvent.time}
        onChange={handleEditChange}
        required
      />
    </label>
    <br />
    <label>
      Edit Recurring Event:
      <input
        type="checkbox"
        checked={editEvent.isRecurring}
        onChange={handleEditRecurringChange}
      />
    </label>
    <br />
    {editEvent.isRecurring && (
      <>
        <label>
          Recurrence:
          <select
            name="recurrenceInterval"
            value={editEvent.recurrenceInterval}
            onChange={handleEditChange}
            required
          >
            <option value="everyday">Every day</option>
            <option value="weekly">Every week</option>
            <option value="biweekly">Every 2 weeks</option>
            <option value="monthly">Every month</option>
          </select>
        </label>
        <br />
      </>
    )}
    <button type="submit">Edit Event</button>
  </form>
 </div>

    )

}