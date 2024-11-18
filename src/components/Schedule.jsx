import { useEffect, useState } from 'react';
import editIcon from '../assets/images/icons/edit.svg';
import deleteIcon from '../assets/images/icons/delete.svg';



export const Schedule = ({editSchedule, userSchedule}) => {

  const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [schedule, setSchedule] = useState(userSchedule || []);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [activity, setActivity] = useState('');
  const [editingEvent, setEditingEvent] = useState({});  // To track if an event is being edited
  
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

        if (Object.values(editingEvent).length > 0) {  
          const updatedSchedule = schedule.map(event =>
            event == editingEvent ? newEvent : event
          );
          editSchedule(updatedSchedule);
          setSchedule(updatedSchedule);
          setEditingEvent({}); // Clear editing state after saving
        } else {
          const newSchedule = [...schedule, newEvent];
          editSchedule(newSchedule);
          setSchedule(newSchedule);
          
        }

      setDate('');
      setHour('');
      setMinute('');
      setAmPm('');
      setActivity('');
    } else {
        console.warn('Please fill in all fields before submitting.');
    }
  };

  const handleDelete = (eventToDelete) => {

    setSchedule(schedule.filter(event => event != eventToDelete));
    editSchedule(schedule);
  };

  const handleEdit = (eventToEdit) => {
    console.log(eventToEdit);
    setEditingEvent(eventToEdit);
    setDate(eventToEdit.date);
    setHour(eventToEdit.time.split(':')[0]);
    setMinute(eventToEdit.time.split(':')[1].split(' ')[0]);
    setAmPm(eventToEdit.time.split(' ')[1]);
    setActivity(eventToEdit.activity);
  };



  useEffect(() => {
    if (userSchedule) {
      setSchedule(userSchedule);
    }
  }, [userSchedule]);

  const sortedSchedule = schedule.sort((a, b) => {
        // Sort by day first
        const dayDifference = daysOrder.indexOf(a.date) - daysOrder.indexOf(b.date);
        if (dayDifference !== 0) {
          return dayDifference;
        }
        
        // Then sort by time: AM comes before PM
        const timeA = `${a.time.split(' ')[0]} ${a.time.split(' ')[1]}`;
        const timeB = `${b.time.split(' ')[0]} ${b.time.split(' ')[1]}`;
        const hourA = parseInt(a.time.split(':')[0], 10);
        const hourB = parseInt(b.time.split(':')[0], 10);
        
        if (timeA.endsWith('AM') && timeB.endsWith('PM')) {
          return -1; // AM should come before PM
        }
        if (timeA.endsWith('PM') && timeB.endsWith('AM')) {
          return 1; // PM should come after AM
        }
        return hourA - hourB; // Sort by hour for same AM/PM
      });
      
  return (
    <div>
     
      <form onSubmit={handleSubmit}>

        <select aria-label="select day" value={date} onChange={(e) => setDate(e.target.value)}>
          <option value=""disabled>Select Day</option>
          {daysOrder.map((day, index) => (
            <option key={index} value={day}>{day}</option>
          ))}
        </select>

   
        <select aria-label="hour" value={hour} onChange={(e) => setHour(e.target.value)}>
            <option value=""disabled>Hour</option>
          {[...Array(12).keys()].map((h) => {
             const formattedHour = (h + 1).toString().padStart(2, '0'); 
             return <option key={formattedHour} value={formattedHour}>{formattedHour}</option>;
          })}
        </select>

        <select aria-label="minute" value={minute} onChange={(e) => setMinute(e.target.value)}>
            <option value=""disabled>Minute</option>
          {[...Array(60).keys()].map((m) => {
            const minute = m.toString().padStart(2, '0');
            return <option key={minute} value={minute}>{minute}</option>;
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
        
        <button type="submit">Add to Schedule</button>
        <hr />
      </form>

      <h2>Weekly Schedule</h2>
      
      <ul>
        {sortedSchedule.map((event, index) => (
          <li key={index}>
          <div>
            <strong>{event.date}</strong> at <em>{event.time}</em>: {event.activity}
          </div>
        
          <div className="buttons">
            <button className="edit" onClick={() => handleEdit(event)}>
              <img src={editIcon} alt="Edit" className="icon" />
            </button>
        
            <button className="delete" onClick={() => handleDelete(event)}>
              <img src={deleteIcon} alt="Delete" className="icon" />
            </button>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;