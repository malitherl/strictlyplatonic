
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { query, where, deleteDoc } from "firebase/firestore";  
import { getFirestore, collection, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore/lite';


export class Event {

  app;
  db;
  
  firebaseConfig = {
  
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  
  };

  constructor () {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async clearPastEvents () {
    //https://firebase.google.com/docs/firestore/quickstart#add_data
    //https://firebase.google.com/docs/firestore/query-data/order-limit-data#order_and_limit_data

    /** For security but also storage reasons, this function will collect events that are older than
     *  45 days (presumably because these are past events) and it will delete them.  
     * 
     *  This function should only be called occasionally.
     * 
     *  Status: Needs Testing. 
    */

    const now = Date.now();
    const lastMonth = now - 45*24*60*60*1000;
    const eventsCol = collection(this.db, 'events');
    const filter = where("time", '<', lastMonth); 
    const q = query(eventsCol, filter);
    
    try {
      const eventSnapshot = await getDocs(q);
      console.log(eventSnapshot.data());
      eventSnapshot.docs().forEach(async (doc) => {
        try {
          const toDelete = await deleteDoc(doc)
          console.log(toDelete);
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }







  async getEventsData() {
   
    const eventsCol = collection(this.db, 'events');
    const eventSnapshot = await getDocs(eventsCol);
    const eventList = eventSnapshot.docs.map(e => e.data());
    const eventIdList = eventSnapshot.docs.map(i => i.id);
    console.log(eventList);
    console.log(eventIdList);
    return [eventIdList, eventList];

  } 

  async createEvents() {

    const docRef = await addDoc(collection(this.db, "events"), {
      name: "Tokyo",
      country: "Japan"
    });
  
    console.log("Document written with ID: ", docRef.id);

  }


  async updateEvent (updated_event, user_id) {

    if(user_id == updated_event.user_id) {

      const docRef = doc(this.db, "events", event_id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      const newDoc = await updateDoc(docRef, {
        updated_event
      });
      console.log("Event has been updated.");
    }
  }






  async eventSignUp (event_id, participants, user_id) {
    /**
     * This function is NOT for the event creator to edit their event. 
     * This function instead is for the user to sign up for events. 
     * the updateEvents function allows for the creator of an 
     * event to edit their event. 
     */

    const docRef = doc(this.db, "events", event_id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }

    const newParticipants = [...participants, user_id];

    const newDoc = await updateDoc(docRef, {
      participants: newParticipants
    });

    console.log("User added to event attendees");

  } 

}



