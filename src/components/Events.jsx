
import { useEffect, useState } from "react";
import { Event } from "../services/event_services";
import { useProfileData } from "../hooks/useProfileData";

const Events = ({user}) => {

  const [events, setEvents] = useState([]);
  const [eventsIds, setEventIds] = useState([]);
  const eventsData = new Event();  
  
  const userInfo = useProfileData(user);
  

  useEffect(() => {

    const fetchEvents = async() => {
      
      const e = await eventsData.getEventsData();
      setEventIds(e[0]);
      setEvents(e[1]);
    } 

    fetchEvents();

  }, [])

  
   const handleSignUp = async (e, p) => {
    //update the events in the database, sends over the user's id to the participants field so that they now are officially signed up for the event
    const u = await eventsData.eventSignUp(e, p, userInfo[0]["user_id"]);

   }



    return(
        <div>
        {events.map((event, i) => (
            
            <div key={eventsIds[i]} style={styles.userCard}>
            {
              
              /* <img 
                src={event.picture} 
                alt={`${event.title} event preview`} 
                style={styles.profilePicture} 
            /> */}
              <h3>{event.title} by ({event.host})</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>RSVP: {event.participants.length}</strong></p>
              <hr />
              <button onClick={()=> handleSignUp(eventsIds[i], event.participants)}>Sign Up</button>
            </div>
         ))}
        </div>
      );
    
}


const styles = {
    userCard: {
      border: '1px solid #ddd',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    },
    profilePicture: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px'
    }
  };

  export default Events;