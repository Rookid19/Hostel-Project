import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/styles";

const Profile = () => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-circle"
        size={80}
        color={Colors.gray}
        style={styles.icon}
      />

      <View style={styles.card}></View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    marginTop: 30,
  },
  card: {
    height: 300,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.white,
  },
});
