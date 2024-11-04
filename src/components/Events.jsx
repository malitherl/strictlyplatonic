
import { useEffect } from "react"
import eventData from "../assets/data/events.json"


const Events = () => {

  const mock_id = "auth0|35111a222b"


  useEffect(() => {

    //This will fire when the event component is initially rendered. 
    //getEvents()




  }, [])







   const handleSignUp = (e) => {
    //update the events in the database.
      e.participants.push(mock_id)
  
   }



    return(
        <div>
        {Object.values(eventData.events).map((event) => (
            <div key={event.title} style={styles.userCard}>
            <img 
                src={event.picture} 
                alt={`${event.title} event preview`} 
                style={styles.profilePicture} 
            />
            <h3>{event.title} by ({event.host})</h3>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p> </p>
            <hr />
            <button onClick={()=> handleSignUp(event)}>Sign Up</button>
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