import {
  ActivityIndicator,
  Dimensions,
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

const { height } = Dimensions.get("window");
const MyHostel = ({ navigation }) => {
  const [hostel, setHostel] = useState([]);
  const [hostelName, setHostelName] = useState("");
  const [info, setInfo] = useState("");
  const filteredHostelData = hostel.filter(
    ({ id }) => id !== auth?.currentUser?.email
  );

  // console.log(hostel);

  const fectchHostelUser = async () => {
    let hostel_name = await AsyncStorage.getItem("hostel");
    // console.log(hostel_name)
    setHostelName(hostel_name);

    if (hostel_name == null) {
      setInfo("No hostel selected");
    } else {
      const q = query(collection(db, "Admin", "usersHostels", hostel_name));
      const querySnapshot = await getDocs(q);

      setHostel(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }
  };

  useEffect(() => {
    fectchHostelUser();
  }, []);

  return (
    <SafeAreaView>
      {hostelName == null ? (
        <Text style={styles.info}>{info}</Text>
      ) : hostel.length == 0 ? (
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
            <Text style={styles.header}>{hostelName} </Text>
          </TouchableOpacity>
          <FlatList
            data={filteredHostelData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listComponent}
                onPress={() =>
                  navigation.navigate("Chat", {
                    chatName: item?.data?.firstName,
                    id: item?.id,
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
  info: {
    textAlign: "center",
    marginTop: height / 3,
    fontFamily: "Medium",
    fontSize: 22,
  },
});
