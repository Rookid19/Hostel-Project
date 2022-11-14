import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCwWH29mAK8E6jclX8GUY8qgrx8GQ9337M",
    authDomain: "hostel-connect.firebaseapp.com",
    projectId: "hostel-connect",
    storageBucket: "hostel-connect.appspot.com",
    messagingSenderId: "393354522972",
    appId: "1:393354522972:web:c37d92ff361f1341541199"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
