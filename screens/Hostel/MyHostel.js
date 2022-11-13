import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

const MyHostel = ({ navigation }) => {
  const [hostel, setHostel] = useState([]);

  const abc = async () => {
    const docRef = doc(
      db,
      "Admin",
      "usersHostels"
      //   "Sterner",
      //   auth?.currentUser?.email
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const fectchHostelUser = async () => {
    const q = query(collection(db, "Admin", "usersHostels", "Sterner"));
    const querySnapshot = await getDocs(q);

    setHostel(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  };

  useEffect(() => {
    fectchHostelUser();
  }, []);


  console.log("hostels---> " + hostel);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="ios-chevron-back-outline"
          size={40}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyHostel;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});
