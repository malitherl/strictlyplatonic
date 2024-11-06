
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   //TO DO: add these values from the firebase console.
   //

  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export async function getEvents(db) {

    const eventsCol = collection(db, 'events');
    const eventSnapshot = await getDoc(eventsCol);
    const eventList = eventSnapshot.docs.map(e => e.data);

    return eventList;

}


