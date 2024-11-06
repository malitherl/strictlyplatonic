
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore/lite';


export class Event {
  
  firebaseConfig = {
  
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  
  };

  app;
  db;
  

  constructor () {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
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

  async updateEvents (event_id, participants, user_id) {

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

    console.log("User added to event attendees")

  } 

}




