import { useState } from 'react';
import scheduleData from '../assets/data/scheduleEvents.json';
import editIcon from '../assets/images/icons/edit.svg';
import deleteIcon from '../assets/images/icons/delete.svg';
import visibilityOn from '../assets/images/icons/visibilityOn.svg';
import visibilityOff from '../assets/images/icons/visibilityOff.svg';



const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = () => {
  const [schedule, setSchedule] = useState(
    scheduleData.map((event, index) => ({
      ...event,
      visible: true,
      id: index // Add a unique ID based on the index
    }))
  );
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [activity, setActivity] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);  // To track if an event is being edited


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting event:', { date, hour, minute, amPm, activity });
    if (date && hour && minute && amPm && activity) {
        const newEvent = { 
          date, 
          time: `${hour}:${minute.padStart(2, '0')} ${amPm}`, // Ensure minutes are two digits
          //amPm
          activity 
        }; 
      
        if (editingEvent) {
          const updatedSchedule = schedule.map(event =>
            event === editingEvent ? newEvent : event
          );
          setSchedule(updatedSchedule);
          editSchedule(schedule); // Passing the state to the correct function;
          setEditingEvent(null); // Clear editing state after saving
        } else {
          setSchedule((prevSchedule) => [...prevSchedule, newEvent]);
        }

    if (date && hour && minute && amPm && description) {
      const newEvent = {
        date,
        time: `${hour}:${minute.padStart(2, '0')} ${amPm}`, // Ensure minutes are two digits
        description,
        visible: true,
        id: Date.now(), // Generate a unique id for the new event
      };

      if (editingEvent !== null) {
        // Update existing event
        setSchedule((prevSchedule) =>
          prevSchedule.map((event) =>
            event.id === editingEvent ? { ...event, ...newEvent } : event
          )
        );
        setEditingEvent(null); // Clear editing state after updating
      } else {
        // Add a new event
        setSchedule((prevSchedule) => [...prevSchedule, newEvent]);
      }

      // Clear the form fields
      setDate('');
      setHour('');
      setMinute('');
      setAmPm('');
      setActivity('');
    } else {
      console.warn('Please fill in all fields before submitting.');
    }
  };

  const handleDelete = (id) => {
    setSchedule((prevSchedule) => prevSchedule.filter((event) => event.id !== id));
  };

  const handleEdit = (id) => {
    const eventToEdit = schedule.find((event) => event.id === id);
    setEditingEvent(id);
    setDate(eventToEdit.date);
    setHour(eventToEdit.time.split(':')[0]);
    setMinute(eventToEdit.time.split(':')[1].split(' ')[0]);
    setAmPm(eventToEdit.time.split(' ')[1]);
    setDescription(eventToEdit.description);
  };

  const handleToggleIcon = (id) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((event) =>
        event.id === id ? { ...event, visible: !event.visible } : event
      )
    );
  };

  const getSortedSchedule = (schedule) => {

    return [...schedule].sort((a, b) => {
      const dayDifference = daysOrder.indexOf(a.date) - daysOrder.indexOf(b.date);
      if (dayDifference !== 0) {
        return dayDifference;
      }

      const timeA = `${a.time.split(' ')[0]} ${a.time.split(' ')[1]}`;
      const timeB = `${b.time.split(' ')[0]} ${b.time.split(' ')[1]}`;
      const hourA = parseInt(a.time.split(':')[0], 10);
      const hourB = parseInt(b.time.split(':')[0], 10);

      if (timeA.endsWith('AM') && timeB.endsWith('PM')) {
        return -1;
      }
      if (timeA.endsWith('PM') && timeB.endsWith('AM')) {
        return 1;
      }
      return hourA - hourB;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select aria-label="select day" value={date} onChange={(e) => setDate(e.target.value)}>
          <option value="" disabled>Select Day</option>
          {daysOrder.map((day, index) => (
            <option key={index} value={day}>{day}</option>
          ))}
        </select>
        <select aria-label="hour" value={hour} onChange={(e) => setHour(e.target.value)}>
          <option value="" disabled>Hour</option>
          {[...Array(12).keys()].map((h) => {
            const formattedHour = (h + 1).toString().padStart(2, '0'); 
            return <option key={formattedHour} value={formattedHour}>{formattedHour}</option>;
          })}
        </select>
        <select aria-label="minute" value={minute} onChange={(e) => setMinute(e.target.value)}>
  <option value="" disabled>Minute</option>
  {[...Array(60).keys()].map((m) => {
    const minute = m.toString().padStart(2, '0');
    return <option key={minute} value={minute}>{minute}</option>; // Add the minute as the inner text
  })}
</select>

        <select aria-label="am/pm" value={amPm} onChange={(e) => setAmPm(e.target.value)}>
          <option value="" disabled>AM/PM</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <input
          type="text"
          placeholder="Enter activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button type="submit">{editingEvent !== null ? 'Update Event' : 'Add to Schedule'}</button>
        <hr />
      </form>

      <h2>Schedule</h2>
      
      <ul>
        {getSortedSchedule(schedule).map((event) => (
          <li key={event.id} role="listitem">
            <div>
              <strong>{event.date}</strong> at <em>{event.time}</em>: {event.activity}
            </div>
            <div className="buttons">
              <button className="visibility" onClick={() => handleToggleIcon(event.id)}>
                <img src={event.visible ? visibilityOn : visibilityOff} alt="Toggle Icon" className="icon" />
              </button>
              <button className="edit" onClick={() => handleEdit(event.id)}>
                <img src={editIcon} alt="Edit" className="icon" />
              </button>
              <button className="delete" onClick={() => handleDelete(event.id)}>
                <img src={deleteIcon} alt="Delete" className="icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}};

export default Schedule;
