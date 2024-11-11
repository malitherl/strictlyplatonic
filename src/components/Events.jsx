import { useEffect, useState } from "react";
import { Event } from "../services/event_services";
import { useProfileData } from "../hooks/useProfileData";


const Events = ({ user }) => {
 const [events, setEvents] = useState([]);
 const [eventsIds, setEventIds] = useState([]);
 const [newEvent, setNewEvent] = useState({
   title: '',
   description: '',
   location: '',
   time: '',
   participants: [],
   host: user,
   isRecurring: false,
   recurrenceInterval: 'weekly',
 });


 const eventsData = new Event();
 const userInfo = useProfileData(user);


 useEffect(() => {
   const fetchEvents = async () => {
     const e = await eventsData.getEventsData();
     setEventIds(e[0]);
     setEvents(e[1]);
   };
   fetchEvents();
 }, []);


 // Handle Sign Up for a specific event
 const handleSignUp = (eventId) => {
   setEvents((prevEvents) =>
     prevEvents.map((event) =>
       event.id === eventId
         ? {
             ...event, // copy current event
             participants: [...event.participants, userInfo[0]["user_id"]], 
             signedUp: true,  // Mark this event as signed up
           }
         : event // trying to make it to where it only RSVPS for that one event 
     )
   );
 };


 // new event
 const handleCreateEvent = async (e) => {
   e.preventDefault();


   const eventData = {
     ...newEvent,
     host: userInfo[0]["user_id"],  // host is user
     id: new Date().toISOString(),  // event id 
   };


   // so that the new event is at the top of the feed
   setEvents((prevEvents) => [eventData, ...prevEvents]);
   setEventIds((prevIds) => [eventData.id, ...prevIds]);


  
   setNewEvent({
     title: '',
     description: '',
     location: '',
     time: '',
     participants: [],
     host: user,
     isRecurring: false,
     recurrenceInterval: 'weekly',
   });//reset form
 };


 // form changes
 const handleChange = (e) => {
   const { name, value } = e.target;
   setNewEvent({
     ...newEvent,
     [name]: value,
   });
 };


 
 const handleRecurringChange = (e) => {
   setNewEvent({
     ...newEvent,
     isRecurring: e.target.checked,
   });
 };


 return (
   <div>
    
     <div style={styles.eventsBox}>
       <h2>Events</h2>
     </div>


     {/* event creation form --purple? */}
     <div style={styles.createEventBox}>
       <form onSubmit={handleCreateEvent}>
         <h3>Create a new event!</h3>
         <label>
           Title:
           <input
             type="text"
             name="title"
             value={newEvent.title}
             onChange={handleChange}
             required
           />
         </label>
         <br />
         <label>
           Description:
           <textarea
             name="description"
             value={newEvent.description}
             onChange={handleChange}
             required
           />
         </label>
         <br />
         <label>
           Location:
           <input
             type="text"
             name="location"
             value={newEvent.location}
             onChange={handleChange}
             required
           />
         </label>
         <br />
         <label>
           Date & Time:
           <input
             type="datetime-local"
             name="time"
             value={newEvent.time}
             onChange={handleChange}
             required
           />
         </label>
         <br />
         <label>
           Recurring Event:
           <input
             type="checkbox"
             checked={newEvent.isRecurring}
             onChange={handleRecurringChange}
           />
         </label>
         <br />
         {newEvent.isRecurring && (
           <>
             <label>
               Recurrence:
               <select
                 name="recurrenceInterval"
                 value={newEvent.recurrenceInterval}
                 onChange={handleChange}
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
         <button type="submit">Create Event</button>
       </form>
     </div>


     <hr />


     {/* showing events */}
     {events.map((event) => (
       <div key={event.id} style={styles.userCard}>
         <h3>{event.title} by ({event.host})</h3>
         <p><strong>Description:</strong> {event.description}</p>
         <p><strong>Location:</strong> {event.location}</p>
         <p><strong>Date & Time:</strong> {event.time}</p>
         <p><strong>RSVP: {event.participants.length}</strong></p>
         <p><strong>Recurring Event: {event.isRecurring ? `This event happens every ${event.recurrenceInterval}` : "No"}</strong></p>


    
         {!event.signedUp && (
           <button onClick={() => handleSignUp(event.id)}>Sign Up</button>
         )}

         {event.signedUp && event.participants.includes(userInfo[0]["user_id"]) && (
           <p>Yay! You are signed up for this event!</p>
         )}


         <hr />
       </div>
     ))}
   </div>
 );
};


const styles = {
 userCard: {
   border: '1px solid #ddd',
   padding: '10px',
   marginBottom: '20px',
   borderRadius: '5px',
   backgroundColor: '#f9f9f9',
   background:'linear-gradient(21deg, #65558f, #a69ac7)',
  
 },
 createEventBox: {
   backgroundColor: 'white',
   padding: '20px',
   borderRadius: '8px',
   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
   marginBottom: '30px',
   maxWidth: '600px',
   marginLeft: 'auto',
   marginRight: 'auto',
   background:'linear-gradient(21deg, #65558f, #a69ac7)',


 },
 eventsBox: {
   background:'linear-gradient(21deg, #65558f, #a69ac7)',
   padding: '20px',
   borderRadius: '8px',
   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
   marginBottom: '30px',
   maxWidth: '600px',
   marginLeft: 'auto',
   marginRight: 'auto',
 },
};


export default Events;