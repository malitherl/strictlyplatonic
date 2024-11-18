import { useState } from "react";
import { EventEditForm } from "./EventEditForm";


export const EventCard = ({event, id, user, handleSignUp, handleEditEvent, handleDeleteEvent}) => {
  
 const [toggleEdit, setToggleEdit] = useState(false);
 

 const toggleEditingModal = () => {
  console.log('toggling editing')
  let e = !toggleEdit;
  setToggleEdit(e);
}

const toggleDeletion = (e) => {
  console.log(e);
  handleDeleteEvent(id);
}



    return (
        <div key={id} style={styles.userCard}>
         <h3>{event.title} by ({event.host})</h3>
         <p><strong>Description:</strong> {event.description}</p>
         <p><strong>Location:</strong> {event.location}</p>
         <p><strong>Date & Time:</strong> {event.time}</p>
         <p><strong>RSVP: {event.participants.length}</strong></p>
         <p><strong>Recurring Event: {event.isRecurring ? `This event happens every ${event.recurrenceInterval}` : "No"}</strong></p>
         <hr />
         {/* Because this is a boolean value, we can make this rendering a ternary operation instead */} 
         {event.hostId == user.sub ? 
           <div>
            <button onClick={toggleEditingModal}>Edit</button><button onClick={toggleDeletion}>Cancel Event</button>
           </div> : 
          event.signedUp ? 
            <div>
              <p>Yay! You are signed up for this event!</p> <button></button>
            </div> : 
            <button onClick={() => handleSignUp(id, event.participants)}>Sign Up</button> }
          
        {toggleEdit && <EventEditForm event={event} id={id} handleEditEvent={handleEditEvent}/>}

       </div>
    )

}

const styles = {
  userCard: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    background:'linear-gradient(21deg, #65558f, #a69ac7)',
   
  }
}