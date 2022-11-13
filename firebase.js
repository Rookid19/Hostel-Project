import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8mf2SCz4shdcSXnypZNYnVav-cSx42zc",
  authDomain: "hostel-app-bb0da.firebaseapp.com",
  projectId: "hostel-app-bb0da",
  storageBucket: "hostel-app-bb0da.appspot.com",
  messagingSenderId: "326372646202",
  appId: "1:326372646202:web:26df0caf46d6eaa0170403",
  measurementId: "G-JPSPLL119Q"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
