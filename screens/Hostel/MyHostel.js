import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/styles";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MyHostel = ({ navigation, route }) => {
  const [hostel, setHostel] = useState([]);
  const [hostelName,setHosteName] = useState("")

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
    let hostel_name = await AsyncStorage.getItem("my_hostel");
    setHosteName(hostel_name)
    // console.log(c);
    const q = query(collection(db, "Admin", "usersHostels", hostel_name));
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

  // console.log("hostels---> " + JSON.stringify(hostel));

  return (
    <SafeAreaView>
      {hostel.length == 0 ? (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" />
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-chevron-back-outline"
              size={40}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.header}>{hostelName} hostel</Text>
          </TouchableOpacity>
          <FlatList
            data={hostel}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listComponent}
                onPress={() =>
                  navigation.navigate("Chat", {
                    chatName: item?.data?.firstName,
                  })
                }
              >
                <FontAwesome
                  name="user-circle"
                  size={50}
                  color={Colors.lightBorder}
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.name}>{item.data.firstName}</Text>
                  <Text style={styles.subTitle}>My name is barry allen</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default MyHostel;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
  listComponent: {
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorder,
  },
  name: {
    fontFamily: "Medium",
    fontSize: 20,
    marginTop: 5,
  },
  subTitle: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Regular",
  },
  header: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 22,
    marginTop: -30,
    marginBottom: 15,
  },
});
