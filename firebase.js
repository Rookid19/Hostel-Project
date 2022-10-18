import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYyobvnbHSkLlJx7CcFeAui8iS3RZ4NNk",
  authDomain: "hostel-app-53435.firebaseapp.com",
  projectId: "hostel-app-53435",
  storageBucket: "hostel-app-53435.appspot.com",
  messagingSenderId: "702447907551",
  appId: "1:702447907551:web:b65a86f353d74b68faef6a",
  measurementId: "G-YB0D0M58Q2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
