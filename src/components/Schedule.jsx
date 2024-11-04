import { useState } from 'react';
import scheduleData from '../assets/data/scheduleEvents.json';

const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = () => {

  const [schedule, setSchedule] = useState(scheduleData);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [amPm, setAmPm] = useState('');
  const [description, setDescription] = useState('');
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting event:', { date, hour, minute, amPm, description });
    if (date && hour && minute && amPm && description) {
        const newEvent = { 
          date, 
          time: `${hour}:${minute.padStart(2, '0')} ${amPm}`, // Ensure minutes are two digits
          //amPm
          description 
        }; 
      
      setSchedule((prevSchedule) => {
        console.log('Previous Schedule:', prevSchedule);
        const updatedSchedule = [...prevSchedule, newEvent];
        console.log('Updated Schedule:', updatedSchedule);
        return updatedSchedule;
      });

      setDate('');
      setHour('');
      setMinute('');
      setAmPm('');
      setDescription('');
    } else {
        console.warn('Please fill in all fields before submitting.');
    }
  };

  const getSortedSchedule = (schedule) => {
    return [...schedule].sort((a, b) => {
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
    };

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
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <button type="submit">Add to Schedule</button>
      </form>

      <h2>Scheduled Events</h2>
      <ul>
        {getSortedSchedule(schedule).map((event, index) => (
          <li key={index} role="listitem">
            <strong>{event.date}</strong> at <em>{event.time}</em>: {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;