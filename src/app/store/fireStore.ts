import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyCJlQntEdsqMZR9dt7OWfjdIBkByVaEUzM",
  authDomain: "fyb-project.firebaseapp.com",
  projectId: "fyb-project",
  storageBucket: "fyb-project.firebasestorage.app",
  messagingSenderId: "362320429273",
  appId: "1:362320429273:web:6b672a2ea53fca4b25fec8",
  measurementId: "G-ZFXJDLB837"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export const storage = getStorage(
  app,
  "gs://school-web-application-bb9d9.appspot.com" // Replace with your firebase bucket
);
