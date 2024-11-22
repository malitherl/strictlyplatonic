import { useEffect, useState } from "react";
import { Event } from "../services/event_services";
import { EventCard } from "./EventCard";
import { useLocation } from 'react-router-dom';
import BackButton from "./BackButton";


export const Events = () => {
 const location = useLocation();
 const { user } = location.state || {};
 const [events, setEvents] = useState([]);
 const [eventsIds, setEventIds] = useState([]);
 const [newEvent, setNewEvent] = useState({
   title: '',
   description: '',
   location: '',
   time: '',
   time_created: '', //this is different from the time field because this ensures events are shown in chronological order. 
   participants: [],
   host: user.name,
   hostId: user.sub,
   isRecurring: false,
   recurrenceInterval: 'weekly',
   signedUp: false,
 });

 
 const eventsData = new Event();


 useEffect(() => {
   const fetchEvents = async () => {
     const e = await eventsData.getEventsData();
     setEventIds(e[0]);
     setEvents(e[1]);
   };
   fetchEvents();
 }, []);

 useEffect(() => {
  console.log("events changed");
 }, [events])




 // Handle Sign Up for a specific event
 const handleSignUp = async (e) => {
    /** 
     * -How this works is: 
      - this function will take the event.id which is 'e' here in the parameters, and the participants array. 
      - this event id is unique to each event, so the user should only be signed up for this one event. 
      - depending on whether the user is already signed up or not, the function will either add them to the participants array or drop them from the event. 
      - this way, you cannot sign up for an event more than once. 

    **/ 

      let updatedEvent = {};
      let updatedId = ""
      const updatedEvents = events.map((event, index) => {

          if(eventsIds[index] == e) {

            const participants = event?.participants || [];

            // Check if user_id is already in the participants list
            if (participants.includes(user.sub) || event.host_id == user.sub) {
              //this will drop the user from the event 
             
              const updated_participants = participants.filter(p => p != user.sub);
              console.log(updated_participants);
              updatedEvent = {
                ...event, // copy current event
                time_created: Date.now(),
                participants: updated_participants, 
                signedUp: false,  // Marks this event as not signed up because the user is dropping out of the event
              } 
              updatedId = eventsIds[index];

              return updatedEvent;
            } else {

              updatedEvent = {
                ...event, // copy current event
                time_created: Date.now(),
                participants: [...event.participants, user.sub], 
                signedUp: true,  // Mark this event as signed up
              } 
              updatedId = eventsIds[index]

              return updatedEvent;
            }
          } else {
            return event;
          }  
      });
     
      setEvents(updatedEvents);
      const u = await eventsData.eventSignUp(updatedEvent, updatedId);
      console.log(u)
      
    };

 

 // new event
 const handleCreateEvent = async (e) => {
   e.preventDefault();
   const eventData = {
     ...newEvent,
     host: user.name,
     hostId: user.sub
    //Removed the id field here because firebase generates one upon document creation
   };

   //in the event_services, the createEvent function can return an Id for us. 
   //Which we set here. 
   //newEventData is set to the new document id once its created and stored in the database. 

   const newEventData = await eventsData.createEvents(eventData);


   setEventIds((prevIds) => [newEventData, ...prevIds]);
   setEvents((prevEvents) => [eventData, ...prevEvents]);
  
   setNewEvent({
    title: '',
    description: '',
    location: '',
    time: '',
    time_created: 0, 
    participants: [],
    host: user.name,
    hostId: user.sub,
    isRecurring: false,
    recurrenceInterval: 'weekly',
    signedUp: false,
   });
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


 const handleEditEvent = async (edited_event, id) => {
  const e = await eventsData.updateEvent(edited_event, id, user.sub);
 }

 const handleDeleteEvent = async (id) => {
  const e = await eventsData.deleteEvent(id, user.sub);
 }



 return (
   <div>
     <hr />
     <div style={styles.eventsBox}>
       <h2>Events</h2>

      <BackButton />



     </div>


     {/* event creation form --purple? */}
     <div style={styles.createEventBox}>
       <form name="createForm" onSubmit={handleCreateEvent}>
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
     <div style={styles.eventsList}>
     {events.map((event, index) => (
        <EventCard key={eventsIds[index]} event={event} id= {eventsIds[index]} user={user} handleSignUp= {handleSignUp} handleEditEvent={handleEditEvent} handleDeleteEvent= {handleDeleteEvent}/>
     ))}  
    </div>
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
    textAlign: 'center', 
 
 
  },
  eventsBox: {
    background:'linear-gradient(21deg, #65558f, #a69ac7)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center', 
  },
  eventsTitle: {
    fontSize: '2em',
    marginBottom: '10px',
    color: '#fff', 
  },
  goBackButton: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50px',
    marginTop:"20px" 
  },
  };


export default Events;