import {useState, useEffect} from 'react';


const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = ({ initialSchedule = [] }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState(initialSchedule);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time && description) {
      const newEvent = { date, time, description };
      setSchedule((prevSchedule) => [...prevSchedule, newEvent]);
      setDate('');
      setTime('');
      setDescription('');
    }
  };

  const getSortedSchedule = (schedule) => {
    return [...schedule].sort((a, b) => {
        const dayDifference = daysOrder.indexOf(a.date) - daysOrder.indexOf(b.date);
        if (dayDifference === 0) {
          return a.time.localeCompare(b.time);
        }
        return dayDifference;
      });
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder='Enter time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder='Enter description'
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
