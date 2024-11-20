
class Notifications {

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

    

}